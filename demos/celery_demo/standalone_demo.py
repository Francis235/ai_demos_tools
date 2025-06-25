#!/usr/bin/env python3
"""
Celery 独立演示
直接演示Celery的核心概念，不需要外部broker
"""

from celery import Celery
import time

# 创建Celery应用，使用内存传输
app = Celery('standalone_demo')
app.conf.update(
    broker_url='memory://',
    result_backend='cache+memory://',
    task_always_eager=True,  # 在同一进程中立即执行任务
    task_eager_propagates=True,  # 传播异常
)

print("🎉 Celery独立演示 - 直接在当前进程中执行")
print("=" * 50)

# 基本任务
@app.task
def add(x, y):
    """基本的加法任务"""
    print(f"  🔢 执行加法: {x} + {y}")
    return x + y

@app.task
def multiply(x, y):
    """乘法任务"""
    print(f"  🔢 执行乘法: {x} * {y}")
    return x * y

# 耗时任务
@app.task(bind=True)
def long_task(self, duration):
    """模拟耗时任务"""
    print(f"  ⏳ 开始执行耗时任务，预计{duration}秒")
    for i in range(duration):
        print(f"     进度: {i+1}/{duration}")
        # 在实际场景中，这里会更新任务状态
        # self.update_state(state='PROGRESS', meta={'current': i + 1, 'total': duration})
        time.sleep(1)
    return f"任务完成！总共耗时{duration}秒"

# 数据处理任务
@app.task
def process_data(data):
    """数据处理任务"""
    print(f"  📊 处理数据: {data}")
    time.sleep(0.5)  # 模拟处理时间
    return data.upper()

@app.task  
def save_result(data):
    """保存结果任务"""
    print(f"  💾 保存结果: {data}")
    time.sleep(0.3)  # 模拟保存时间
    return f"已保存: {data}"

# 可能失败的任务
@app.task(bind=True, autoretry_for=(ValueError,), retry_kwargs={'max_retries': 2})
def risky_task(self, should_fail=False):
    """可能失败的任务，演示重试机制"""
    if should_fail:
        print(f"  ❌ 任务失败，将重试...")
        raise ValueError("模拟的错误")
    print(f"  ✅ 任务成功完成")
    return "成功结果"

def demo_basic_tasks():
    """演示1：基本任务"""
    print("\n📝 演示1：基本任务")
    print("-" * 30)
    
    # 调用基本任务
    result1 = add.delay(5, 3)
    print(f"add(5, 3) = {result1.get()}")
    
    result2 = multiply.delay(4, 6)
    print(f"multiply(4, 6) = {result2.get()}")

def demo_task_chain():
    """演示2：任务链（串行执行）"""
    print("\n🔗 演示2：任务链（串行执行）")
    print("-" * 30)
    
    from celery import chain
    
    # 创建任务链：先处理数据，然后保存结果
    workflow = chain(
        process_data.s("hello world"),
        save_result.s()
    )
    
    print("执行任务链: process_data -> save_result")
    result = workflow.apply_async()
    final_result = result.get()
    print(f"最终结果: {final_result}")

def demo_task_group():
    """演示3：任务组（并行执行）"""
    print("\n👥 演示3：任务组（并行执行）")
    print("-" * 30)
    
    from celery import group
    
    # 创建任务组
    job = group([
        add.s(1, 1),
        add.s(2, 2), 
        add.s(3, 3),
        add.s(4, 4),
    ])
    
    print("执行4个并行的加法任务...")
    result = job.apply_async()
    results = result.get()
    print(f"所有结果: {results}")

def demo_task_chord():
    """演示4：任务和弦（并行+汇总）"""
    print("\n🎵 演示4：任务和弦（并行+汇总）")
    print("-" * 30)
    
    from celery import chord
    
    # 创建和弦：多个并行任务 + 一个汇总任务
    callback = save_result.s()
    job = chord([
        process_data.s("data1"),
        process_data.s("data2"),
        process_data.s("data3"),
    ])(callback)
    
    print("执行和弦: 3个并行的process_data + 1个save_result汇总")
    result = job.get()
    print(f"和弦结果: {result}")

def demo_error_handling():
    """演示5：错误处理"""
    print("\n❌ 演示5：错误处理和重试")
    print("-" * 30)
    
    # 成功的任务
    print("执行成功的任务:")
    result = risky_task.delay(should_fail=False)
    print(f"结果: {result.get()}")
    
    # 失败的任务（会触发重试）
    print("\n执行会失败的任务:")
    try:
        result = risky_task.delay(should_fail=True)
        result.get()
    except ValueError as e:
        print(f"最终失败: {e}")

def demo_long_task():
    """演示6：长时间运行的任务"""
    print("\n⏳ 演示6：长时间运行的任务")
    print("-" * 30)
    
    print("执行3秒的长时间任务...")
    result = long_task.delay(3)
    final_result = result.get()
    print(f"结果: {final_result}")

def demo_complex_workflow():
    """演示7：复杂工作流"""
    print("\n🏗️ 演示7：复杂工作流")
    print("-" * 30)
    
    from celery import chain, group
    
    # 复杂工作流：多个数据处理任务 -> 汇总结果
    workflow = chain(
        group([
            process_data.s("batch1"),
            process_data.s("batch2"),
            process_data.s("batch3"),
        ]),
        save_result.s()
    )
    
    print("执行复杂工作流...")
    result = workflow.apply_async()
    final_result = result.get()
    print(f"最终结果: {final_result}")

def main():
    """主演示函数"""
    try:
        demo_basic_tasks()
        demo_task_chain()
        demo_task_group()
        demo_task_chord()
        demo_error_handling()
        demo_long_task()
        demo_complex_workflow()
        
        print("\n" + "=" * 50)
        print("✅ 所有演示完成！")
        print("=" * 50)
        
        # 显示Celery核心概念总结
        print("\n📚 Celery核心概念总结:")
        print("1. 任务(Task): 用@app.task装饰器定义的异步函数")
        print("2. 调用: 使用.delay()或.apply_async()调用任务")
        print("3. 结果: 使用.get()获取任务结果")
        print("4. 任务链(Chain): 串行执行多个任务")
        print("5. 任务组(Group): 并行执行多个任务")
        print("6. 任务和弦(Chord): 并行任务+汇总回调")
        print("7. 错误处理: 自动重试机制")
        print("8. 在生产环境中需要真实的broker(RabbitMQ/Redis)")
        
    except KeyboardInterrupt:
        print("\n⚠️ 演示被用户中断")
    except Exception as e:
        print(f"\n❌ 演示出现错误: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main() 