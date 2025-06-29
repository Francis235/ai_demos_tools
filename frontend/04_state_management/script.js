const { useState, useEffect, useReducer, createContext, useContext } = React;

// Redux-style state management demos
function StateManagementApp() {
    const [currentDemo, setCurrentDemo] = useState('redux');

    const demos = {
        redux: <ReduxDemo />,
        context: <ContextDemo />,
        patterns: <StatePatternsDemo />
    };

    return (
        <div className="state-container">
            <h2>🔄 State Management Demonstrations</h2>
            <div className="action-buttons">
                <button className="btn btn-primary" onClick={() => setCurrentDemo('redux')}>Redux Demo</button>
                <button className="btn btn-primary" onClick={() => setCurrentDemo('context')}>Context API</button>
                <button className="btn btn-primary" onClick={() => setCurrentDemo('patterns')}>State Patterns</button>
            </div>
            {demos[currentDemo]}
        </div>
    );
}

// Redux Counter Demo
function ReduxDemo() {
    const counterReducer = (state = { count: 0 }, action) => {
        switch (action.type) {
            case 'INCREMENT': return { count: state.count + 1 };
            case 'DECREMENT': return { count: state.count - 1 };
            case 'RESET': return { count: 0 };
            default: return state;
        }
    };

    const store = Redux.createStore(counterReducer);
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubscribe = store.subscribe(() => setState(store.getState()));
        return unsubscribe;
    }, []);

    return (
        <div className="redux-demo">
            <h3>Redux Counter</h3>
            <div className="counter-display">
                <h2>Count: {state.count}</h2>
            </div>
            <div className="action-buttons">
                <button className="btn btn-secondary" onClick={() => store.dispatch({ type: 'INCREMENT' })}>+1</button>
                <button className="btn btn-secondary" onClick={() => store.dispatch({ type: 'DECREMENT' })}>-1</button>
                <button className="btn btn-secondary" onClick={() => store.dispatch({ type: 'RESET' })}>Reset</button>
            </div>
            <div className="state-display">
                <pre>State: {JSON.stringify(state, null, 2)}</pre>
            </div>
        </div>
    );
}

// Context API Demo
const ThemeContext = createContext();

function ContextDemo() {
    const [theme, setTheme] = useState('light');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className="context-demo">
                <h3>Context API Theme Switcher</h3>
                <ThemeConsumer />
            </div>
        </ThemeContext.Provider>
    );
}

function ThemeConsumer() {
    const { theme, setTheme } = useContext(ThemeContext);
    
    const themeStyles = {
        light: { background: '#fff', color: '#333' },
        dark: { background: '#333', color: '#fff' }
    };
    
    return (
        <div style={{ ...themeStyles[theme], padding: '2rem', borderRadius: '8px', margin: '1rem 0' }}>
            <h4>Current Theme: {theme}</h4>
            <div className="action-buttons">
                <button className="btn btn-primary" onClick={() => setTheme('light')}>Light Theme</button>
                <button className="btn btn-primary" onClick={() => setTheme('dark')}>Dark Theme</button>
            </div>
            <p>This component gets theme from Context API!</p>
        </div>
    );
}

// State Patterns Demo
function StatePatternsDemo() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });

    const addUser = () => {
        if (newUser.name && newUser.email) {
            setUsers(prev => [...prev, { ...newUser, id: Date.now() }]);
            setNewUser({ name: '', email: '' });
        }
    };

    const removeUser = (id) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    return (
        <div className="user-management">
            <h3>User Management (State Patterns)</h3>
            
            <div className="user-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>
                <button className="btn btn-primary" onClick={addUser}>Add User</button>
            </div>

            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user-card">
                        <div className="user-avatar">{user.name[0]}</div>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                        <button className="btn btn-secondary" onClick={() => removeUser(user.id)}>Remove</button>
                    </div>
                ))}
            </div>

            {users.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666', margin: '2rem 0' }}>
                    No users yet. Add one above!
                </p>
            )}
        </div>
    );
}

// Initialize demos
document.addEventListener('DOMContentLoaded', function() {
    const demoRoot = document.getElementById('state-demo-root');
    if (demoRoot) {
        ReactDOM.render(<StateManagementApp />, demoRoot);
    }

    // Playground
    const playgroundOutput = document.getElementById('statePlaygroundOutput');
    if (playgroundOutput) {
        const defaultDemo = () => {
            const counterReducer = (state = { count: 0 }, action) => {
                switch (action.type) {
                    case 'INCREMENT': return { count: state.count + 1 };
                    case 'DECREMENT': return { count: state.count - 1 };
                    default: return state;
                }
            };

            const store = Redux.createStore(counterReducer);

            function Counter() {
                const [state, setState] = React.useState(store.getState());
                
                React.useEffect(() => {
                    const unsubscribe = store.subscribe(() => setState(store.getState()));
                    return unsubscribe;
                }, []);
                
                return (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                        <h2>Count: {state.count}</h2>
                        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
                        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
                    </div>
                );
            }

            return <Counter />;
        };

        ReactDOM.render(defaultDemo(), playgroundOutput);
    }

    // Run code button
    document.getElementById('runStateCode')?.addEventListener('click', function() {
        const editor = document.getElementById('stateCodeEditor');
        const output = document.getElementById('statePlaygroundOutput');
        
        if (editor && output) {
            const code = editor.value;
            
            try {
                const transformedCode = Babel.transform(code, { presets: ['react'] }).code;
                const func = new Function('React', 'ReactDOM', 'Redux', transformedCode);
                const result = func(React, ReactDOM, Redux);
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
});
