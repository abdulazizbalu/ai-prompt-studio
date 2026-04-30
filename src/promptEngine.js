const DEFAULT_FORMAT = "Return a concise answer with clear next steps.";

function normalizeText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function buildPrompt(input = {}) {
  const goal = normalizeText(input.goal);
  if (!goal) {
    throw new Error("A goal is required to build a prompt.");
  }

  const audience = normalizeText(input.audience) || "a practical business audience";
  const context = normalizeText(input.context) || "No extra context was provided.";
  const tone = normalizeText(input.tone) || "clear, direct, and useful";
  const format = normalizeText(input.format) || DEFAULT_FORMAT;
  const constraints = Array.isArray(input.constraints)
    ? input.constraints.map(normalizeText).filter(Boolean)
    : [];

  const constraintBlock = constraints.length
    ? constraints.map((item, index) => `${index + 1}. ${item}`).join("\n")
    : "1. Avoid vague advice.\n2. State assumptions when context is missing.";

  return [
    `Role: You are an expert assistant for ${audience}.`,
    `Goal: ${goal}`,
    `Context: ${context}`,
    `Tone: ${tone}`,
    `Output format: ${format}`,
    "Constraints:",
    constraintBlock,
    "Quality checks:",
    "- Is the answer specific enough to act on?",
    "- Does it use the provided context?",
    "- Are the next steps obvious?"
  ].join("\n");
}

function scorePrompt(prompt) {
  const text = normalizeText(prompt).toLowerCase();
  const checks = [
    /role:/.test(text),
    /goal:/.test(text),
    /context:/.test(text),
    /output format:/.test(text),
    /constraints:/.test(text),
    /quality checks:/.test(text)
  ];

  const score = checks.filter(Boolean).length;
  return {
    score,
    maxScore: checks.length,
    label: score >= 5 ? "production-ready" : score >= 3 ? "usable" : "weak"
  };
}

module.exports = { buildPrompt, scorePrompt };

