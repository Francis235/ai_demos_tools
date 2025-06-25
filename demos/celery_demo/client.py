#!/usr/bin/env python3
"""
Celery Demo 客户端
用于演示各种Celery任务的调用和使用方法
"""

import time
from celery import group, chain, chord
from tasks import (
    add, multiply, slow_task, fast_task, fetch_url, 
    limited_task, process_data, save_result, failing_task
)

def demo_basic_tasks():
    """演示基本任务"""
    print("\n" + "="*50)
    print("📝 演示基本任务")
    print("="*50)
    
    # 1. 同步调用（阻塞）
    print("\n1. 同步调用 add(4, 4):")
    result = add.delay(4, 4)
    print(f"任务ID: {result.id}")
    print(f"结果: {result.get()}")
    
    # 2. 异步调用（非阻塞）
    print("\n2. 异步调用 multiply(6, 7):")
    result = multiply.delay(6, 7)
    print(f"任务ID: {result.id}")
    print(f"任务状态: {result.status}")
    
    # 等待并获取结果
    print("等待任务完成...")
    print(f"结果: {result.get(timeout=10)}")

def demo_task_states():
    """演示任务状态和进度跟踪"""
    print("\n" + "="*50)
    print("📊 演示任务状态和进度跟踪")
    print("="*50)
    
    # 启动一个耗时任务
    print("\n启动耗时任务（5秒）...")
    result = slow_task.delay(5)
    print(f"任务ID: {result.id}")
    
    # 监控任务进度
    while not result.ready():
        if result.state == 'PROGRESS':
            meta = result.info
            print(f"进度: {meta['current']}/{meta['total']} - {meta['status']}")
        time.sleep(1)
    
    print(f"最终结果: {result.get()}")

def demo_task_routing():
    """演示任务路由（快速队列 vs 慢速队列）"""
    print("\n" + "="*50)
    print("🚀 演示任务路由")
    print("="*50)
    
    # 发送到快速队列
    print("\n发送快速任务到 fast_queue:")
    fast_result = fast_task.delay("这是一个快速消息")
    print(f"快速任务ID: {fast_result.id}")
    
    # 发送到慢速队列
    print("\n发送慢速任务到 slow_queue:")
    slow_result = slow_task.delay(3)
    print(f"慢速任务ID: {slow_result.id}")
    
    # 等待结果
    print("\n等待快速任务完成...")
    print(f"快速任务结果: {fast_result.get()}")

def demo_task_groups():
    """演示任务组（并行执行）"""
    print("\n" + "="*50)
    print("👥 演示任务组（并行执行）")
    print("="*50)
    
    # 创建任务组
    job = group([
        add.s(2, 2),
        add.s(4, 4),
        add.s(8, 8),
        add.s(16, 16),
    ])
    
    print("\n执行任务组（4个加法任务并行）...")
    result = job.apply_async()
    print(f"任务组ID: {result.id}")
    
    # 获取所有结果
    results = result.get()
    print(f"所有结果: {results}")

def demo_task_chains():
    """演示任务链（串行执行）"""
    print("\n" + "="*50)
    print("🔗 演示任务链（串行执行）")
    print("="*50)
    
    # 创建任务链：先处理数据，然后保存结果
    workflow = chain(
        process_data.s("hello world"),
        save_result.s()
    )
    
    print("\n执行任务链: process_data -> save_result")
    result = workflow.apply_async()
    print(f"工作流ID: {result.id}")
    
    # 获取最终结果
    final_result = result.get()
    print(f"最终结果: {final_result}")

def demo_task_chord():
    """演示任务和弦（组合并行和串行）"""
    print("\n" + "="*50)
    print("🎵 演示任务和弦（组合并行和串行）")
    print("="*50)
    
    # 创建和弦：多个并行任务 + 一个汇总任务
    callback = save_result.s()
    job = chord([
        process_data.s("data1"),
        process_data.s("data2"),
        process_data.s("data3"),
    ])(callback)
    
    print("\n执行和弦: 3个并行的process_data任务 + 1个save_result汇总任务")
    print(f"和弦ID: {job.id}")
    
    # 获取结果
    result = job.get()
    print(f"和弦结果: {result}")

def demo_error_handling():
    """演示错误处理"""
    print("\n" + "="*50)
    print("❌ 演示错误处理")
    print("="*50)
    
    # 故意触发错误的任务
    print("\n执行会失败的任务...")
    result = failing_task.delay(should_fail=True)
    print(f"任务ID: {result.id}")
    
    try:
        result.get(propagate=True)
    except Exception as exc:
        print(f"捕获到异常: {exc}")
        print(f"任务状态: {result.status}")
        print(f"错误信息: {result.info}")

def demo_rate_limiting():
    """演示速率限制"""
    print("\n" + "="*50)
    print("⏱️ 演示速率限制")
    print("="*50)
    
    print("\n发送多个受限任务（每分钟最多10个）...")
    tasks = []
    for i in range(5):
        result = limited_task.delay(f"数据{i+1}")
        tasks.append(result)
        print(f"发送任务 {i+1}, ID: {result.id}")
    
    # 等待所有任务完成
    print("\n等待所有受限任务完成...")
    for i, task in enumerate(tasks):
        result = task.get()
        print(f"任务 {i+1} 结果: {result}")

def demo_network_task():
    """演示网络任务（带重试机制）"""
    print("\n" + "="*50)
    print("🌐 演示网络任务（带重试机制）")
    print("="*50)
    
    # 测试网络请求任务
    url = "https://httpbin.org/json"
    print(f"\n获取URL: {url}")
    result = fetch_url.delay(url)
    print(f"任务ID: {result.id}")
    
    try:
        response_data = result.get(timeout=30)
        print(f"请求成功!")
        print(f"状态码: {response_data['status_code']}")
        print(f"内容长度: {response_data['content_length']}")
    except Exception as exc:
        print(f"请求失败: {exc}")

def main():
    """主函数：运行所有演示"""
    print("🎉 欢迎使用 Celery Demo!")
    print("本演示将展示 Celery 的各种功能特性")
    
    try:
        # 基本任务演示
        demo_basic_tasks()
        
        # 任务状态和进度跟踪
        demo_task_states()
        
        # 任务路由
        demo_task_routing()
        
        # 任务组（并行）
        demo_task_groups()
        
        # 任务链（串行）
        demo_task_chains()
        
        # 任务和弦（并行+串行）
        demo_task_chord()
        
        # 错误处理
        demo_error_handling()
        
        # 速率限制
        demo_rate_limiting()
        
        # 网络任务
        demo_network_task()
        
        print("\n" + "="*50)
        print("✅ 所有演示完成!")
        print("="*50)
        
    except KeyboardInterrupt:
        print("\n\n⚠️ 演示被用户中断")
    except Exception as e:
        print(f"\n\n❌ 演示过程中出现错误: {e}")

if __name__ == "__main__":
    main() 