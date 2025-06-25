# Celery配置文件
from datetime import timedelta

# Broker设置（RabbitMQ）
broker_url = 'pyamqp://guest@localhost//'

# 结果后端设置
result_backend = 'rpc://'

# 任务序列化
task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']

# 时区设置
timezone = 'Asia/Shanghai'
enable_utc = True

# 任务路由配置
task_routes = {
    'tasks.slow_task': {'queue': 'slow_queue'},
    'tasks.fast_task': {'queue': 'fast_queue'},
    'tasks.fetch_url': {'queue': 'network_queue'},
}

# 任务注解配置
task_annotations = {
    'tasks.limited_task': {'rate_limit': '10/m'},
    'tasks.fetch_url': {'rate_limit': '50/m'},
    'tasks.slow_task': {'time_limit': 300},  # 5分钟超时
}

# 定期任务配置（Celery Beat）
beat_schedule = {
    # 每30秒执行一次定期任务
    'periodic-task-every-30-seconds': {
        'task': 'tasks.periodic_task',
        'schedule': 30.0,
    },
    # 每分钟执行一次快速任务
    'fast-task-every-minute': {
        'task': 'tasks.fast_task',
        'schedule': timedelta(minutes=1),
        'args': ('每分钟定期消息',)
    },
    # 每天午夜执行数据处理任务
    'daily-data-processing': {
        'task': 'tasks.process_data',
        'schedule': timedelta(days=1),
        'args': ('daily_report_data',),
        'options': {'queue': 'slow_queue'}
    },
    # 使用cron表达式：每天上午9点
    'morning-report': {
        'task': 'tasks.periodic_task',
        'schedule': {
            'minute': 0,
            'hour': 9,
        },
    },
}

# Worker配置
worker_prefetch_multiplier = 1  # 每次只取一个任务
worker_max_tasks_per_child = 1000  # 每个worker处理1000个任务后重启

# 结果过期时间
result_expires = 3600  # 1小时

# 任务压缩
task_compression = 'gzip'
result_compression = 'gzip'

# 监控配置
worker_send_task_events = True
task_send_sent_event = True

# 安全配置
worker_hijack_root_logger = False
worker_log_color = True 