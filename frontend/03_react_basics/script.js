const { useState, useEffect, useReducer } = React;

// Main React Demo Components
function ReactDemoApp() {
    const [currentDemo, setCurrentDemo] = useState(null);
    const [showCode, setShowCode] = useState(false);

    return (
        <div className="react-demo-container">
            <h2 className="component-header">🎯 React Live Demos</h2>
            
            {!currentDemo && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Click any "Demo" button below to see React components in action!</p>
                </div>
            )}
            
            {currentDemo === 'functional-component' && <FunctionalComponentDemo />}
            {currentDemo === 'composition' && <CompositionDemo />}
            {currentDemo === 'reusable' && <ReusableComponentDemo />}
            {currentDemo === 'jsx-expressions' && <JSXExpressionsDemo />}
            {currentDemo === 'conditional' && <ConditionalRenderingDemo />}
            {currentDemo === 'lists' && <ListsDemo />}
            {currentDemo === 'props-basic' && <PropsBasicDemo />}
            {currentDemo === 'props-destructuring' && <PropsDestructuringDemo />}
            {currentDemo === 'default-props' && <DefaultPropsDemo />}
            {currentDemo === 'useState' && <UseStateDemo />}
            {currentDemo === 'state-updates' && <StateUpdatesDemo />}
            {currentDemo === 'forms' && <FormsDemo />}
            {currentDemo === 'click-events' && <ClickEventsDemo />}
            {currentDemo === 'form-events' && <FormEventsDemo />}
            {currentDemo === 'event-object' && <EventObjectDemo />}
            {currentDemo === 'useEffect' && <UseEffectDemo />}
            {currentDemo === 'custom-hooks' && <CustomHooksDemo />}
            {currentDemo === 'useReducer' && <UseReducerDemo />}
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button 
                    className="btn btn-secondary"
                    onClick={() => setCurrentDemo(null)}
                >
                    Clear Demo
                </button>
            </div>
        </div>
    );
}

// Component Demos
function FunctionalComponentDemo() {
    function Welcome({ name }) {
        return <h1>Hello, {name}!</h1>;
    }
    
    return (
        <div className="react-component">
            <div className="component-header">Functional Component Demo</div>
            <Welcome name="Alice" />
            <Welcome name="Bob" />
            <Welcome name="Charlie" />
        </div>
    );
}

function CompositionDemo() {
    function Header() {
        return <header style={{ background: '#007bff', color: 'white', padding: '1rem', borderRadius: '8px' }}>Header Component</header>;
    }
    
    function MainContent() {
        return <main style={{ background: '#f8f9fa', padding: '2rem', margin: '1rem 0', borderRadius: '8px' }}>Main Content Component</main>;
    }
    
    function Footer() {
        return <footer style={{ background: '#333', color: 'white', padding: '1rem', borderRadius: '8px' }}>Footer Component</footer>;
    }
    
    function App() {
        return (
            <div>
                <Header />
                <MainContent />
                <Footer />
            </div>
        );
    }
    
    return (
        <div className="react-component">
            <div className="component-header">Component Composition Demo</div>
            <App />
        </div>
    );
}

function ReusableComponentDemo() {
    function Button({ children, onClick, variant }) {
        return (
            <button 
                className={`btn btn-${variant}`}
                onClick={onClick}
                style={{ margin: '0.5rem' }}
            >
                {children}
            </button>
        );
    }
    
    const handleClick = (buttonType) => {
        alert(`${buttonType} button clicked!`);
    };
    
    return (
        <div className="react-component">
            <div className="component-header">Reusable Component Demo</div>
            <p>Same Button component with different props:</p>
            <Button variant="primary" onClick={() => handleClick('Primary')}>
                Primary Button
            </Button>
            <Button variant="secondary" onClick={() => handleClick('Secondary')}>
                Secondary Button
            </Button>
            <Button variant="demo" onClick={() => handleClick('Demo')}>
                Demo Button
            </Button>
        </div>
    );
}

