# Celery Demo - 完整的分布式任务队列演示

**Language**: [English](README.md) | [中文](README.zh-CN.md)

这是一个完整的Celery演示项目，展示了Celery的各种功能和使用场景。

## ⚠️ 重要提示

**基于实际测试经验，我们强烈建议您先阅读以下注意事项：**

### 🚨 避免程序卡死的重要说明

1. **`client.py` 可能会卡住不动** ⚠️
   - **问题**: 某些任务（特别是进度跟踪任务）可能会无限等待
   - **解决方案**: 使用 `client_fixed.py` 替代，包含超时保护机制

2. **Worker启动失败** ⚠️
   - **错误**: `Unable to load celery application. The module tasks was not found.`
   - **原因**: 未在正确目录下启动Worker
   - **解决方案**: 确保在 `demos/celery_demo/` 目录下运行所有命令

### 📋 推荐的运行方式

| 文件 | 适用场景 | 外部依赖 | 卡死风险 | 推荐指数 |
|------|---------|---------|---------|---------|
| `complete_demo.py` | 快速学习概念 | ❌ 无 | ❌ 无 | ⭐⭐⭐⭐⭐ |
| `client_fixed.py` | 完整功能体验 | ✅ RabbitMQ+Worker | ❌ 有超时保护 | ⭐⭐⭐⭐ |
| `run_demo.py` | 一键完整演示 | 🔄 自动配置 | ❌ 自动处理 | ⭐⭐⭐⭐ |
| `client.py` | 仅供参考 | ✅ RabbitMQ+Worker | ⚠️ 可能卡死 | ⭐⭐ |

## 🎯 什么是Celery？

**Celery** 是一个基于Python的分布式任务队列系统，用于处理异步任务和定时任务。它的主要特点包括：

### 核心概念

1. **任务（Task）**：需要异步执行的工作单元
2. **消息代理（Broker）**：负责传递任务消息（如RabbitMQ、Redis）
3. **工作进程（Worker）**：执行任务的进程
4. **结果后端（Result Backend）**：存储任务执行结果的地方
5. **调度器（Beat）**：负责定时任务的组件

### 架构图

```
客户端应用 → 消息代理(RabbitMQ) → 工作进程 → 结果后端
     ↑                                    ↓
     └────────── 获取结果 ←─────────────────┘
```

## 🚀 快速开始

### 前置要求

1. **Python 3.7+**
2. **Docker**（用于运行RabbitMQ，仅完整模式需要）
3. **pip**（Python包管理器）

### 🌟 推荐：快速体验（无需外部依赖）

```bash
cd demos/celery_demo
python complete_demo.py
```

**优势**：
- ✅ 无需Docker或RabbitMQ
- ✅ 无卡死风险
- ✅ 演示所有核心概念
- ✅ 适合初学者快速理解

### 🔧 进阶：完整功能演示

#### 选项1：一键运行（推荐）

```bash
cd demos/celery_demo
python run_demo.py
```

#### 选项2：手动配置（学习目的）

```bash
# 1. 启动 RabbitMQ
docker run -d --name rabbitmq-celery -p 5672:5672 -p 15672:15672 rabbitmq:3-management

# 2. 安装依赖
pip install -r requirements.txt

# 3. 启动 Worker（重要：确保在 celery_demo 目录下）
cd demos/celery_demo
celery -A tasks worker --loglevel=info --detach

# 4. 运行演示（使用带超时保护的版本）
python client_fixed.py
```

#### ⚠️ 不推荐的方式

```bash
# 可能会卡死，仅供参考
python client.py
```

### 🔍 故障排除指南

#### 常见问题 1：Worker启动失败

```bash
# 错误信息
Error: Invalid value for '-A' / '--app': 
Unable to load celery application.
The module tasks was not found.

# 解决方案：检查当前目录
pwd  # 应该在 .../demos/celery_demo/
ls   # 应该看到 tasks.py 文件

# 正确启动方式
cd /path/to/demos/celery_demo
celery -A tasks worker --loglevel=info
```

#### 常见问题 2：程序卡住不动

```bash
# 问题：运行 client.py 后程序卡住
python client.py  # 可能在进度跟踪处卡住

# 解决方案：使用带超时保护的版本
python client_fixed.py  # 包含超时处理
```

#### 常见问题 3：Docker端口冲突

```bash
# 检查端口是否被占用
lsof -i :5672
lsof -i :15672

# 停止现有容器
docker stop rabbitmq-celery
docker rm rabbitmq-celery
```

### 🛠️ 详细的手动配置（高级用户）

如果您想深入了解每个步骤，可以手动配置：

#### 1. 启动RabbitMQ

```bash
# 使用Docker启动RabbitMQ
docker run -d --name rabbitmq-celery -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

#### 2. 安装依赖

```bash
pip install -r requirements.txt
```

#### 3. 启动Celery Worker（⚠️ 重要：目录位置）

```bash
# 确保在正确目录下
cd demos/celery_demo

