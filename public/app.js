function normalizeText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function buildPrompt(input) {
  const goal = normalizeText(input.goal);
  const audience = normalizeText(input.audience) || "a practical business audience";
  const context = normalizeText(input.context) || "No extra context was provided.";

  return [
    `Role: You are an expert assistant for ${audience}.`,
    `Goal: ${goal}`,
    `Context: ${context}`,
    "Tone: clear, direct, and useful",
    "Output format: Return a concise plan with next steps.",
    "Constraints:",
    "1. Avoid vague advice.",
    "2. Use the given context.",
    "Quality checks:",
    "- Is the answer specific enough to act on?",
    "- Are the next steps obvious?"
  ].join("\n");
}

function scorePrompt(prompt) {
  return ["Role:", "Goal:", "Context:", "Output format:", "Constraints:", "Quality checks:"]
    .filter((section) => prompt.includes(section)).length;
}

document.querySelector("#generate").addEventListener("click", () => {
  const prompt = buildPrompt({
    goal: document.querySelector("#goal").value,
    audience: document.querySelector("#audience").value,
    context: document.querySelector("#context").value
  });
  document.querySelector("#result").textContent = prompt;
  document.querySelector("#score").textContent = `Score: ${scorePrompt(prompt)}/6`;
});

document.querySelector("#generate").click();

