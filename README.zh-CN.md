# AI Demos & Tools 🤖

**Language**: [English](README.md) | [中文](README.zh-CN.md)

一个用于收集和展示AI相关演示项目和实用工具的仓库。

## 📁 项目结构

```
ai_demos_tools/
├── demos/          # AI演示项目
│   ├── rabbitmq_demo/     # RabbitMQ消息队列学习Demo
│   ├── celery_demo/       # Celery分布式任务队列演示
│   └── README.md
├── tools/          # AI工具集合
│   └── README.md
└── README.md       # 项目说明文档
```

## 🎯 项目目标

- **demos/**: 收集各种AI技术的演示项目，包括但不限于机器学习、深度学习、自然语言处理、计算机视觉等领域的实践案例
- **tools/**: 提供AI开发过程中常用的工具和脚本，帮助提高开发效率

## 📋 当前项目

### 🐰 RabbitMQ 消息队列学习Demo

- **位置**: `demos/rabbitmq_demo/`
- **描述**: 完整的RabbitMQ入门学习项目，通过实际代码快速掌握消息队列的基本概念和使用方法
- **特色**:
  - 5分钟快速体验
  - 完整环境配置指南
  - 详细的Web管理界面使用说明
  - 丰富的学习资源和进阶路径
- **标签**: `[入门级]` `[实用]` `[教学]`

### 🎯 Celery 分布式任务队列演示

- **位置**: `demos/celery_demo/`
- **描述**: 全面的Celery学习项目，从基础概念到高级功能的完整演示
- **特色**:
  - 多种运行模式（独立模式、真实Worker模式）
  - 完整的任务工作流演示（Chain、Group、Chord）
  - 超时处理和错误恢复机制
  - 一键运行脚本，自动环境配置
  - 中英文双语文档
  - 详细的故障排除指南
- **核心功能**:
  - ✅ 基础任务调用和结果获取
  - ✅ 任务状态跟踪和进度监控
  - ✅ 任务工作流：串行链、并行组、回调和弦
  - ✅ 错误处理和重试机制
  - ✅ 任务路由和速率限制
  - ✅ 定时任务和周期性任务
- **推荐运行方式**:
  - `complete_demo.py` - 快速体验版（无需外部服务）
  - `client_fixed.py` - 完整功能版（带超时保护）
  - `run_demo.py` - 一键运行版（自动配置环境）
- **标签**: `[中级]` `[生产级]` `[分布式]` `[异步处理]`

## 🚀 快速开始

1. 克隆仓库

```bash
git clone https://github.com/Francis235/ai_demos_tools.git
cd ai_demos_tools
```

2. 浏览demos文件夹查看可用的演示项目

```bash
cd demos
ls -la
```

3. 浏览tools文件夹查看可用的工具

```bash
cd tools
ls -la
```

## 📚 使用说明

### Demos目录

每个演示项目都包含：

- 详细的README说明
- 完整的源代码
- 运行所需的依赖文件
- 示例数据（如果需要）

### Tools目录

每个工具都包含：

- 功能说明文档
- 使用方法和示例
- 安装和配置指南

## 🤝 贡献指南

欢迎贡献您的AI项目和工具！请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个Pull Request

### 贡献规范

- 每个demo或tool都应该有清晰的README文档
- 代码应该有适当的注释
- 如果使用第三方库，请在requirements.txt中列出
- 确保代码可以正常运行

## ⚠️ 重要提示

### Celery Demo 使用注意事项

基于实际测试经验，我们发现了一些重要的使用注意事项：

#### 🚨 常见问题和解决方案

1. **`client.py` 可能会卡住不动**
   - **原因**: 某些任务（如进度跟踪任务）可能会无限等待
   - **解决方案**: 使用 `client_fixed.py`，包含超时处理机制

2. **Worker启动失败 "module tasks was not found"**
   - **原因**: 未在正确目录下启动Worker
   - **解决方案**: 确保在 `demos/celery_demo/` 目录下运行命令

3. **推荐的运行顺序**:
   ```bash
   # 1. 快速体验（推荐新手）
   cd demos/celery_demo/
   python complete_demo.py
   
   # 2. 完整功能体验（推荐）
   cd demos/celery_demo/
   docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   celery -A tasks worker --loglevel=info --detach
   python client_fixed.py
   
   # 3. 一键运行（自动配置）
   cd demos/celery_demo/
   python run_demo.py
   ```

#### 📊 各运行方式对比

| 运行方式 | 外部依赖 | 功能完整度 | 卡死风险 | 推荐场景 |
|---------|---------|-----------|---------|---------|
| `complete_demo.py` | ❌ 无 | 🔵 核心功能 | ❌ 无 | 快速学习概念 |
| `client_fixed.py` | ✅ RabbitMQ+Worker | 🟢 完整功能 | ❌ 有超时保护 | 完整功能体验 |
| `client.py` | ✅ RabbitMQ+Worker | 🟢 完整功能 | ⚠️ 可能卡死 | 仅供参考 |
| `run_demo.py` | 🔄 自动配置 | 🟢 完整功能 | ❌ 自动处理 | 一键体验 |

## 📋 待办事项

- [X]  添加第一个演示项目 - RabbitMQ消息队列学习Demo
- [X]  添加Celery分布式任务队列演示项目
- [X]  完善Celery Demo的错误处理和用户体验
- [ ]  添加更多AI相关的演示项目
- [ ]  添加常用的AI开发工具
- [ ]  完善文档和使用指南
- [ ]  添加CI/CD流程

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如果您有任何问题或建议，请通过以下方式联系：

- 创建 [Issue](https://github.com/Francis235/ai_demos_tools/issues)
- 发起 [Pull Request](https://github.com/Francis235/ai_demos_tools/pulls)

---

⭐ 如果这个项目对您有帮助，请考虑给它一个星标！
