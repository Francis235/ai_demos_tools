#!/usr/bin/env python3
"""
简化的Celery演示
使用Redis作为broker，更容易在Mac上运行
"""

from celery import Celery
import time
import redis
import subprocess
import sys

# 创建简化的Celery应用
app = Celery('simple_demo')

# 尝试使用Redis，如果不可用则使用内存传输
try:
    # 测试Redis连接
    r = redis.Redis(host='localhost', port=6379, db=0)
    r.ping()
    print("✅ 检测到Redis，使用Redis作为broker")
    app.conf.update(
        broker_url='redis://localhost:6379/0',
        result_backend='redis://localhost:6379/0'
    )
except:
    print("⚠️ Redis不可用，使用内存传输（仅限演示）")
    app.conf.update(
        broker_url='memory://',
        result_backend='cache+memory://'
    )

# 基本任务
@app.task
def add(x, y):
    print(f"执行加法: {x} + {y}")
    return x + y

@app.task
def multiply(x, y):
    print(f"执行乘法: {x} * {y}")
    return x * y

# 耗时任务
@app.task(bind=True)
def long_task(self, duration):
    print(f"开始执行耗时任务，预计{duration}秒")
    for i in range(duration):
        time.sleep(1)
        print(f"进度: {i+1}/{duration}")
        # 更新任务状态
        self.update_state(
            state='PROGRESS',
            meta={'current': i + 1, 'total': duration}
        )
    return f"任务完成！总共耗时{duration}秒"

# 演示任务组合
@app.task
def process_data(data):
    print(f"处理数据: {data}")
    time.sleep(1)
    return data.upper()

@app.task  
def save_result(data):
    print(f"保存结果: {data}")
    time.sleep(0.5)
    return f"已保存: {data}"

def demo_basic_tasks():
    """演示基本任务"""
    print("\n" + "="*50)
    print("📝 基本任务演示")
    print("="*50)
    
    # 同步调用
    print("\n1. 同步调用add(5, 3):")
    result = add.delay(5, 3)
    print(f"任务ID: {result.id}")
    print(f"结果: {result.get(timeout=10)}")
    
    # 异步调用
    print("\n2. 异步调用multiply(4, 6):")
    result = multiply.delay(4, 6)
    print(f"任务ID: {result.id}")
    print(f"任务状态: {result.status}")
    print(f"结果: {result.get(timeout=10)}")

def demo_progress_task():
    """演示进度跟踪"""
    print("\n" + "="*50)
    print("📊 进度跟踪演示")
    print("="*50)
    
    print("\n启动3秒的耗时任务...")
    result = long_task.delay(3)
    print(f"任务ID: {result.id}")
    
    # 监控进度
    while not result.ready():
        if result.state == 'PROGRESS':
            meta = result.info
            current = meta.get('current', 0)
            total = meta.get('total', 1)
            print(f"实时进度: {current}/{total}")
        time.sleep(0.5)
    
    print(f"最终结果: {result.get()}")

def demo_task_chain():
    """演示任务链"""
    print("\n" + "="*50)
    print("🔗 任务链演示")
    print("="*50)
    
    from celery import chain
    
    # 创建任务链
    workflow = chain(
        process_data.s("hello world"),
        save_result.s()
    )
    
    print("\n执行任务链: process_data -> save_result")
    result = workflow.apply_async()
    print(f"工作流结果: {result.get()}")

def demo_task_group():
    """演示任务组（并行）"""
    print("\n" + "="*50)
    print("👥 任务组演示（并行执行）")
    print("="*50)
    
    from celery import group
    
    # 创建任务组
    job = group([
        add.s(1, 1),
        add.s(2, 2), 
        add.s(3, 3),
        add.s(4, 4),
    ])
    
    print("\n执行4个并行的加法任务...")
    result = job.apply_async()
    results = result.get()
    print(f"所有结果: {results}")

def run_worker_demo():
    """在子进程中运行worker进行演示"""
    print("\n" + "="*50)
    print("🎉 Celery完整演示")
    print("="*50)
    
    print("正在启动Celery Worker（在后台运行）...")
    
    # 启动worker进程
    import multiprocessing
    import os
    
    def start_worker():
        # 设置环境变量，避免输出过多日志
        os.environ['CELERY_LOG_LEVEL'] = 'WARNING'
        app.worker_main(['worker', '--loglevel=warning', '--concurrency=1'])
    
    # 启动worker进程
    worker_process = multiprocessing.Process(target=start_worker)
    worker_process.start()
    
    try:
        # 等待worker启动
        time.sleep(2)
        print("✅ Worker已启动")
        
        # 运行演示
        demo_basic_tasks()
        demo_progress_task()
        demo_task_chain()
        demo_task_group()
        
        print("\n" + "="*50)
        print("✅ 所有演示完成！")
        print("="*50)
        
    finally:
        print("\n正在停止Worker...")
        worker_process.terminate()
        worker_process.join(timeout=5)
        if worker_process.is_alive():
            worker_process.kill()
        print("✅ Worker已停止")

def main():
    """主函数"""
    print("🎉 欢迎使用Celery简化演示！")
    print("本演示将在内存中运行，无需外部服务")
    print("-" * 50)
    
    try:
        run_worker_demo()
    except KeyboardInterrupt:
        print("\n⚠️ 演示被用户中断")
    except Exception as e:
        print(f"\n❌ 演示出现错误: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main() 