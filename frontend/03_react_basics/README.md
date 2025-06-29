# React Basics - 反应基础

Welcome to the React Basics learning module! This comprehensive demo covers fundamental React concepts with interactive examples.

欢迎来到 React 基础学习模块！这个综合演示涵盖了基本的 React 概念和交互式示例。

## 🎯 Learning Objectives | 学习目标

**English:**
- Understand React components and JSX syntax
- Learn props, state, and data flow
- Master event handling in React
- Explore React Hooks (useState, useEffect, useReducer)
- Build interactive components
- Create reusable component patterns
- Practice with live coding playground

**中文:**
- 理解 React 组件和 JSX 语法
- 学习 props、state 和数据流
- 掌握 React 中的事件处理
- 探索 React Hooks（useState、useEffect、useReducer）
- 构建交互式组件
- 创建可重用的组件模式
- 通过实时编码练习场进行练习

## 📋 Prerequisites | 前置要求

**English:**
- Completion of HTML/CSS Fundamentals
- Completion of JavaScript ES6+ Fundamentals
- Understanding of DOM manipulation
- Familiarity with modern JavaScript features

**中文:**
- 完成 HTML/CSS 基础
- 完成 JavaScript ES6+ 基础
- 理解 DOM 操作
- 熟悉现代 JavaScript 特性

## 🚀 Getting Started | 开始使用

**English:**
1. Navigate to the React Basics directory
2. Start a local server:
   ```bash
   cd frontend/03_react_basics
   python3 -m http.server 8003 --bind 127.0.0.1
   ```
3. Open your browser and visit: http://127.0.0.1:8003
4. Explore the interactive React demonstrations

**中文:**
1. 导航到 React 基础目录
2. 启动本地服务器：
   ```bash
   cd frontend/03_react_basics
   python3 -m http.server 8003 --bind 127.0.0.1
   ```
3. 打开浏览器并访问：http://127.0.0.1:8003
4. 探索交互式 React 演示

## 📁 File Structure | 文件结构

```
03_react_basics/
├── index.html          # Main demo page with React CDN setup
├── styles.css          # Comprehensive styling for React components
├── script.js           # Interactive React components and demos
└── README.md           # This documentation (English/Chinese)
```

## 🎨 Demo Features | 演示功能

**English:**

### 1. React Components
- **Functional Components**: Modern function-based components
- **Component Composition**: Building complex UIs from simple components
- **Reusable Components**: Creating flexible, reusable UI elements

### 2. JSX Syntax
- **JSX Expressions**: Embedding JavaScript in JSX
- **Conditional Rendering**: Showing different content based on conditions
- **Lists & Keys**: Rendering dynamic lists efficiently

### 3. Props (Properties)
- **Basic Props**: Passing data from parent to child components
- **Props Destructuring**: Clean syntax for accessing props
- **Default Props**: Setting default values for component props

### 4. State Management
- **useState Hook**: Managing component state
- **State Updates**: Different patterns for updating state
- **Forms & State**: Controlled components and form handling

### 5. Event Handling
- **Click Events**: Handling user interactions
- **Form Events**: Managing form submissions and changes
- **Event Object**: Understanding React's SyntheticEvent

### 6. React Hooks
- **useEffect**: Side effects and lifecycle management
- **Custom Hooks**: Creating reusable logic
- **useReducer**: Managing complex state with reducers

### 7. Interactive Playground
- **Live Code Editor**: Write and test React components
- **Real-time Compilation**: JSX transformation with Babel
- **Error Handling**: Clear error messages for debugging

**中文:**

### 1. React 组件
- **函数组件**：现代基于函数的组件
- **组件组合**：从简单组件构建复杂 UI
- **可重用组件**：创建灵活、可重用的 UI 元素

### 2. JSX 语法
- **JSX 表达式**：在 JSX 中嵌入 JavaScript
- **条件渲染**：根据条件显示不同内容
- **列表与键**：高效渲染动态列表

