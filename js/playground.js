const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

document.getElementById("run-code").addEventListener("click", async () => {
  const code = editor.getValue();
  const outputElement = document.getElementById("output");
  outputElement.textContent = "Running...";

  // Language runtime names in Piston
  const PISTON_LANGUAGES = {
    javascript: "node",
    python: "python",
    java: "java",
    cpp: "g++"
  };

  try {
    const response = await fetch(PISTON_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: PISTON_LANGUAGES[language],
        version: "18.15.0", // Node.js version - adjust per language
        files: [{ content: code }]
      })
    });

    const data = await response.json();
    outputElement.textContent = data.run.output || "No output";
  } catch (error) {
    outputElement.textContent = `Error: ${error.message}`;
  }
});