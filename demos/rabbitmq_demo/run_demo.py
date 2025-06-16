#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RabbitMQ Demo 启动脚本
快速体验RabbitMQ的消息发送和接收
"""

import subprocess
import sys
import time
import threading
from colorama import Fore, Style, init

# 初始化colorama
init()

def run_consumer():
    """在后台运行消费者"""
    try:
        print(f"{Fore.BLUE}🚀 启动消费者...{Style.RESET_ALL}")
        subprocess.run([sys.executable, "consumer.py"])
    except KeyboardInterrupt:
        pass

def run_producer():
    """运行生产者"""
    try:
        print(f"{Fore.GREEN}🚀 启动生产者...{Style.RESET_ALL}")
        time.sleep(2)  # 等待消费者启动
        subprocess.run([sys.executable, "producer.py"])
    except KeyboardInterrupt:
        pass

def main():
    """主函数"""
    print(f"{Fore.CYAN}{'='*60}")
    print(f"🐰 RabbitMQ Demo 快速启动脚本")
    print(f"{'='*60}{Style.RESET_ALL}")
    print(f"{Fore.YELLOW}📝 注意：请确保RabbitMQ服务已启动！{Style.RESET_ALL}")
    print(f"{Fore.CYAN}💡 启动命令：brew services start rabbitmq{Style.RESET_ALL}")
    
    input(f"\n{Fore.WHITE}按 Enter 继续...{Style.RESET_ALL}")
    
    try:
        # 在子线程中启动消费者
        consumer_thread = threading.Thread(target=run_consumer, daemon=True)
        consumer_thread.start()
        
        # 在主线程中启动生产者
        run_producer()
        
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}👋 退出Demo{Style.RESET_ALL}")

if __name__ == '__main__':
    main() 