function JSXExpressionsDemo() {
    const name = 'React';
    const user = { name: 'Alice', age: 25, profession: 'Developer' };
    const currentTime = new Date().toLocaleTimeString();
    
    return (
        <div className="react-component">
            <div className="component-header">JSX Expressions Demo</div>
            <h3>Hello, {name}!</h3>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                <h4>Welcome, {user.name}!</h4>
                <p>Age: {user.age}</p>
                <p>Profession: {user.profession}</p>
                <p>Current time: {currentTime}</p>
                <p>Math calculation: {2 + 3 * 4}</p>
            </div>
        </div>
    );
}

function ConditionalRenderingDemo() {
    const [user, setUser] = useState(null);
    
    const login = () => setUser({ name: 'Alice', role: 'admin' });
    const logout = () => setUser(null);
    
    return (
        <div className="react-component">
            <div className="component-header">Conditional Rendering Demo</div>
            {user ? (
                <div style={{ background: '#d4edda', padding: '1rem', borderRadius: '8px' }}>
                    <h3>Welcome back, {user.name}!</h3>
                    <p>Role: {user.role}</p>
                    <button className="btn btn-secondary" onClick={logout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div style={{ background: '#f8d7da', padding: '1rem', borderRadius: '8px' }}>
                    <h3>Please sign in</h3>
                    <button className="btn btn-primary" onClick={login}>
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

function ListsDemo() {
    const todos = [
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build a project', completed: false },
        { id: 3, text: 'Deploy to production', completed: false }
    ];
    
    return (
        <div className="react-component">
            <div className="component-header">Lists & Keys Demo</div>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li 
                        key={todo.id} 
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                        <input 
                            type="checkbox" 
                            checked={todo.completed} 
                            readOnly 
                        />
                        <span className="todo-text">{todo.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PropsBasicDemo() {
    function UserProfile({ name, age, isActive, email }) {
        return (
            <div className="user-card">
                <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: '#007bff', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                }}>
                    {name[0]}
                </div>
                <div>
                    <h4>{name}</h4>
                    <p>Age: {age}</p>
                    <p>Email: {email}</p>
                    <span style={{ 
                        background: isActive ? '#28a745' : '#dc3545',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                    }}>
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="react-component">
            <div className="component-header">Props Basic Demo</div>
            <UserProfile 
                name="Alice Johnson"
                age={25}
                isActive={true}
                email="alice@example.com"
            />
            <UserProfile 
                name="Bob Smith"
                age={30}
                isActive={false}
                email="bob@example.com"
            />
        </div>
    );
}

function PropsDestructuringDemo() {
    // Without destructuring
    function UserCardOld(props) {
        return <div>Hello, {props.name}! Email: {props.email}</div>;
    }
    
    // With destructuring
    function UserCardNew({ name, email, avatar = '👤' }) {
        return (
            <div className="user-card">
                <span style={{ fontSize: '2rem' }}>{avatar}</span>
                <div>
                    <h4>{name}</h4>
                    <p>{email}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="react-component">
            <div className="component-header">Props Destructuring Demo</div>
            <h4>Without destructuring:</h4>
            <UserCardOld name="Alice" email="alice@example.com" />
            
            <h4 style={{ marginTop: '1rem' }}>With destructuring:</h4>
            <UserCardNew name="Alice" email="alice@example.com" avatar="👩‍💻" />
            <UserCardNew name="Bob" email="bob@example.com" avatar="👨‍💼" />
        </div>
    );
}

function DefaultPropsDemo() {
    function Button({ 
        children, 
        variant = 'primary', 
        size = 'medium',
        disabled = false 
    }) {
        const sizeStyles = {
            small: { padding: '8px 16px', fontSize: '0.9rem' },
            medium: { padding: '12px 24px', fontSize: '1rem' },
            large: { padding: '16px 32px', fontSize: '1.1rem' }
        };
        
        return (
            <button 
                className={`btn btn-${variant}`}
                style={{ 
                    ...sizeStyles[size], 
                    margin: '0.5rem',
                    opacity: disabled ? 0.6 : 1 
                }}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
    
    return (
        <div className="react-component">
            <div className="component-header">Default Props Demo</div>
            <p>Buttons with different prop combinations:</p>
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button size="small">Small Button</Button>
            <Button size="large" variant="demo">Large Demo Button</Button>
            <Button disabled>Disabled Button</Button>
        </div>
    );
}

function UseStateDemo() {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('Hello, React!');
    
    return (
        <div className="react-component">
            <div className="component-header">useState Hook Demo</div>
            <div className="counter-display">
                <h2>Count: {count}</h2>
                <div className="counter-controls">
                    <button 
                        className="btn btn-primary"
                        onClick={() => setCount(count - 1)}
                    >
                        -1
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={() => setCount(count + 1)}
                    >
                        +1
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => setCount(0)}
                    >
                        Reset
                    </button>
                </div>
            </div>
            
            <div style={{ margin: '1rem 0' }}>
                <p>Message: {message}</p>
                <button 
                    className="btn btn-demo"
                    onClick={() => setMessage(message === 'Hello, React!' ? 'State updated!' : 'Hello, React!')}
                >
                    Toggle Message
                </button>
            </div>
        </div>
    );
}

function StateUpdatesDemo() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: 0
    });
    
    const updateName = () => {
        setUser(prev => ({
            ...prev,
            name: 'Alice Johnson'
        }));
    };
    
    const updateMultiple = () => {
        setUser(prev => ({
            ...prev,
            name: 'Bob Smith',
            email: 'bob@example.com',
            age: 30
        }));
    };
    
    const resetUser = () => {
        setUser({ name: '', email: '', age: 0 });
    };
    
    return (
        <div className="react-component">
            <div className="component-header">State Updates Demo</div>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                <h4>Current User:</h4>
                <p>Name: {user.name || 'No name set'}</p>
                <p>Email: {user.email || 'No email set'}</p>
                <p>Age: {user.age || 'No age set'}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={updateName}>
                    Update Name Only
                </button>
                <button className="btn btn-demo" onClick={updateMultiple}>
                    Update Multiple Properties
                </button>
                <button className="btn btn-secondary" onClick={resetUser}>
                    Reset User
                </button>
            </div>
        </div>
    );
}

function FormsDemo() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };
    
    return (
        <div className="react-component">
            <div className="component-header">Forms & State Demo</div>
            
            {submitted && (
                <div className="success">
                    Form submitted successfully! 
                    Name: {form.name}, Email: {form.email}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                </div>
                
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>
                
                <div className="form-group">
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        rows="3"
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">
                    Submit Form
                </button>
            </form>
        </div>
    );
}

// Event Handling Demos
function ClickEventsDemo() {
    const [clickCount, setClickCount] = useState(0);
    const [lastClicked, setLastClicked] = useState('');
    
    const handleClick = (e) => {
        console.log('Simple button clicked!', e);
        setClickCount(prev => prev + 1);
        setLastClicked('Simple button');
    };
    
    const handleButtonClick = (buttonName) => {
        console.log(`${buttonName} clicked!`);
        setClickCount(prev => prev + 1);
        setLastClicked(buttonName);
    };
    
    return (
        <div className="react-component">
            <div className="component-header">Click Events Demo</div>
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                <p>Total clicks: {clickCount}</p>
                <p>Last clicked: {lastClicked}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={handleClick}>
                    Simple Click
                </button>
                <button className="btn btn-demo" onClick={() => handleButtonClick('Special Button')}>
                    Click with Parameter
                </button>
                <button className="btn btn-secondary" onClick={() => handleButtonClick('Another Button')}>
                    Another Button
                </button>
            </div>
        </div>
    );
}

function FormEventsDemo() {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', value);
        setSubmitted(value);
        setValue('');
    };
    
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    
    return (
        <div className="react-component">
            <div className="component-header">Form Events Demo</div>
            
            {submitted && (
                <div className="success">
                    Last submitted: "{submitted}"
                </div>
            )}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                <input 
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="Type something..."
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '2px solid #e9ecef' }}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
            
            <p>Current value: {value}</p>
        </div>
    );
}

function EventObjectDemo() {
    const [eventInfo, setEventInfo] = useState('');
    
    const handleEvent = (e) => {
        const info = `
            Event type: ${e.type}
            Target: ${e.target.tagName}
            Value: ${e.target.value || 'N/A'}
            Timestamp: ${new Date().toLocaleTimeString()}
        `;
        setEventInfo(info);
        console.log('Event details:', e);
    };
    
    return (
        <div className="react-component">
            <div className="component-header">Event Object Demo</div>
            
            <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={handleEvent}>
                    Click Me
                </button>
                <input 
                    type="text"
                    onChange={handleEvent}
                    placeholder="Type here..."
                    style={{ padding: '0.5rem', borderRadius: '4px', border: '2px solid #e9ecef' }}
                />
            </div>
            
            {eventInfo && (
                <pre style={{ 
                    background: '#f8f9fa', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                }}>
                    {eventInfo}
                </pre>
            )}
        </div>
    );
}

// Hooks Demos
function UseEffectDemo() {
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(0);
    
    // Effect runs after every render
    useEffect(() => {
        document.title = `Count: ${count}`;
    });
    
    // Effect with cleanup
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="react-component">
            <div className="component-header">useEffect Hook Demo</div>
            
            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                <p>Count: {count} (check browser title!)</p>
                <p>Timer: {timer} seconds</p>
            </div>
            
            <button 
                className="btn btn-primary"
                onClick={() => setCount(count + 1)}
            >
                Increment Count (Updates Title)
            </button>
        </div>
    );
}

function CustomHooksDemo() {
    // Custom hook
    function useCounter(initialValue = 0) {
        const [count, setCount] = useState(initialValue);
        
        const increment = () => setCount(c => c + 1);
        const decrement = () => setCount(c => c - 1);
        const reset = () => setCount(initialValue);
        
        return { count, increment, decrement, reset };
    }
    
    // Using custom hook
    const counter1 = useCounter(10);
    const counter2 = useCounter(100);
    
    return (
        <div className="react-component">
            <div className="component-header">Custom Hooks Demo</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
                    <h4>Counter 1 (starts at 10)</h4>
                    <p>Count: {counter1.count}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-small btn-primary" onClick={counter1.increment}>+</button>
                        <button className="btn btn-small btn-primary" onClick={counter1.decrement}>-</button>
                        <button className="btn btn-small btn-secondary" onClick={counter1.reset}>Reset</button>
                    </div>
                </div>
                
                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
                    <h4>Counter 2 (starts at 100)</h4>
                    <p>Count: {counter2.count}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-small btn-primary" onClick={counter2.increment}>+</button>
                        <button className="btn btn-small btn-primary" onClick={counter2.decrement}>-</button>
                        <button className="btn btn-small btn-secondary" onClick={counter2.reset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function UseReducerDemo() {
    const todoReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_TODO':
                return [...state, { 
                    id: Date.now(), 
                    text: action.text, 
                    completed: false 
                }];
            case 'TOGGLE_TODO':
                return state.map(todo =>
                    todo.id === action.id 
                        ? { ...todo, completed: !todo.completed }
                        : todo
                );
            case 'DELETE_TODO':
                return state.filter(todo => todo.id !== action.id);
            default:
                return state;
        }
    };
    
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [inputText, setInputText] = useState('');
    
    const addTodo = () => {
        if (inputText.trim()) {
            dispatch({ type: 'ADD_TODO', text: inputText });
            setInputText('');
        }
    };
    
    return (
        <div className="react-component">
            <div className="component-header">useReducer Hook Demo</div>
            
            <div className="todo-container">
                <div className="todo-input">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Add a new todo..."
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <button className="btn btn-primary" onClick={addTodo}>
                        Add Todo
                    </button>
                </div>
                
                <ul className="todo-list">
                    {todos.map(todo => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <input 
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
                            />
                            <span className="todo-text">{todo.text}</span>
                            <button 
                                className="btn btn-small btn-secondary"
                                onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                
                {todos.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#666', margin: '2rem 0' }}>
                        No todos yet. Add one above!
                    </p>
                )}
            </div>
        </div>
    );
}

// React Playground
function ReactPlayground() {
    const [code, setCode] = useState(`function MyComponent() {
  const [message, setMessage] = React.useState('Hello, React!');
  
  return (
    <div style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
      <h2>{message}</h2>
      <button 
        onClick={() => setMessage('You clicked me!')}
        style={{ 
          padding: '0.5rem 1rem', 
          background: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Click me!
      </button>
    </div>
  );
}

return <MyComponent />;`);
    
    const [output, setOutput] = useState(null);
    const [error, setError] = useState(null);
    
    const runCode = () => {
        try {
            setError(null);
            // Transform and execute the code
            const transformedCode = Babel.transform(code, {
                presets: ['react']
            }).code;
            
            // Create a function that returns the component
            const func = new Function('React', 'ReactDOM', transformedCode);
            const result = func(React, ReactDOM);
            
            setOutput(result);
        } catch (err) {
            setError(err.message);
            setOutput(null);
        }
    };
    
    useEffect(() => {
        runCode();
    }, []);
    
    return (
        <div>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                    width: '100%',
                    height: '300px',
                    padding: '1rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '14px',
                    border: '2px solid #e9ecef',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                }}
            />
            
            <div style={{ marginBottom: '1rem' }}>
                <button className="btn btn-primary" onClick={runCode}>
                    Run Code
                </button>
            </div>
            
            {error && (
                <div className="error">
                    <strong>Error:</strong> {error}
                </div>
            )}
            
            {output && !error && (
                <div style={{ 
                    border: '2px solid #28a745', 
                    borderRadius: '8px', 
                    padding: '1rem',
                    background: 'white'
                }}>
                    {output}
                </div>
            )}
        </div>
    );
}

// Initialize React Demo
document.addEventListener('DOMContentLoaded', function() {
    // Mount main React demo
    const demoRoot = document.getElementById('react-demo-root');
    if (demoRoot) {
        ReactDOM.render(<ReactDemoApp />, demoRoot);
    }
    
    // Mount playground
    const playgroundOutput = document.getElementById('reactPlaygroundOutput');
    if (playgroundOutput) {
        ReactDOM.render(<ReactPlayground />, playgroundOutput);
    }
    
    // Demo button handlers
    document.querySelectorAll('[data-demo]').forEach(button => {
        button.addEventListener('click', function() {
            const demoType = this.getAttribute('data-demo');
            const demoRoot = document.getElementById('react-demo-root');
            
            // Update demo based on button clicked
            const demoComponents = {
                'functional-component': <FunctionalComponentDemo />,
                'composition': <CompositionDemo />,
                'reusable': <ReusableComponentDemo />,
                'jsx-expressions': <JSXExpressionsDemo />,
                'conditional': <ConditionalRenderingDemo />,
                'lists': <ListsDemo />,
                'props-basic': <PropsBasicDemo />,
                'props-destructuring': <PropsDestructuringDemo />,
                'default-props': <DefaultPropsDemo />,
                'useState': <UseStateDemo />,
                'state-updates': <StateUpdatesDemo />,
                'forms': <FormsDemo />,
                'click-events': <ClickEventsDemo />,
                'form-events': <FormEventsDemo />,
                'event-object': <EventObjectDemo />,
                'useEffect': <UseEffectDemo />,
                'custom-hooks': <CustomHooksDemo />,
                'useReducer': <UseReducerDemo />
            };
            
            if (demoComponents[demoType]) {
                ReactDOM.render(demoComponents[demoType], demoRoot);
            }
        });
    });
    
    // Control buttons
    document.getElementById('startDemo')?.addEventListener('click', function() {
        const demoRoot = document.getElementById('react-demo-root');
        ReactDOM.render(<ReactDemoApp />, demoRoot);
    });
    
    document.getElementById('resetDemo')?.addEventListener('click', function() {
        const demoRoot = document.getElementById('react-demo-root');
        ReactDOM.render(
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Click any "Demo" button below to see React components in action!</p>
            </div>, 
            demoRoot
        );
    });
    
    // Playground controls
    document.getElementById('runReactCode')?.addEventListener('click', function() {
        const editor = document.getElementById('reactCodeEditor');
        const output = document.getElementById('reactPlaygroundOutput');
        
        if (editor && output) {
            const code = editor.value;
            
            try {
                // Transform JSX to regular JavaScript
                const transformedCode = Babel.transform(code, {
                    presets: ['react']
                }).code;
                
                // Create and execute the component
                const func = new Function('React', 'ReactDOM', transformedCode);
                const result = func(React, ReactDOM);
                
                // Render the result
                ReactDOM.render(result, output);
            } catch (error) {
                ReactDOM.render(
                    <div className="error">
                        <strong>Error:</strong> {error.message}
                    </div>,
                    output
                );
            }
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
