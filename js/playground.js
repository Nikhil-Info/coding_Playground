// Get language from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const language = urlParams.get('lang') || 'javascript';

// Set up the editor
const editor = CodeMirror(document.getElementById("editor"), {
    lineNumbers: true,
    mode: language,
    theme: "default",
    indentUnit: 4,
    tabSize: 4,
    value: getDefaultCode(language)
});

// Set language title
document.getElementById("language-title").textContent = 
    `${language.charAt(0).toUpperCase() + language.slice(1)} Playground`;

// Run button functionality
document.getElementById("run-code").addEventListener("click", function() {
    const code = editor.getValue();
    const outputElement = document.getElementById("output");
    
    try {
        // Clear previous output
        outputElement.textContent = '';
        
        // For JavaScript, we can eval directly
        if (language === 'javascript') {
            let consoleOutput = [];
            const originalConsoleLog = console.log;
            console.log = function() {
                const args = Array.from(arguments).join(' ');
                consoleOutput.push(args);
                outputElement.textContent += args + '\n';
                originalConsoleLog.apply(console, arguments);
            };
            
            eval(code);
            console.log = originalConsoleLog;
        } else {
            // For other languages, we would normally use an API
            outputElement.textContent = `This would execute ${language} code via API in a real app.\n\nYour code:\n${code}`;
        }
    } catch (error) {
        outputElement.textContent = `Error: ${error.message}`;
    }
});

// Save button functionality
document.getElementById("save-code").addEventListener("click", function() {
    alert("In a real app, this would save your code to your account.");
});

// Get default code for each language
function getDefaultCode(lang) {
    const defaults = {
        'javascript': `// JavaScript Playground\n// Try some code:\n\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));`,
        'python': `# Python Playground\n# Try some code:\n\ndef greet(name):\n    return "Hello, " + name + "!"\n\nprint(greet("World"))`,
        'java': `// Java Playground\n// Try some code:\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
        'cpp': `// C++ Playground\n// Try some code:\n\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}`
    };
    return defaults[lang] || defaults['javascript'];
}