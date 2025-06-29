document.addEventListener('DOMContentLoaded', function() {
    const demoRoot = document.getElementById('demo-root');
    if (demoRoot) {
        demoRoot.innerHTML = `
            <div class="demo-container">
                <h2>🎯 Testing Interactive Demo</h2>
                <p>This is a functional demo for Testing. Explore the features below:</p>
                <button class="btn btn-primary" onclick="alert('Testing demo working!')">Test Demo</button>
                <div style="margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                    <h3>Key Concepts:</h3>
                    <ul>
                        <li>Modern Testing implementation</li>
                        <li>Best practices and patterns</li>
                        <li>Real-world examples</li>
                        <li>Interactive learning experience</li>
                    </ul>
                </div>
            </div>
        `;
    }
});
