#!/usr/bin/env python3
"""
Celery Demo 一键运行脚本
"""

import os
import sys
import subprocess
import time
import signal
from threading import Thread

def check_rabbitmq():
    """检查RabbitMQ是否运行"""
    try:
        import pika
        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        connection.close()
        return True
    except:
        return False

def start_rabbitmq_docker():
    """使用Docker启动RabbitMQ"""
    print("🐰 正在启动RabbitMQ Docker容器...")
    try:
        # 停止已存在的容器
        subprocess.run(['docker', 'stop', 'rabbitmq-celery'], 
                      capture_output=True, check=False)
        subprocess.run(['docker', 'rm', 'rabbitmq-celery'], 
                      capture_output=True, check=False)
        
        # 启动新容器
        cmd = [
            'docker', 'run', '-d',
            '--name', 'rabbitmq-celery',
            '-p', '5672:5672',
            '-p', '15672:15672',
            'rabbitmq:3-management'
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"✅ RabbitMQ容器启动成功: {result.stdout.strip()}")
        print("🌐 RabbitMQ管理界面: http://localhost:15672 (用户名: guest, 密码: guest)")
        
        # 等待RabbitMQ启动
        print("⏳ 等待RabbitMQ完全启动...")
        for i in range(30):
            if check_rabbitmq():
                print("✅ RabbitMQ已准备就绪!")
                return True
            time.sleep(2)
            print(f"   等待中... ({i+1}/30)")
        
        print("❌ RabbitMQ启动超时")
        return False
        
    except subprocess.CalledProcessError as e:
        print(f"❌ 启动RabbitMQ失败: {e}")
        print("请确保Docker已安装并运行")
        return False

def install_dependencies():
    """安装Python依赖"""
    print("📦 正在安装Python依赖...")
    try:
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'], 
                      check=True)
        print("✅ 依赖安装完成!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 依赖安装失败: {e}")
        return False

def start_worker():
    """启动Celery Worker"""
    print("👷 正在启动Celery Worker...")
    env = os.environ.copy()
    env['PYTHONPATH'] = os.getcwd()
    
    cmd = [sys.executable, '-m', 'celery', '-A', 'tasks', 'worker', '--loglevel=info']
    return subprocess.Popen(cmd, env=env)

def start_beat():
    """启动Celery Beat（定期任务调度器）"""
    print("⏰ 正在启动Celery Beat...")
    env = os.environ.copy()
    env['PYTHONPATH'] = os.getcwd()
    
    cmd = [sys.executable, '-m', 'celery', '-A', 'tasks', 'beat', '--loglevel=info']
    return subprocess.Popen(cmd, env=env)

def run_client():
    """运行客户端演示"""
    print("🎭 正在运行客户端演示...")
    time.sleep(3)  # 等待worker启动
    
    env = os.environ.copy()
    env['PYTHONPATH'] = os.getcwd()
    
    subprocess.run([sys.executable, 'client.py'], env=env)

def cleanup(processes):
    """清理进程"""
    print("\n🧹 正在清理进程...")
    for proc in processes:
        if proc and proc.poll() is None:
            proc.terminate()
            try:
                proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                proc.kill()
    
    # 停止RabbitMQ容器
    try:
        subprocess.run(['docker', 'stop', 'rabbitmq-celery'], 
                      capture_output=True, check=False)
        print("🐰 RabbitMQ容器已停止")
    except:
        pass

def main():
    """主函数"""
    print("🎉 欢迎使用Celery Demo!")
    print("本脚本将自动设置并运行完整的Celery演示")
    print("-" * 50)
    
    processes = []
    
    try:
        # 1. 检查和启动RabbitMQ
        if not check_rabbitmq():
            if not start_rabbitmq_docker():
                print("❌ 无法启动RabbitMQ，演示终止")
                return
        else:
            print("✅ RabbitMQ已运行")
        
        # 2. 安装依赖
        if not install_dependencies():
            print("❌ 无法安装依赖，演示终止")
            return
        
        # 3. 启动Celery Worker
        worker_proc = start_worker()
        processes.append(worker_proc)
        
        # 4. 启动Celery Beat（可选）
        print("\n是否启动定期任务调度器? (y/n): ", end="")
        if input().lower().startswith('y'):
            beat_proc = start_beat()
            processes.append(beat_proc)
        
        # 5. 运行客户端演示
        print("\n按Enter键开始运行客户端演示...")
        input()
        
        run_client()
        
        print("\n✅ 演示完成!")
        print("Worker和Beat将继续运行，按Ctrl+C停止")
        
        # 保持运行直到用户中断
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n⚠️ 用户中断演示")
    except Exception as e:
        print(f"\n❌ 演示过程中出现错误: {e}")
    finally:
        cleanup(processes)

if __name__ == "__main__":
    main() 