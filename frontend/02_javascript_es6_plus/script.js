// JavaScript ES6+ Fundamentals - Interactive Demo
// This file demonstrates modern JavaScript features with live examples

// Global demo state
const DemoApp = {
    consoleOutput: null,
    playgroundOutput: null,
    isConsoleVisible: true,
    
    init() {
        this.consoleOutput = document.getElementById('consoleOutput');
        this.playgroundOutput = document.getElementById('playgroundOutput');
        this.setupEventListeners();
        this.logToConsole('🚀 JavaScript ES6+ Demo Initialized!', 'success');
        this.logToConsole('Click any demo button to explore modern JavaScript features.', 'info');
    },
    
    setupEventListeners() {
        // Main control buttons
        document.getElementById('runAllDemos')?.addEventListener('click', () => this.runAllDemos());
        document.getElementById('clearConsole')?.addEventListener('click', () => this.clearConsole());
        document.getElementById('toggleConsole')?.addEventListener('click', () => this.toggleConsole());
        
        // Demo buttons
        document.querySelectorAll('.btn-demo').forEach(btn => {
            btn.addEventListener('click', (e) => this.runDemo(e.target.dataset.demo));
        });
        
        // Playground
        document.getElementById('runCode')?.addEventListener('click', () => this.runPlaygroundCode());
        
        // Navigation smooth scrolling
        document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo(link.getAttribute('href'));
            });
        });
    },
    
    logToConsole(message, type = 'info') {
        if (!this.consoleOutput) return;
        
        const line = document.createElement('div');
        line.className = `console-line ${type} slide-in`;
        line.textContent = `> ${message}`;
        
        this.consoleOutput.appendChild(line);
        this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
        
        // Limit console lines to prevent overflow
        if (this.consoleOutput.children.length > 100) {
            this.consoleOutput.removeChild(this.consoleOutput.firstChild);
        }
    },
    
    clearConsole() {
        if (this.consoleOutput) {
            this.consoleOutput.innerHTML = `
                <div class="console-line">// JavaScript ES6+ Demo Console</div>
                <div class="console-line">// Console cleared! Ready for new demos.</div>
            `;
        }
    },
    
    toggleConsole() {
        const consoleSection = document.querySelector('.console-section');
        if (consoleSection) {
            this.isConsoleVisible = !this.isConsoleVisible;
            consoleSection.style.display = this.isConsoleVisible ? 'block' : 'none';
        }
    },
    
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    highlightCard(demo) {
        // Remove previous highlights
        document.querySelectorAll('.demo-card').forEach(card => {
            card.classList.remove('active', 'success', 'loading');
        });
        
        // Find and highlight current demo card
        const demoButton = document.querySelector(`[data-demo="${demo}"]`);
        if (demoButton) {
            const card = demoButton.closest('.demo-card');
            card.classList.add('loading');
            
            setTimeout(() => {
                card.classList.remove('loading');
                card.classList.add('success');
            }, 800);
        }
    },
    
    runDemo(demoName) {
        this.logToConsole(`\n--- Running ${demoName} Demo ---`, 'info');
        this.highlightCard(demoName);
        
        switch(demoName) {
            case 'variables': this.demoVariables(); break;
            case 'templates': this.demoTemplates(); break;
            case 'destructuring': this.demoDestructuring(); break;
            case 'arrows': this.demoArrows(); break;
            case 'defaults': this.demoDefaults(); break;
            case 'restSpread': this.demoRestSpread(); break;
            case 'arrayMethods': this.demoArrayMethods(); break;
            case 'arraySearch': this.demoArraySearch(); break;
            case 'arrayDestruct': this.demoArrayDestruct(); break;
            case 'objectDestruct': this.demoObjectDestruct(); break;
            case 'objectMethods': this.demoObjectMethods(); break;
            case 'objectLiterals': this.demoObjectLiterals(); break;
            case 'promises': this.demoPromises(); break;
            case 'asyncAwait': this.demoAsyncAwait(); break;
            case 'fetchAPI': this.demoFetchAPI(); break;
            case 'modules': this.demoModules(); break;
            case 'dynamicImports': this.demoDynamicImports(); break;
            case 'classes': this.demoClasses(); break;
            default: this.logToConsole('Demo not found!', 'error');
        }
    },
    
    async runAllDemos() {
        this.clearConsole();
        this.logToConsole('🎯 Running all ES6+ demos...', 'info');
        
        const demos = [
            'variables', 'templates', 'destructuring', 
            'arrows', 'defaults', 'restSpread',
            'arrayMethods', 'arraySearch', 'arrayDestruct',
            'objectDestruct', 'objectMethods', 'objectLiterals',
            'promises', 'asyncAwait', 'classes'
        ];
        
        for (const demo of demos) {
            await new Promise(resolve => {
                setTimeout(() => {
                    this.runDemo(demo);
                    resolve();
                }, 500);
            });
        }
        
        this.logToConsole('✅ All demos completed!', 'success');
    },
    
    // Demo Functions
    demoVariables() {
        this.logToConsole('=== Variable Declarations Demo ===');
        
        // const demo
        const PI = 3.14159;
        this.logToConsole(`const PI = ${PI} (cannot be reassigned)`);
        
        // let demo
        let userName = 'Alice';
        this.logToConsole(`let userName = '${userName}' (can be reassigned)`);
        userName = 'Bob';
        this.logToConsole(`userName changed to '${userName}'`);
        
        // var comparison (showing scope difference)
        if (true) {
            var varVariable = 'I am function scoped';
            let letVariable = 'I am block scoped';
            this.logToConsole(`Inside block - var: ${varVariable}`);
            this.logToConsole(`Inside block - let: ${letVariable}`);
        }
        this.logToConsole(`Outside block - var still accessible: ${varVariable}`);
        
        // Block scoping demo
        for (let i = 0; i < 3; i++) {
            // let i is only accessible within this loop
        }
        // this.logToConsole(`Outside loop - i is not accessible`);
        
        this.logToConsole('✓ Variables demo complete', 'success');
    },
    
    demoTemplates() {
        this.logToConsole('=== Template Literals Demo ===');
        
        const name = 'JavaScript';
        const version = 'ES6+';
        const year = 2024;
        
        // Basic interpolation
        const greeting = `Hello, ${name}!`;
        this.logToConsole(`Basic: ${greeting}`);
        
        // Complex expressions
        const info = `Learning ${name} ${version} in ${year}`;
        this.logToConsole(`Complex: ${info}`);
        
        // Multiline strings
        const multiline = `This is a
multiline string that
spans several lines!`;
        this.logToConsole('Multiline string created');
        
        // Function calls in templates
        const calculate = (a, b) => a + b;
        const result = `2 + 3 = ${calculate(2, 3)}`;
        this.logToConsole(`Function call: ${result}`);
        
        // Nested templates
        const nested = `Outer ${ `Inner ${name}` } template`;
        this.logToConsole(`Nested: ${nested}`);
        
        this.logToConsole('✓ Template literals demo complete', 'success');
    },
    
    demoDestructuring() {
        this.logToConsole('=== Destructuring Demo ===');
        
        // Array destructuring
        const colors = ['red', 'green', 'blue', 'yellow'];
        const [first, second, ...rest] = colors;
        this.logToConsole(`Array destructuring: first=${first}, second=${second}`);
        this.logToConsole(`Rest elements: [${rest.join(', ')}]`);
        
        // Object destructuring
        const person = { name: 'Alice', age: 30, city: 'NYC', country: 'USA' };
        const { name, age } = person;
        this.logToConsole(`Object destructuring: ${name}, age ${age}`);
        
        // Renaming during destructuring
        const { name: fullName, city: location } = person;
        this.logToConsole(`Renamed: fullName=${fullName}, location=${location}`);
        
        // Default values
        const { occupation = 'Developer', salary = 'Not specified' } = person;
        this.logToConsole(`With defaults: occupation=${occupation}, salary=${salary}`);
        
        // Nested destructuring
        const user = {
            profile: { firstName: 'John', lastName: 'Doe' },
            settings: { theme: 'dark', notifications: true }
        };
        const { profile: { firstName }, settings: { theme } } = user;
        this.logToConsole(`Nested: firstName=${firstName}, theme=${theme}`);
        
        // Swapping variables
        let a = 1, b = 2;
        [a, b] = [b, a];
        this.logToConsole(`Swapped: a=${a}, b=${b}`);
        
        this.logToConsole('✓ Destructuring demo complete', 'success');
    },
    
    demoArrows() {
        this.logToConsole('=== Arrow Functions Demo ===');
        
        // Traditional function vs arrow function
        function traditionalAdd(a, b) {
            return a + b;
        }
        const arrowAdd = (a, b) => a + b;
        
        this.logToConsole(`Traditional: ${traditionalAdd(5, 3)}`);
        this.logToConsole(`Arrow: ${arrowAdd(5, 3)}`);
        
        // Single parameter (no parentheses needed)
        const square = x => x * x;
        this.logToConsole(`Square of 4: ${square(4)}`);
        
        // No parameters
        const random = () => Math.floor(Math.random() * 100);
        this.logToConsole(`Random number: ${random()}`);
        
        // Multiple lines (need return statement)
        const complex = (x, y) => {
            const sum = x + y;
            const product = x * y;
            return { sum, product };
        };
        const result = complex(3, 4);
        this.logToConsole(`Complex result: sum=${result.sum}, product=${result.product}`);
        
        // Array methods with arrows
        const numbers = [1, 2, 3, 4, 5];
        const doubled = numbers.map(n => n * 2);
        this.logToConsole(`Doubled: [${doubled.join(', ')}]`);
        
        this.logToConsole('✓ Arrow functions demo complete', 'success');
    },
    
    demoDefaults() {
        this.logToConsole('=== Default Parameters Demo ===');
        
        // Basic default parameters
        function greet(name = 'Friend', time = 'day') {
            return `Good ${time}, ${name}!`;
        }
        
        this.logToConsole(greet()); // Uses defaults
        this.logToConsole(greet('Alice')); // Uses default for time
        this.logToConsole(greet('Bob', 'morning')); // No defaults used
        
        // Default with expressions
        const createUser = (name, role = 'user', id = Date.now()) => ({
            id, name, role, created: new Date()
        });
        
        const user1 = createUser('Alice');
        const user2 = createUser('Bob', 'admin');
        
        this.logToConsole(`User 1: ${user1.name} (${user1.role}) - ID: ${user1.id}`);
        this.logToConsole(`User 2: ${user2.name} (${user2.role}) - ID: ${user2.id}`);
        
        // Default parameters with destructuring
        const configureApp = ({ theme = 'light', lang = 'en', debug = false } = {}) => {
            return `App configured: ${theme} theme, ${lang} language, debug: ${debug}`;
        };
        
        this.logToConsole(configureApp()); // All defaults
        this.logToConsole(configureApp({ theme: 'dark' })); // Partial config
        
        this.logToConsole('✓ Default parameters demo complete', 'success');
    },
    
    demoRestSpread() {
        this.logToConsole('=== Rest & Spread Operators Demo ===');
        
        // Rest parameters
        const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
        this.logToConsole(`Sum(1,2,3,4,5): ${sum(1, 2, 3, 4, 5)}`);
        
        const introduce = (firstName, lastName, ...hobbies) => {
            return `${firstName} ${lastName} enjoys: ${hobbies.join(', ')}`;
        };
        this.logToConsole(introduce('Alice', 'Smith', 'reading', 'coding', 'hiking'));
        
        // Spread with arrays
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        const combined = [...arr1, ...arr2];
        this.logToConsole(`Combined arrays: [${combined.join(', ')}]`);
        
        // Spread for copying
        const original = [1, 2, 3];
        const copy = [...original];
        copy.push(4);
        this.logToConsole(`Original: [${original.join(', ')}]`);
        this.logToConsole(`Copy: [${copy.join(', ')}]`);
        
        // Spread with objects
        const baseConfig = { theme: 'light', lang: 'en' };
        const userConfig = { ...baseConfig, theme: 'dark', notifications: true };
        this.logToConsole(`Config: ${JSON.stringify(userConfig)}`);
        
        // Function calls with spread
        const coords = [10, 20];
        const distance = (x, y) => Math.sqrt(x*x + y*y);
        this.logToConsole(`Distance: ${distance(...coords).toFixed(2)}`);
        
        this.logToConsole('✓ Rest & Spread demo complete', 'success');
    },
    
    demoArrayMethods() {
        this.logToConsole('=== Array Methods Demo ===');
        
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.logToConsole(`Original: [${numbers.join(', ')}]`);
        
        // Map - transform each element
        const doubled = numbers.map(n => n * 2);
        this.logToConsole(`Doubled: [${doubled.join(', ')}]`);
        
        // Filter - select elements
        const evens = numbers.filter(n => n % 2 === 0);
        this.logToConsole(`Evens: [${evens.join(', ')}]`);
        
        // Reduce - combine elements
        const sum = numbers.reduce((acc, n) => acc + n, 0);
        this.logToConsole(`Sum: ${sum}`);
        
        // Find max using reduce
        const max = numbers.reduce((max, n) => n > max ? n : max);
        this.logToConsole(`Max: ${max}`);
        
        // Chain methods
        const result = numbers
            .filter(n => n > 5)
            .map(n => n * n)
            .reduce((sum, n) => sum + n, 0);
        this.logToConsole(`Chained (>5, squared, summed): ${result}`);
        
        // Real-world example with objects
        const users = [
            { name: 'Alice', age: 25, active: true },
            { name: 'Bob', age: 30, active: false },
            { name: 'Charlie', age: 35, active: true }
        ];
        
        const activeUserNames = users
            .filter(user => user.active)
            .map(user => user.name);
        this.logToConsole(`Active users: ${activeUserNames.join(', ')}`);
        
        this.logToConsole('✓ Array methods demo complete', 'success');
    },
    
    demoArraySearch() {
        this.logToConsole('=== Array Search Methods Demo ===');
        
        const users = [
            { name: 'Alice', age: 25, role: 'admin' },
            { name: 'Bob', age: 30, role: 'user' },
            { name: 'Charlie', age: 35, role: 'user' },
            { name: 'Diana', age: 28, role: 'admin' }
        ];
        
        // Find - get first matching element
        const admin = users.find(user => user.role === 'admin');
        this.logToConsole(`First admin: ${admin.name}`);
        
        // FindIndex - get index of first match
        const bobIndex = users.findIndex(user => user.name === 'Bob');
        this.logToConsole(`Bob's index: ${bobIndex}`);
        
        // Some - check if any element matches
        const hasAdmins = users.some(user => user.role === 'admin');
        this.logToConsole(`Has admins: ${hasAdmins}`);
        
        // Every - check if all elements match
        const allAdults = users.every(user => user.age >= 18);
        this.logToConsole(`All adults: ${allAdults}`);
        
        // Includes - check if array includes value
        const ages = users.map(u => u.age);
        const has30YearOld = ages.includes(30);
        this.logToConsole(`Has 30-year-old: ${has30YearOld}`);
        
        // IndexOf - get index of value
        const names = users.map(u => u.name);
        const charlieIndex = names.indexOf('Charlie');
        this.logToConsole(`Charlie's index: ${charlieIndex}`);
        
        this.logToConsole('✓ Array search demo complete', 'success');
    },
    
    demoArrayDestruct() {
        this.logToConsole('=== Array Destructuring Demo ===');
        
        // Basic destructuring
        const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
        const [first, second] = colors;
        this.logToConsole(`First two: ${first}, ${second}`);
        
        // Skipping elements
        const [,, third] = colors;
        this.logToConsole(`Third color: ${third}`);
        
        // Rest in destructuring
        const [primary, ...secondary] = colors;
        this.logToConsole(`Primary: ${primary}, Secondary: [${secondary.join(', ')}]`);
        
        // Default values
        const [a, b, c, d, e, f = 'orange'] = colors;
        this.logToConsole(`Sixth color (default): ${f}`);
        
        // Swapping variables
        let x = 10, y = 20;
        this.logToConsole(`Before swap: x=${x}, y=${y}`);
        [x, y] = [y, x];
        this.logToConsole(`After swap: x=${x}, y=${y}`);
        
        // Function returning array
        const getCoordinates = () => [Math.random() * 100, Math.random() * 100];
        const [xCoord, yCoord] = getCoordinates();
        this.logToConsole(`Coordinates: (${xCoord.toFixed(2)}, ${yCoord.toFixed(2)})`);
        
        // Nested arrays
        const matrix = [[1, 2], [3, 4], [5, 6]];
        const [[a1, a2], [b1, b2]] = matrix;
        this.logToConsole(`Matrix elements: ${a1}, ${a2}, ${b1}, ${b2}`);
        
        this.logToConsole('✓ Array destructuring demo complete', 'success');
    },
    
    demoObjectDestruct() {
        this.logToConsole('=== Object Destructuring Demo ===');
        
        const person = {
            name: 'Alice',
            age: 30,
            city: 'NYC',
            country: 'USA',
            occupation: 'Developer'
        };
        
        // Basic destructuring
        const { name, age } = person;
        this.logToConsole(`Basic: ${name}, age ${age}`);
        
        // Renaming variables
        const { name: fullName, city: location } = person;
        this.logToConsole(`Renamed: ${fullName} from ${location}`);
        
        // Default values
        const { salary = 75000, department = 'Engineering' } = person;
        this.logToConsole(`Defaults: salary $${salary}, dept ${department}`);
        
        // Rest in object destructuring
        const { name: userName, ...details } = person;
        this.logToConsole(`User: ${userName}, Details: ${JSON.stringify(details)}`);
        
        // Nested object destructuring
        const user = {
            profile: { firstName: 'John', lastName: 'Doe', avatar: 'john.jpg' },
            settings: { theme: 'dark', notifications: true, privacy: 'private' }
        };
        
        const {
            profile: { firstName, lastName },
            settings: { theme, notifications }
        } = user;
        this.logToConsole(`Nested: ${firstName} ${lastName}, ${theme} theme, notifications: ${notifications}`);
        
        // Function parameter destructuring
        const displayUser = ({ name, age, city = 'Unknown' }) => {
            return `${name} (${age}) from ${city}`;
        };
        this.logToConsole(`Function param: ${displayUser(person)}`);
        
        this.logToConsole('✓ Object destructuring demo complete', 'success');
    },
    
    demoObjectMethods() {
        this.logToConsole('=== Object Methods Demo ===');
        
        const user = { name: 'Alice', age: 30, city: 'NYC' };
        this.logToConsole(`Original object: ${JSON.stringify(user)}`);
        
        // Object.keys()
        const keys = Object.keys(user);
        this.logToConsole(`Keys: [${keys.join(', ')}]`);
        
        // Object.values()
        const values = Object.values(user);
        this.logToConsole(`Values: [${values.join(', ')}]`);
        
        // Object.entries()
        const entries = Object.entries(user);
        this.logToConsole(`Entries: ${JSON.stringify(entries)}`);
        
        // Object.assign() - copying and merging
        const additionalInfo = { country: 'USA', job: 'Developer' };
        const merged = Object.assign({}, user, additionalInfo);
        this.logToConsole(`Merged: ${JSON.stringify(merged)}`);
        
        // Object.fromEntries() - create object from entries
        const newEntries = [['theme', 'dark'], ['lang', 'en'], ['notifications', true]];
        const config = Object.fromEntries(newEntries);
        this.logToConsole(`From entries: ${JSON.stringify(config)}`);
        
        // Object.hasOwnProperty()
        this.logToConsole(`Has 'name' property: ${user.hasOwnProperty('name')}`);
        this.logToConsole(`Has 'email' property: ${user.hasOwnProperty('email')}`);
        
        // Object.freeze() and Object.seal()
        const frozenObj = Object.freeze({ status: 'readonly' });
        // frozenObj.status = 'modified'; // This would fail in strict mode
        this.logToConsole(`Frozen object: ${JSON.stringify(frozenObj)}`);
        
        this.logToConsole('✓ Object methods demo complete', 'success');
    },
    
    demoObjectLiterals() {
        this.logToConsole('=== Enhanced Object Literals Demo ===');
        
        const name = 'Alice';
        const age = 30;
        const city = 'NYC';
        
        // Shorthand properties
        const person = { name, age, city };
        this.logToConsole(`Shorthand: ${JSON.stringify(person)}`);
        
        // Computed property names
        const prefix = 'user';
        const id = 123;
        const dynamicObj = {
            [prefix + 'Id']: id,
            [prefix + 'Name']: name,
            [`${prefix}Status`]: 'active'
        };
        this.logToConsole(`Dynamic properties: ${JSON.stringify(dynamicObj)}`);
        
        // Method definitions
        const calculator = {
            // Method shorthand
            add(a, b) { return a + b; },
            subtract(a, b) { return a - b; },
            
            // Computed method names
            [prefix + 'Method']() { return 'Dynamic method called'; }
        };
        
        this.logToConsole(`Addition: ${calculator.add(5, 3)}`);
        this.logToConsole(`Subtraction: ${calculator.subtract(10, 4)}`);
        this.logToConsole(`Dynamic method: ${calculator.userMethod()}`);
        
        // Getters and setters
        const user = {
            firstName: 'John',
            lastName: 'Doe',
            
            get fullName() {
                return `${this.firstName} ${this.lastName}`;
            },
            
            set fullName(value) {
                [this.firstName, this.lastName] = value.split(' ');
            }
        };
        
        this.logToConsole(`Full name: ${user.fullName}`);
        user.fullName = 'Jane Smith';
        this.logToConsole(`After setter: ${user.firstName} ${user.lastName}`);
        
        this.logToConsole('✓ Object literals demo complete', 'success');
    },
    
    demoPromises() {
        this.logToConsole('=== Promises Demo ===');
        
        // Simple promise
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
        delay(1000).then(() => {
            this.logToConsole('Promise resolved after 1 second!', 'success');
        });
        
        // Promise with data
        const fetchUserData = (userId) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (userId > 0) {
                        resolve({ id: userId, name: `User${userId}`, email: `user${userId}@example.com` });
                    } else {
                        reject(new Error('Invalid user ID'));
                    }
                }, 500);
            });
        };
        
        fetchUserData(1)
            .then(user => {
                this.logToConsole(`User data: ${JSON.stringify(user)}`, 'success');
            })
            .catch(error => {
                this.logToConsole(`Error: ${error.message}`, 'error');
            });
        
        // Promise.all()
        const promises = [
            fetchUserData(1),
            fetchUserData(2),
            fetchUserData(3)
        ];
        
        Promise.all(promises)
            .then(users => {
                this.logToConsole(`All users loaded: ${users.length} users`, 'success');
            })
            .catch(error => {
                this.logToConsole(`Promise.all error: ${error.message}`, 'error');
            });
        
        // Promise.race()
        const racePromises = [
            delay(1000).then(() => 'Slow promise'),
            delay(500).then(() => 'Fast promise')
        ];
        
        Promise.race(racePromises)
            .then(result => {
                this.logToConsole(`Promise.race winner: ${result}`, 'success');
            });
        
        this.logToConsole('✓ Promises demo initiated (results will appear shortly)', 'info');
    },
    
    demoAsyncAwait() {
        this.logToConsole('=== Async/Await Demo ===');
        
        // Utility promise function
        const delay = (ms, value) => new Promise(resolve => 
            setTimeout(() => resolve(value), ms)
        );
        
        // Basic async function
        const basicAsync = async () => {
            this.logToConsole('Starting async function...');
            const result = await delay(1000, 'Async result!');
            this.logToConsole(`Async completed: ${result}`, 'success');
            return result;
        };
        
        basicAsync();
        
        // Error handling with try/catch
        const fetchData = async (shouldFail = false) => {
            try {
                this.logToConsole('Fetching data...');
                
                if (shouldFail) {
                    throw new Error('Simulated fetch error');
                }
                
                const data = await delay(800, { id: 1, title: 'Sample Data' });
                this.logToConsole(`Data received: ${JSON.stringify(data)}`, 'success');
                return data;
            } catch (error) {
                this.logToConsole(`Fetch error: ${error.message}`, 'error');
                return null;
            }
        };
        
        // Multiple await calls
        const multipleOperations = async () => {
            try {
                this.logToConsole('Starting multiple async operations...');
                
                const user = await delay(500, { name: 'Alice', id: 1 });
                this.logToConsole(`User loaded: ${user.name}`);
                
                const profile = await delay(300, { bio: 'Developer', location: 'NYC' });
                this.logToConsole(`Profile loaded: ${profile.bio}`);
                
                const settings = await delay(200, { theme: 'dark', lang: 'en' });
                this.logToConsole(`Settings loaded: ${settings.theme} theme`);
                
                const combined = { ...user, ...profile, ...settings };
                this.logToConsole(`All data combined: ${JSON.stringify(combined)}`, 'success');
            } catch (error) {
                this.logToConsole(`Multiple operations error: ${error.message}`, 'error');
            }
        };
        
        // Parallel execution with Promise.all
        const parallelOperations = async () => {
            try {
                this.logToConsole('Starting parallel operations...');
                
                const [user, posts, comments] = await Promise.all([
                    delay(600, { name: 'Bob' }),
                    delay(400, ['Post 1', 'Post 2']),
                    delay(300, ['Comment 1', 'Comment 2', 'Comment 3'])
                ]);
                
                this.logToConsole(`Parallel results: User: ${user.name}, Posts: ${posts.length}, Comments: ${comments.length}`, 'success');
            } catch (error) {
                this.logToConsole(`Parallel error: ${error.message}`, 'error');
            }
        };
        
        // Run the demos
        setTimeout(() => fetchData(false), 1500);
        setTimeout(() => multipleOperations(), 2000);
        setTimeout(() => parallelOperations(), 3000);
        
        this.logToConsole('✓ Async/await demos initiated', 'info');
    },
    
    demoFetchAPI() {
        this.logToConsole('=== Fetch API Demo ===');
        
        // Simulate fetch with local data
        const mockFetch = (url, options = {}) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const mockData = {
                        '/api/users': [
                            { id: 1, name: 'Alice', email: 'alice@example.com' },
                            { id: 2, name: 'Bob', email: 'bob@example.com' }
                        ],
                        '/api/posts': [
                            { id: 1, title: 'First Post', content: 'Hello World!' },
                            { id: 2, title: 'Second Post', content: 'Learning JavaScript' }
                        ]
                    };
                    
                    resolve({
                        ok: true,
                        status: 200,
                        json: () => Promise.resolve(mockData[url] || { message: 'Not found' })
                    });
                }, 500);
            });
        };
        
        // Basic GET request
        const getUsers = async () => {
            try {
                this.logToConsole('Fetching users...');
                const response = await mockFetch('/api/users');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const users = await response.json();
                this.logToConsole(`Users fetched: ${JSON.stringify(users)}`, 'success');
                return users;
            } catch (error) {
                this.logToConsole(`Fetch error: ${error.message}`, 'error');
            }
        };
        
        // POST request simulation
        const createPost = async (postData) => {
            try {
                this.logToConsole('Creating new post...');
                const response = await mockFetch('/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });
                
                const result = await response.json();
                this.logToConsole(`Post created: ${JSON.stringify(postData)}`, 'success');
                return result;
            } catch (error) {
                this.logToConsole(`Create post error: ${error.message}`, 'error');
            }
        };
        
        // Multiple fetch requests
        const loadDashboardData = async () => {
            try {
                this.logToConsole('Loading dashboard data...');
                
                const [usersResponse, postsResponse] = await Promise.all([
                    mockFetch('/api/users'),
                    mockFetch('/api/posts')
                ]);
                
                const users = await usersResponse.json();
                const posts = await postsResponse.json();
                
                this.logToConsole(`Dashboard loaded: ${users.length} users, ${posts.length} posts`, 'success');
            } catch (error) {
                this.logToConsole(`Dashboard error: ${error.message}`, 'error');
            }
        };
        
        // Run the demos
        getUsers();
        setTimeout(() => createPost({ title: 'New Post', content: 'Created via API' }), 1000);
        setTimeout(() => loadDashboardData(), 1500);
        
        this.logToConsole('✓ Fetch API demos initiated', 'info');
    },
    
    demoModules() {
        this.logToConsole('=== ES6 Modules Demo ===');
        
        // Since we can't actually import modules in this demo environment,
        // we'll simulate the concepts
        
        this.logToConsole('// math.js - Named exports');
        this.logToConsole('export const add = (a, b) => a + b;');
        this.logToConsole('export const subtract = (a, b) => a - b;');
        this.logToConsole('export const PI = 3.14159;');
        
        this.logToConsole('\n// calculator.js - Default export');
        this.logToConsole('export default class Calculator {');
        this.logToConsole('  multiply(a, b) { return a * b; }');
        this.logToConsole('  divide(a, b) { return a / b; }');
        this.logToConsole('}');
        
        this.logToConsole('\n// main.js - Import examples');
        this.logToConsole('import Calculator from "./calculator.js";');
        this.logToConsole('import { add, subtract, PI } from "./math.js";');
        this.logToConsole('import * as MathUtils from "./math.js";');
        
        // Simulate the functionality
        const math = {
            add: (a, b) => a + b,
            subtract: (a, b) => a - b,
            PI: 3.14159
        };
        
        class Calculator {
            multiply(a, b) { return a * b; }
            divide(a, b) { return a / b; }
        }
        
        const calc = new Calculator();
        
        this.logToConsole('\n// Using imported modules:');
        this.logToConsole(`add(5, 3) = ${math.add(5, 3)}`);
        this.logToConsole(`subtract(10, 4) = ${math.subtract(10, 4)}`);
        this.logToConsole(`calc.multiply(6, 7) = ${calc.multiply(6, 7)}`);
        this.logToConsole(`PI = ${math.PI}`);
        
        this.logToConsole('\n// Re-exporting modules');
        this.logToConsole('export { add, subtract } from "./math.js";');
        this.logToConsole('export { default as Calculator } from "./calculator.js";');
        
        this.logToConsole('✓ ES6 modules concepts demonstrated', 'success');
    },
    
    demoDynamicImports() {
        this.logToConsole('=== Dynamic Imports Demo ===');
        
        // Simulate dynamic import behavior
        const simulateImport = (moduleName) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const modules = {
                        'utils': {
                            formatDate: (date) => date.toLocaleDateString(),
                            capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1)
                        },
                        'charts': {
                            createChart: (data) => `Chart created with ${data.length} data points`,
                            updateChart: (chart, data) => `Chart updated`
                        }
                    };
                    resolve(modules[moduleName] || {});
                }, 300);
            });
        };
        
        // Basic dynamic import
        const loadUtils = async () => {
            try {
                this.logToConsole('Loading utils module dynamically...');
                const utils = await simulateImport('utils');
                
                this.logToConsole(`formatDate: ${utils.formatDate(new Date())}`);
                this.logToConsole(`capitalize: ${utils.capitalize('hello world')}`);
            } catch (error) {
                this.logToConsole(`Import error: ${error.message}`, 'error');
            }
        };
        
        // Conditional import
        const loadChartsIfNeeded = async (needCharts) => {
            if (needCharts) {
                try {
                    this.logToConsole('Conditionally loading charts module...');
                    const charts = await simulateImport('charts');
                    
                    const chart = charts.createChart([1, 2, 3, 4, 5]);
                    this.logToConsole(`Charts: ${chart}`, 'success');
                } catch (error) {
                    this.logToConsole(`Charts import error: ${error.message}`, 'error');
                }
            } else {
                this.logToConsole('Charts not needed, skipping import');
            }
        };
        
        // Lazy loading simulation
        const features = {
            async loadAdvancedFeatures() {
                this.logToConsole('Loading advanced features...');
                const advanced = await simulateImport('advanced');
                this.logToConsole('Advanced features loaded!', 'success');
                return advanced;
            }
        };
        
        this.logToConsole('Dynamic import syntax examples:');
        this.logToConsole('const module = await import("./module.js");');
        this.logToConsole('const { feature } = await import("./features.js");');
        
        // Run the demos
        loadUtils();
        setTimeout(() => loadChartsIfNeeded(true), 1000);
        setTimeout(() => loadChartsIfNeeded(false), 1500);
        
        this.logToConsole('✓ Dynamic imports demo initiated', 'info');
    },
    
    demoClasses() {
        this.logToConsole('=== ES6 Classes Demo ===');
        
        // Basic class
        class Animal {
            constructor(name, species) {
                this.name = name;
                this.species = species;
            }
            
            speak() {
                return `${this.name} makes a sound`;
            }
            
            getInfo() {
                return `${this.name} is a ${this.species}`;
            }
        }
        
        const animal = new Animal('Rex', 'Dog');
        this.logToConsole(`Animal: ${animal.getInfo()}`);
        this.logToConsole(`Sound: ${animal.speak()}`);
        
        // Inheritance
        class Dog extends Animal {
            constructor(name, breed) {
                super(name, 'Dog');
                this.breed = breed;
            }
            
            speak() {
                return `${this.name} barks loudly!`;
            }
            
            fetch() {
                return `${this.name} fetches the ball`;
            }
        }
        
        const dog = new Dog('Buddy', 'Golden Retriever');
        this.logToConsole(`Dog: ${dog.getInfo()}`);
        this.logToConsole(`Dog sound: ${dog.speak()}`);
        this.logToConsole(`Dog action: ${dog.fetch()}`);
        
        // Static methods
        class MathUtils {
            static add(a, b) {
                return a + b;
            }
            
            static multiply(a, b) {
                return a * b;
            }
            
            static get PI() {
                return 3.14159;
            }
        }
        
        this.logToConsole(`Static method: MathUtils.add(5, 3) = ${MathUtils.add(5, 3)}`);
        this.logToConsole(`Static getter: MathUtils.PI = ${MathUtils.PI}`);
        
        // Private fields (simulate with # prefix concept)
        class BankAccount {
            constructor(initialBalance) {
                this._balance = initialBalance; // Private by convention
            }
            
            deposit(amount) {
                this._balance += amount;
                return this.getBalance();
            }
            
            withdraw(amount) {
                if (amount <= this._balance) {
                    this._balance -= amount;
                    return this.getBalance();
                }
                throw new Error('Insufficient funds');
            }
            
            getBalance() {
                return this._balance;
            }
        }
        
        const account = new BankAccount(100);
        this.logToConsole(`Initial balance: $${account.getBalance()}`);
        this.logToConsole(`After deposit $50: $${account.deposit(50)}`);
        this.logToConsole(`After withdraw $30: $${account.withdraw(30)}`);
        
        // Getters and setters
        class Temperature {
            constructor(celsius) {
                this._celsius = celsius;
            }
            
            get celsius() {
                return this._celsius;
            }
            
            set celsius(value) {
                this._celsius = value;
            }
            
            get fahrenheit() {
                return this._celsius * 9/5 + 32;
            }
            
            set fahrenheit(value) {
                this._celsius = (value - 32) * 5/9;
            }
        }
        
        const temp = new Temperature(25);
        this.logToConsole(`Temperature: ${temp.celsius}°C = ${temp.fahrenheit.toFixed(1)}°F`);
        temp.fahrenheit = 100;
        this.logToConsole(`After setting to 100°F: ${temp.celsius.toFixed(1)}°C`);
        
        this.logToConsole('✓ Classes demo complete', 'success');
    },
    
    // Playground functionality
    runPlaygroundCode() {
        const codeEditor = document.getElementById('codeEditor');
        const playgroundOutput = document.getElementById('playgroundOutput');
        
        if (!codeEditor || !playgroundOutput) return;
        
        const code = codeEditor.value.trim();
        if (!code) {
            this.logToPlayground('// Please enter some JavaScript code to run');
            return;
        }
        
        this.logToPlayground('// Running your code...\n');
        
        try {
            // Create a safe environment for code execution
            const originalConsole = console;
            const outputs = [];
            
            // Override console.log to capture output
            const mockConsole = {
                log: (...args) => outputs.push(args.join(' ')),
                error: (...args) => outputs.push('ERROR: ' + args.join(' ')),
                warn: (...args) => outputs.push('WARNING: ' + args.join(' ')),
                info: (...args) => outputs.push('INFO: ' + args.join(' '))
            };
            
            // Create function with the user's code
            const userFunction = new Function('console', code);
            
            // Execute the code
            const result = userFunction(mockConsole);
            
            // Display outputs
            outputs.forEach(output => {
                this.logToPlayground(output);
            });
            
            // Display return value if any
            if (result !== undefined) {
                this.logToPlayground(`\n// Return value: ${JSON.stringify(result)}`);
            }
            
            this.logToPlayground('\n// Code executed successfully! ✅');
            
        } catch (error) {
            this.logToPlayground(`// Error: ${error.message} ❌`);
        }
    },
    
    logToPlayground(message) {
        if (!this.playgroundOutput) return;
        
        const line = document.createElement('div');
        line.textContent = message;
        line.style.color = message.includes('ERROR') ? '#ff4444' : 
                          message.includes('WARNING') ? '#ffaa00' : 
                          message.includes('//') ? '#666' : '#00ff00';
        
        this.playgroundOutput.appendChild(line);
        this.playgroundOutput.scrollTop = this.playgroundOutput.scrollHeight;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    DemoApp.init();
});

// Continue with more demo functions...
// This is part 1 of the script.js file 