# 基本worker
celery -A tasks worker --loglevel=info

# 或者启动带队列的worker
celery -A tasks worker --loglevel=info --queues=fast_queue,slow_queue,network_queue
```

#### 4. 启动Celery Beat（定期任务调度器）

```bash
celery -A tasks beat --loglevel=info
```

#### 5. 运行客户端演示

```bash
# 推荐：带超时保护的版本
python client_fixed.py

# 不推荐：可能卡死的版本
# python client.py
```

## 📚 演示内容详解

### 1. 基本任务 (Basic Tasks)

```python
@app.task
def add(x, y):
    return x + y

# 调用方式
result = add.delay(4, 4)
print(result.get())  # 输出: 8
```

**学习要点**：
- `@app.task` 装饰器定义任务
- `delay()` 方法异步调用任务
- `get()` 方法获取结果（会阻塞）

### 2. 任务状态监控

```python
@app.task(bind=True)
def slow_task(self, duration):
    for i in range(duration):
        self.update_state(
            state='PROGRESS',
            meta={'current': i + 1, 'total': duration}
        )
        time.sleep(1)
    return {'status': '完成'}
```

**学习要点**：
- `bind=True` 让任务访问自身实例
- `update_state()` 更新任务状态
- 客户端可以实时监控进度

### 3. 任务路由 (Task Routing)

将不同类型的任务分配到不同的队列：

```python
# 配置
task_routes = {
    'tasks.slow_task': {'queue': 'slow_queue'},
    'tasks.fast_task': {'queue': 'fast_queue'},
}

# 启动专门的worker
celery -A tasks worker --queues=fast_queue
celery -A tasks worker --queues=slow_queue
```

**优势**：
- 资源隔离
- 优先级管理
- 性能优化

### 4. 任务组合

#### 任务组 (Group) - 并行执行

```python
from celery import group

job = group([
    add.s(2, 2),
    add.s(4, 4),
    add.s(8, 8),
])
result = job.apply_async()
print(result.get())  # [4, 8, 16]
```

#### 任务链 (Chain) - 串行执行

```python
from celery import chain

workflow = chain(
    process_data.s("hello"),
    save_result.s()
)
result = workflow.apply_async()
```

#### 任务和弦 (Chord) - 并行+汇总

```python
from celery import chord

callback = save_result.s()
job = chord([
    process_data.s("data1"),
    process_data.s("data2"),
    process_data.s("data3"),
])(callback)
```

### 5. 错误处理和重试

```python
@app.task(bind=True, autoretry_for=(Exception,), 
          retry_kwargs={'max_retries': 3, 'countdown': 5})
def fetch_url(self, url):
    try:
        response = requests.get(url)
        return response.json()
    except Exception as exc:
        raise self.retry(exc=exc)
```

### 6. 速率限制

```python
@app.task
def limited_task(data):
    return process(data)

# 配置限制
task_annotations = {
    'tasks.limited_task': {'rate_limit': '10/m'}  # 每分钟10个
}
```

### 7. 定期任务

```python
# celeryconfig.py
beat_schedule = {
    'daily-report': {
        'task': 'tasks.generate_report',
        'schedule': timedelta(days=1),
    },
    'every-minute': {
        'task': 'tasks.check_system',
        'schedule': 60.0,
    },
}
```

## 🏗️ 高级用法

### 1. 自定义任务类

```python
from celery import Task

class CallbackTask(Task):
    def on_success(self, retval, task_id, args, kwargs):
        print(f'任务 {task_id} 成功完成')
    
    def on_failure(self, exc, task_id, args, kwargs, einfo):
        print(f'任务 {task_id} 失败: {exc}')

@app.task(base=CallbackTask)
def important_task():
    return "重要任务完成"
```

### 2. 任务优先级

```python
# 发送高优先级任务
add.apply_async((2, 2), priority=9)

# 发送低优先级任务
add.apply_async((2, 2), priority=1)
```

### 3. 任务到期时间

```python
from datetime import datetime, timedelta

# 10秒后过期
add.apply_async((2, 2), expires=datetime.now() + timedelta(seconds=10))
```

### 4. 任务回调

```python
# 成功回调
add.apply_async((2, 2), link=success_callback.s())

# 失败回调
add.apply_async((2, 2), link_error=failure_callback.s())
```

### 5. Canvas（工作流）进阶

```python
# 复杂工作流
workflow = (
    group([
        chain(process_data.s(f"batch_{i}"), validate_data.s())
        for i in range(3)
    ]) | 
    combine_results.s() | 
    send_notification.s()
)
```

## 🔧 配置详解

### 消息代理配置

```python
# RabbitMQ
broker_url = 'pyamqp://user:pass@localhost:5672/vhost'

# Redis
broker_url = 'redis://localhost:6379/0'

# Amazon SQS
broker_url = 'sqs://ACCESS_KEY:SECRET_KEY@'
```

### 结果后端配置

```python
# RPC (推荐用于测试)
result_backend = 'rpc://'

