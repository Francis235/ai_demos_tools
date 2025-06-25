from celery import Celery
import time
import requests
from datetime import timedelta

# 创建Celery应用实例
app = Celery('celery_demo',
             broker='pyamqp://guest@localhost//',  # RabbitMQ broker
             backend='rpc://')  # 使用RPC作为结果后端

# Celery配置
app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='Asia/Shanghai',
    enable_utc=True,
    # 任务路由配置
    task_routes={
        'tasks.slow_task': {'queue': 'slow_queue'},
        'tasks.fast_task': {'queue': 'fast_queue'},
    },
    # 任务注解配置（速率限制等）
    task_annotations={
        'tasks.limited_task': {'rate_limit': '10/m'}
    }
)

# 基本任务：简单的数学计算
@app.task
def add(x, y):
    """基本的加法任务"""
    print(f"正在计算 {x} + {y}")
    return x + y

@app.task
def multiply(x, y):
    """乘法任务"""
    print(f"正在计算 {x} * {y}")
    result = x * y
    return result

# 耗时任务：模拟长时间运行的任务
@app.task(bind=True)
def slow_task(self, duration):
    """模拟耗时任务，展示任务进度更新"""
    print(f"开始执行耗时任务，预计耗时 {duration} 秒")
    
    for i in range(duration):
        time.sleep(1)
        # 更新任务状态
        self.update_state(
            state='PROGRESS',
            meta={'current': i + 1, 'total': duration, 'status': f'处理中... {i+1}/{duration}'}
        )
        print(f"进度: {i+1}/{duration}")
    
    return {'current': duration, 'total': duration, 'status': '任务完成！'}

# 快速任务
@app.task
def fast_task(message):
    """快速任务"""
    print(f"快速处理消息: {message}")
    return f"已处理: {message}"

# 网络请求任务
@app.task(bind=True, autoretry_for=(Exception,), retry_kwargs={'max_retries': 3, 'countdown': 5})
def fetch_url(self, url):
    """获取网页内容的任务，带重试机制"""
    try:
        print(f"正在获取URL: {url}")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return {
            'url': url,
            'status_code': response.status_code,
            'content_length': len(response.content),
            'title': response.text[:100]  # 只返回前100个字符
        }
    except Exception as exc:
        print(f"获取URL失败: {exc}")
        raise self.retry(exc=exc)

# 限制速率的任务
@app.task
def limited_task(data):
    """速率受限的任务（每分钟最多10个）"""
    print(f"处理受限任务: {data}")
    time.sleep(1)  # 模拟处理时间
    return f"已处理受限任务: {data}"

# 定期任务（需要Celery Beat）
@app.task
def periodic_task():
    """定期执行的任务"""
    import datetime
    current_time = datetime.datetime.now()
    print(f"定期任务执行时间: {current_time}")
    return f"定期任务在 {current_time} 执行"

# 组合任务：工作流示例
@app.task
def process_data(data):
    """数据处理任务"""
    print(f"处理数据: {data}")
    time.sleep(2)  # 模拟处理时间
    return data.upper()

@app.task
def save_result(processed_data):
    """保存结果任务"""
    print(f"保存结果: {processed_data}")
    time.sleep(1)  # 模拟保存时间
    return f"已保存: {processed_data}"

# 错误处理示例
@app.task(bind=True)
def failing_task(self, should_fail=True):
    """可能失败的任务，用于演示错误处理"""
    if should_fail:
        raise Exception("这是一个模拟的错误！")
    return "任务成功完成"

# 回调任务
@app.task
def task_success_callback(task_id, result, traceback):
    """任务成功的回调"""
    print(f"任务 {task_id} 成功完成，结果: {result}")

@app.task
def task_failure_callback(task_id, error, traceback):
    """任务失败的回调"""
    print(f"任务 {task_id} 失败，错误: {error}")

if __name__ == '__main__':
    app.start() 