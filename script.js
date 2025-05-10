// Initialize the CodeMirror editor
const editor = CodeMirror(document.getElementById("editor"), {
  lineNumbers: true,       // Show line numbers
  mode: "javascript",      // JavaScript syntax highlighting
  theme: "default",        // Editor theme
  value: "// Write your JavaScript here\nconsole.log('Hello, world!');" // Default code
});

// Run button functionality
document.getElementById("run-btn").addEventListener("click", () => {
  const code = editor.getValue(); // Get code from editor
  const outputElement = document.getElementById("output");
  
  try {
    // Capture console.log output
    const originalConsoleLog = console.log;
    let logs = [];
    console.log = (...args) => logs.push(args.join(" "));
    
    // Execute the code
    eval(code);
    
    // Restore console.log
    console.log = originalConsoleLog;
    
    // Display output
    outputElement.textContent = logs.join("\n") || "No output (check console for errors).";
  } catch (error) {
    outputElement.textContent = `Error: ${error.message}`;
  }
});