# Redis
result_backend = 'redis://localhost:6379/0'

# 数据库
result_backend = 'db+postgresql://user:pass@localhost/celery'
```

### 性能调优

```python
# Worker并发
worker_concurrency = 4  # 或者使用 --concurrency=4

# 预取乘数
worker_prefetch_multiplier = 1  # 每次只取一个任务

# 任务压缩
task_compression = 'gzip'
result_compression = 'gzip'

# 连接池
broker_pool_limit = 10
```

## 📊 监控和管理

### 1. Flower监控工具

```bash
pip install flower
flower -A tasks --port=5555
```

访问 http://localhost:5555 查看任务监控界面

### 2. 命令行工具

```bash
# 查看活跃任务
celery -A tasks inspect active

# 查看注册的任务
celery -A tasks inspect registered

# 控制worker
celery -A tasks control shutdown

# 撤销任务
celery -A tasks control revoke <task-id>
```

### 3. 日志配置

```python
# 配置日志
import logging
logging.basicConfig(level=logging.INFO)

# 或在启动时指定
celery -A tasks worker --loglevel=debug
```

## 🎯 最佳实践

### 1. 任务设计

- **幂等性**：任务应该可以安全地重复执行
- **原子性**：任务应该是原子操作
- **短小**：避免长时间运行的任务

### 2. 错误处理

- 使用重试机制处理临时性错误
- 记录详细的错误日志
- 设置合理的超时时间

### 3. 性能优化

- 合理设置worker数量
- 使用任务路由分离不同类型的任务
- 配置适当的预取设置

### 4. 安全考虑

- 不要序列化敏感数据
- 使用安全的消息传输
- 限制任务的执行权限

## 🔍 常见问题和解决方案

### Q: 程序运行后卡住不动？ ⚠️

**A: 这是最常见的问题！**
- **原因**: `client.py` 的某些任务（如`slow_task`）可能会无限等待
- **解决方案**: 使用 `client_fixed.py` 或 `complete_demo.py`
- **预防**: 生产环境中总是设置超时时间

### Q: Worker启动失败"module tasks was not found"？

**A: 这是目录问题！**
```bash
# 错误的做法
cd /some/other/directory
celery -A tasks worker  # ❌ 找不到tasks.py

# 正确的做法
cd demos/celery_demo
celery -A tasks worker  # ✅ 正确
```

### Q: 任务一直显示PENDING状态？

A: 检查以下几点：
- Worker是否正在运行：`ps aux | grep celery`
- 是否在正确目录下启动Worker
- 任务是否有`ignore_result=True`设置
- 结果后端是否正确配置

### Q: 如何选择运行方式？

A: 根据您的需求选择：
- **学习概念** → `complete_demo.py`
- **完整体验** → `client_fixed.py`
- **一键运行** → `run_demo.py`
- **避免使用** → `client.py`（可能卡死）

### Q: 如何处理长时间运行的任务？

A: 
- 将大任务分解为小任务
- 使用任务链或组合
- 设置合理的超时时间（重要！）
- 实现进度报告

### Q: 如何保证任务的顺序执行？

A: 
- 使用单一worker
- 使用任务链(chain)
- 设置合适的路由和队列

### Q: Docker容器启动失败？

A: 检查端口冲突：
```bash
# 检查端口占用
lsof -i :5672
lsof -i :15672

# 清理现有容器
docker stop rabbitmq-celery
docker rm rabbitmq-celery
```

## 📁 项目结构

```
celery_demo/
├── tasks.py              # 任务定义
├── client.py             # 客户端演示（⚠️ 可能卡死）
├── client_fixed.py       # 客户端演示（✅ 带超时保护）
├── complete_demo.py      # 独立演示（✅ 推荐初学者）
├── celeryconfig.py       # 配置文件
├── run_demo.py           # 一键运行脚本
├── requirements.txt      # 依赖文件
├── simple_demo.py        # 简化演示
├── final_demo.py         # 最终演示
├── standalone_demo.py    # 独立演示
├── 如何运行演示.md       # 中文使用指南
└── README.md             # 本文档
```

### 🎯 文件选择指南

**初学者推荐**：
1. `complete_demo.py` - 无需外部依赖，快速理解概念
2. `如何运行演示.md` - 中文详细说明

**完整功能体验**：
1. `run_demo.py` - 一键运行所有功能
2. `client_fixed.py` - 手动运行但有安全保护

**高级用户**：
1. `client.py` - 原始版本（注意卡死风险）
2. `celeryconfig.py` - 深入了解配置

## 🎓 进一步学习

1. **官方文档**: https://docs.celeryq.dev/
2. **最佳实践**: https://docs.celeryq.dev/en/stable/userguide/tasks.html#best-practices
3. **监控指南**: https://docs.celeryq.dev/en/stable/userguide/monitoring.html

## 📝 许可证

本演示项目仅供学习使用。 