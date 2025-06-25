#!/usr/bin/env python3
"""
Celery 完整功能演示
"""

from celery import Celery, group, chain, chord
import time

# 创建Celery应用
app = Celery('complete_demo')
app.conf.update(
    broker_url='memory://',
    result_backend='cache+memory://',
    task_always_eager=True,
    task_eager_propagates=True,
)

print("🎉 Celery 完整功能演示")
print("=" * 50)

@app.task
def add(x, y):
    """基本的加法任务"""
    print(f"  🔢 计算: {x} + {y} = {x + y}")
    return x + y

@app.task
def process_text(text):
    """文本处理任务"""
    print(f"  📝 处理文本: '{text}'")
    time.sleep(0.2)
    return text.upper()

@app.task
def save_result(data):
    """保存结果任务"""
    print(f"  💾 保存: '{data}'")
    time.sleep(0.1)
    return f"已保存: {data}"

@app.task
def aggregate(results):
    """聚合结果"""
    print(f"  📊 聚合 {len(results)} 个结果")
    return f"聚合完成: {results}"

def demo1_basic():
    """基本任务演示"""
    print("\n📝 演示1：基本任务")
    print("-" * 30)
    
    result = add.delay(5, 3)
    print(f"add(5, 3) = {result.get()}")

def demo2_chain():
    """任务链演示"""
    print("\n🔗 演示2：任务链")
    print("-" * 30)
    
    workflow = chain(
        process_text.s("hello"),
        save_result.s()
    )
    
    result = workflow.apply_async()
    print(f"链式结果: {result.get()}")

def demo3_group():
    """任务组演示"""
    print("\n👥 演示3：任务组")
    print("-" * 30)
    
    job = group([
        add.s(1, 1),
        add.s(2, 2),
        add.s(3, 3),
    ])
    
    result = job.apply_async()
    print(f"并行结果: {result.get()}")

def demo4_chord():
    """任务和弦演示"""
    print("\n🎵 演示4：任务和弦")
    print("-" * 30)
    
    callback = aggregate.s()
    job = chord([
        process_text.s("data1"),
        process_text.s("data2"),
        process_text.s("data3"),
    ])(callback)
    
    result = job.get()
    print(f"和弦结果: {result}")

def main():
    """主函数"""
    try:
        demo1_basic()
        demo2_chain()
        demo3_group()
        demo4_chord()
        
        print("\n" + "=" * 50)
        print("✅ 所有演示完成！")
        print("=" * 50)
        
        print("\n📚 Celery核心概念:")
        print("1. 任务(Task): @app.task装饰的函数")
        print("2. 调用: .delay()异步调用")
        print("3. 结果: .get()获取结果")
        print("4. 工作流: chain(串行), group(并行), chord(并行+回调)")
        
    except Exception as e:
        print(f"❌ 错误: {e}")

if __name__ == "__main__":
    main() 