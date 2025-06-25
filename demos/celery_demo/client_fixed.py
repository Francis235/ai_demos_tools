#!/usr/bin/env python3
"""
修复版Celery Demo 客户端
添加了超时和错误处理，避免卡住
"""

import time
from celery import group, chain, chord
from celery.exceptions import WorkerLostError
from tasks import (
    add, multiply, slow_task, fast_task, fetch_url, 
    limited_task, process_data, save_result, failing_task
)

def check_worker_connection():
    """检查worker连接"""
    try:
        # 尝试一个简单的任务来测试连接
        result = add.delay(1, 1)
        result.get(timeout=5)  # 5秒超时
        print("✅ Worker连接正常")
        return True
    except Exception as e:
        print(f"❌ Worker连接失败: {e}")
        print("建议：请先启动 celery -A tasks worker --loglevel=info")
        return False

def demo_basic_tasks():
    """演示基本任务"""
    print("\n" + "="*50)
    print("📝 演示基本任务")
    print("="*50)
    
    try:
        # 1. 同步调用（设置超时）
        print("\n1. 同步调用 add(4, 4):")
        result = add.delay(4, 4)
        print(f"任务ID: {result.id}")
        print(f"结果: {result.get(timeout=10)}")
        
        # 2. 异步调用（设置超时）
        print("\n2. 异步调用 multiply(6, 7):")
        result = multiply.delay(6, 7)
        print(f"任务ID: {result.id}")
        print(f"任务状态: {result.status}")
        
        # 等待并获取结果
        print("等待任务完成...")
        print(f"结果: {result.get(timeout=10)}")
        
    except Exception as e:
        print(f"❌ 基本任务执行失败: {e}")

def demo_task_states():
    """演示任务状态和进度跟踪（带超时）"""
    print("\n" + "="*50)
    print("📊 演示任务状态和进度跟踪")
    print("="*50)
    
    try:
        # 启动一个较短的耗时任务
        print("\n启动耗时任务（3秒）...")
        result = slow_task.delay(3)
        print(f"任务ID: {result.id}")
        
        # 监控任务进度（设置最大等待时间）
        max_wait = 15  # 最多等待15秒
        start_time = time.time()
        
        while not result.ready() and (time.time() - start_time) < max_wait:
            if result.state == 'PROGRESS':
                try:
                    meta = result.info
                    print(f"进度: {meta['current']}/{meta['total']} - {meta['status']}")
                except:
                    print("等待任务状态更新...")
            time.sleep(1)
        
        if result.ready():
            print(f"最终结果: {result.get(timeout=5)}")
        else:
            print("⚠️ 任务超时，跳过此演示")
            
    except Exception as e:
        print(f"❌ 任务状态演示失败: {e}")

def demo_task_groups():
    """演示任务组（并行执行）"""
    print("\n" + "="*50)
    print("👥 演示任务组（并行执行）")
    print("="*50)
    
    try:
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
        
        # 获取所有结果（设置超时）
        results = result.get(timeout=15)
        print(f"所有结果: {results}")
        
    except Exception as e:
        print(f"❌ 任务组演示失败: {e}")

def demo_task_chains():
    """演示任务链（串行执行）"""
    print("\n" + "="*50)
    print("🔗 演示任务链（串行执行）")
    print("="*50)
    
    try:
        # 创建任务链：先处理数据，然后保存结果
        workflow = chain(
            process_data.s("hello world"),
            save_result.s()
        )
        
        print("\n执行任务链: process_data -> save_result")
        result = workflow.apply_async()
        print(f"工作流ID: {result.id}")
        
        # 获取最终结果（设置超时）
        final_result = result.get(timeout=15)
        print(f"最终结果: {final_result}")
        
    except Exception as e:
        print(f"❌ 任务链演示失败: {e}")

def demo_simple_tasks():
    """演示简单任务（快速完成）"""
    print("\n" + "="*50)
    print("⚡ 演示快速任务")
    print("="*50)
    
    try:
        # 快速任务
        print("\n发送快速任务:")
        fast_result = fast_task.delay("这是一个快速消息")
        print(f"快速任务ID: {fast_result.id}")
        
        # 等待结果
        print(f"快速任务结果: {fast_result.get(timeout=10)}")
        
    except Exception as e:
        print(f"❌ 快速任务演示失败: {e}")

def main():
    """主函数：运行所有演示"""
    print("🎉 欢迎使用 Celery Demo (修复版)!")
    print("本演示包含超时处理，避免卡住")
    print("如果遇到问题，将跳过相应演示")
    
    # 首先检查worker连接
    if not check_worker_connection():
        print("\n⚠️ 由于worker未连接，将跳过需要worker的演示")
        print("您可以运行 'python complete_demo.py' 查看本地演示")
        return
    
    try:
        # 基本任务演示
        demo_basic_tasks()
        
        # 简单快速任务
        demo_simple_tasks()
        
        # 任务组（并行）
        demo_task_groups()
        
        # 任务链（串行）
        demo_task_chains()
        
        # 任务状态跟踪（可能较慢）
        print("\n是否运行耗时任务演示？(可能需要等待几秒钟) [y/N]: ", end="")
        choice = input().lower()
        if choice.startswith('y'):
            demo_task_states()
        else:
            print("跳过耗时任务演示")
        
        print("\n" + "="*50)
        print("✅ 演示完成!")
        print("="*50)
        
    except KeyboardInterrupt:
        print("\n\n⚠️ 演示被用户中断")
    except Exception as e:
        print(f"\n\n❌ 演示过程中出现错误: {e}")
        print("建议运行 'python complete_demo.py' 查看无需worker的演示")

if __name__ == "__main__":
    main() 