#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RabbitMQ 生产者示例
这个脚本演示了如何发送消息到RabbitMQ队列
"""

import pika
import sys
import time
from colorama import Fore, Style, init

# 初始化colorama，让控制台输出彩色文字
init()

def create_connection():
    """
    创建RabbitMQ连接
    返回: connection, channel
    """
    try:
        print(f"{Fore.YELLOW}正在连接到RabbitMQ服务器...{Style.RESET_ALL}")
        
        # 连接到本地RabbitMQ服务器
        # 默认参数: host='localhost', port=5672, username='guest', password='guest'
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='localhost')
        )
        channel = connection.channel()
        
        print(f"{Fore.GREEN}✓ 成功连接到RabbitMQ服务器{Style.RESET_ALL}")
        return connection, channel
        
    except pika.exceptions.AMQPConnectionError:
        print(f"{Fore.RED}❌ 连接失败！请确保RabbitMQ服务器正在运行{Style.RESET_ALL}")
        print(f"{Fore.CYAN}💡 提示：运行 'brew services start rabbitmq' 启动服务{Style.RESET_ALL}")
        sys.exit(1)

def setup_queue(channel, queue_name):
    """
    设置队列
    参数:
        channel: RabbitMQ通道
        queue_name: 队列名称
    """
    # 声明队列，如果队列不存在则创建
    # durable=True 表示队列持久化，服务器重启后队列不会丢失
    channel.queue_declare(queue=queue_name, durable=True)
    print(f"{Fore.GREEN}✓ 队列 '{queue_name}' 已准备就绪{Style.RESET_ALL}")

def send_message(channel, queue_name, message):
    """
    发送消息到队列
    参数:
        channel: RabbitMQ通道
        queue_name: 队列名称
        message: 要发送的消息
    """
    try:
        # 发布消息到队列
        # exchange='' 表示使用默认交换机
        # routing_key=queue_name 表示路由到指定队列
        # properties 设置消息属性，delivery_mode=2 表示消息持久化
        channel.basic_publish(
            exchange='',
            routing_key=queue_name,
            body=message.encode('utf-8'),
            properties=pika.BasicProperties(
                delivery_mode=2,  # 消息持久化
            )
        )
        print(f"{Fore.GREEN}✓ 已发送消息: {Fore.WHITE}'{message}'{Style.RESET_ALL}")
        
    except Exception as e:
        print(f"{Fore.RED}❌ 发送消息失败: {e}{Style.RESET_ALL}")

def main():
    """主函数"""
    queue_name = 'hello_queue'
    
    print(f"{Fore.CYAN}{'='*50}")
    print(f"🐰 RabbitMQ 消息生产者示例")
    print(f"{'='*50}{Style.RESET_ALL}")
    
    # 创建连接和通道
    connection, channel = create_connection()
    
    # 设置队列
    setup_queue(channel, queue_name)
    
    try:
        print(f"\n{Fore.YELLOW}开始发送消息（输入 'quit' 退出）{Style.RESET_ALL}")
        
        message_count = 1
        while True:
            # 获取用户输入
            user_input = input(f"\n{Fore.CYAN}请输入消息内容: {Style.RESET_ALL}")
            
            if user_input.lower() == 'quit':
                print(f"{Fore.YELLOW}👋 退出生产者{Style.RESET_ALL}")
                break
                
            if not user_input.strip():
                # 如果用户没有输入内容，发送默认消息
                message = f"Hello World! 这是第 {message_count} 条消息"
                message_count += 1
            else:
                message = user_input
            
            # 发送消息
            send_message(channel, queue_name, message)
            
            # 添加时间戳信息
            current_time = time.strftime("%Y-%m-%d %H:%M:%S")
            print(f"{Fore.BLUE}📅 发送时间: {current_time}{Style.RESET_ALL}")
            
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}👋 用户中断，退出生产者{Style.RESET_ALL}")
    
    finally:
        # 关闭连接
        connection.close()
        print(f"{Fore.GREEN}✓ 连接已关闭{Style.RESET_ALL}")

if __name__ == '__main__':
    main() 