### 3. Props（属性）
- **基本 Props**：从父组件向子组件传递数据
- **Props 解构**：访问 props 的简洁语法
- **默认 Props**：为组件 props 设置默认值

### 4. 状态管理
- **useState Hook**：管理组件状态
- **状态更新**：更新状态的不同模式
- **表单与状态**：受控组件和表单处理

### 5. 事件处理
- **点击事件**：处理用户交互
- **表单事件**：管理表单提交和更改
- **事件对象**：理解 React 的 SyntheticEvent

### 6. React Hooks
- **useEffect**：副作用和生命周期管理
- **自定义 Hooks**：创建可重用的逻辑
- **useReducer**：使用 reducers 管理复杂状态

### 7. 交互式练习场
- **实时代码编辑器**：编写和测试 React 组件
- **实时编译**：使用 Babel 进行 JSX 转换
- **错误处理**：清晰的错误信息用于调试

## 🔧 Key Concepts Covered | 涵盖的关键概念

**English:**

### Component Architecture
```jsx
// Functional Component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Component with State
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Event Handling
```jsx
function Button({ onClick, children }) {
  const handleClick = (e) => {
    console.log('Button clicked!', e);
    onClick && onClick(e);
  };
  
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}
```

### State Management
```jsx
// Simple State
const [message, setMessage] = useState('Hello');

// Object State
const [user, setUser] = useState({
  name: '',
  email: ''
});

// Update object state
setUser(prev => ({
  ...prev,
  name: 'Alice'
}));
```

### Effects and Lifecycle
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div>Timer: {seconds}</div>;
}
```

**中文:**

### 组件架构
```jsx
// 函数组件
function Welcome({ name }) {
  return <h1>你好，{name}！</h1>;
}

// 带状态的组件
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}
```

## 💡 Practice Exercises | 练习练习

**English:**

### Beginner Level
1. **Hello Component**: Create a component that displays your name
2. **Toggle Button**: Build a button that toggles between two messages
3. **Simple Counter**: Implement increment/decrement functionality
4. **User Profile**: Create a component that displays user information

### Intermediate Level
1. **Todo List**: Build a complete todo application with add/toggle/delete
2. **Form Validation**: Create a form with real-time validation
3. **Shopping Cart**: Implement add/remove items functionality
4. **Weather App**: Fetch and display weather data

### Advanced Level
1. **Custom Hooks**: Create reusable logic for data fetching
2. **Context API**: Implement global state management
3. **Performance Optimization**: Use React.memo and useMemo
4. **Component Library**: Build a set of reusable components

**中文:**

### 初级水平
1. **Hello 组件**：创建一个显示你姓名的组件
2. **切换按钮**：构建一个在两条消息之间切换的按钮
3. **简单计数器**：实现增加/减少功能
4. **用户配置文件**：创建一个显示用户信息的组件

### 中级水平
1. **待办事项列表**：构建一个完整的待办应用程序，包括添加/切换/删除
2. **表单验证**：创建一个具有实时验证的表单
3. **购物车**：实现添加/删除商品功能
4. **天气应用**：获取并显示天气数据

### 高级水平
1. **自定义 Hooks**：为数据获取创建可重用逻辑
2. **Context API**：实现全局状态管理
3. **性能优化**：使用 React.memo 和 useMemo
4. **组件库**：构建一套可重用的组件

## 🔍 Common Patterns | 常见模式

**English:**

### 1. Props Pattern
```jsx
// Parent component
function App() {
  const user = { name: 'Alice', email: 'alice@example.com' };
  
  return <UserCard user={user} />;
}

// Child component
function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

### 2. Conditional Rendering
```jsx
function Greeting({ user }) {
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}
```

### 3. List Rendering
```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

### 4. Form Handling
```jsx
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  return (
    <form>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
      />
    </form>
  );
}
```

