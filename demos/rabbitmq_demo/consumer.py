#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RabbitMQ 消费者示例
这个脚本演示了如何从RabbitMQ队列接收消息
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
    # 声明队列，确保队列存在
    # 即使生产者已经创建了队列，消费者也应该声明队列
    # 这是因为我们不知道生产者和消费者哪个先启动
    channel.queue_declare(queue=queue_name, durable=True)
    print(f"{Fore.GREEN}✓ 队列 '{queue_name}' 已准备就绪{Style.RESET_ALL}")
    
    # 设置公平分发
    # 告诉RabbitMQ不要一次给消费者发送多于1条消息
    # 即在消费者处理完当前消息并确认之前，不要发送新消息
    channel.basic_qos(prefetch_count=1)
    print(f"{Fore.GREEN}✓ 已启用公平分发模式{Style.RESET_ALL}")

def callback(ch, method, properties, body):
    """
    消息处理回调函数
    当接收到消息时，这个函数会被调用
    
    参数:
        ch: 通道对象
        method: 包含投递信息的对象
        properties: 消息属性
        body: 消息内容
    """
    try:
        # 解码消息内容
        message = body.decode('utf-8')
        current_time = time.strftime("%Y-%m-%d %H:%M:%S")
        
        print(f"\n{Fore.GREEN}📨 收到新消息:{Style.RESET_ALL}")
        print(f"  {Fore.WHITE}内容: {message}{Style.RESET_ALL}")
        print(f"  {Fore.BLUE}时间: {current_time}{Style.RESET_ALL}")
        print(f"  {Fore.MAGENTA}投递标签: {method.delivery_tag}{Style.RESET_ALL}")
        
        # 模拟消息处理时间
        # 在实际应用中，这里会是你的业务逻辑
        print(f"  {Fore.YELLOW}🔄 正在处理消息...{Style.RESET_ALL}")
        time.sleep(2)  # 模拟2秒的处理时间
        
        # 手动确认消息已处理
        # 这告诉RabbitMQ消息已被成功处理，可以从队列中删除
        ch.basic_ack(delivery_tag=method.delivery_tag)
        print(f"  {Fore.GREEN}✅ 消息处理完成并已确认{Style.RESET_ALL}")
        
    except Exception as e:
        print(f"  {Fore.RED}❌ 处理消息时出错: {e}{Style.RESET_ALL}")
        # 在实际应用中，你可能需要决定是否重新入队消息
        # ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

def main():
    """主函数"""
    queue_name = 'hello_queue'
    
    print(f"{Fore.CYAN}{'='*50}")
    print(f"🐰 RabbitMQ 消息消费者示例")
    print(f"{'='*50}{Style.RESET_ALL}")
    
    # 创建连接和通道
    connection, channel = create_connection()
    
    # 设置队列
    setup_queue(channel, queue_name)
    
    # 设置消息消费
    # auto_ack=False 表示手动确认消息
    # 这确保只有在消息被成功处理后才从队列中删除
    channel.basic_consume(
        queue=queue_name,
        on_message_callback=callback,
        auto_ack=False
    )
    
    print(f"\n{Fore.YELLOW}🎯 等待消息中... 按 CTRL+C 退出{Style.RESET_ALL}")
    print(f"{Fore.CYAN}💡 提示：请启动生产者发送消息{Style.RESET_ALL}")
    
    try:
        # 开始消费消息
        # 这会阻塞程序，持续监听队列中的消息
        channel.start_consuming()
        
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}👋 用户中断，停止消费者{Style.RESET_ALL}")
        
        # 停止消费消息
        channel.stop_consuming()
        
        # 关闭连接
        connection.close()
        print(f"{Fore.GREEN}✓ 连接已关闭{Style.RESET_ALL}")

if __name__ == '__main__':
    main() 