**中文:**

### 1. Props 模式
```jsx
// 父组件
function App() {
  const user = { name: '爱丽丝', email: 'alice@example.com' };
  
  return <UserCard user={user} />;
}

// 子组件
function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

## 🐛 Common Issues & Solutions | 常见问题与解决方案

**English:**

### Issue 1: "Cannot read property of undefined"
**Problem**: Accessing props or state that doesn't exist
**Solution**: Use optional chaining or default values
```jsx
// Problem
<div>{user.name}</div>

// Solution
<div>{user?.name || 'No name'}</div>
```

### Issue 2: "Each child in a list should have a unique key prop"
**Problem**: Missing key prop when rendering lists
**Solution**: Always provide unique keys
```jsx
// Problem
{items.map(item => <div>{item.name}</div>)}

// Solution
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

### Issue 3: State not updating immediately
**Problem**: State updates are asynchronous
**Solution**: Use functional updates or useEffect
```jsx
// Problem
setCount(count + 1);
console.log(count); // Still old value

// Solution
setCount(prevCount => {
  const newCount = prevCount + 1;
  console.log(newCount); // Correct value
  return newCount;
});
```

**中文:**

### 问题 1："无法读取未定义的属性"
**问题**：访问不存在的 props 或 state
**解决方案**：使用可选链或默认值
```jsx
// 问题
<div>{user.name}</div>

// 解决方案
<div>{user?.name || '没有姓名'}</div>
```

## 🚀 Next Steps | 下一步

**English:**
After mastering React basics, you're ready to move on to:
- **State Management** (Redux, Context API)
- **React Router** (Navigation and routing)
- **API Integration** (Fetch data from servers)
- **Testing** (Unit and integration testing)
- **Performance Optimization** (Code splitting, memoization)

**中文:**
掌握 React 基础后，你可以继续学习：
- **状态管理**（Redux、Context API）
- **React Router**（导航和路由）
- **API 集成**（从服务器获取数据）
- **测试**（单元测试和集成测试）
- **性能优化**（代码分割、记忆化）

## 📚 Additional Resources | 额外资源

**English:**
- [Official React Documentation](https://reactjs.org/docs/getting-started.html)
- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [React Hooks Guide](https://reactjs.org/docs/hooks-intro.html)
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)
- [React DevTools Browser Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

**中文:**
- [React 官方文档](https://zh-hans.reactjs.org/docs/getting-started.html)
- [React 教程](https://zh-hans.reactjs.org/tutorial/tutorial.html)
- [React Hooks 指南](https://zh-hans.reactjs.org/docs/hooks-intro.html)
- [React 编程思想](https://zh-hans.reactjs.org/docs/thinking-in-react.html)
- [React DevTools 浏览器扩展](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

## 🎯 Success Criteria | 成功标准

**English:**
You have successfully completed this module when you can:
- ✅ Create functional React components
- ✅ Understand and use JSX syntax effectively
- ✅ Pass and use props correctly
- ✅ Manage component state with useState
- ✅ Handle events in React components
- ✅ Use useEffect for side effects
- ✅ Create custom hooks for reusable logic
- ✅ Build interactive user interfaces
- ✅ Debug React applications effectively

**中文:**
当你能够做到以下几点时，就成功完成了这个模块：
- ✅ 创建函数式 React 组件
- ✅ 理解并有效使用 JSX 语法
- ✅ 正确传递和使用 props
- ✅ 使用 useState 管理组件状态
- ✅ 在 React 组件中处理事件
- ✅ 使用 useEffect 处理副作用
- ✅ 创建自定义 hooks 实现可重用逻辑
- ✅ 构建交互式用户界面
- ✅ 有效调试 React 应用程序

---

🎉 **Happy Learning!** | **学习愉快！**

Continue your full-stack journey with the next module: **State Management**

继续你的全栈学习之旅，进入下一个模块：**状态管理**
