const test = require("node:test");
const assert = require("node:assert/strict");
const { buildPrompt, scorePrompt } = require("../src/promptEngine");

test("buildPrompt creates a structured prompt", () => {
  const prompt = buildPrompt({
    goal: "Plan a launch campaign for an AI course",
    audience: "creators and small business owners",
    context: "The course teaches practical AI workflows.",
    tone: "confident",
    constraints: ["Use simple language", "Include weekly deliverables"]
  });

  assert.match(prompt, /Role:/);
  assert.match(prompt, /Goal: Plan a launch campaign/);
  assert.match(prompt, /Quality checks:/);
  assert.equal(scorePrompt(prompt).label, "production-ready");
});

test("buildPrompt rejects empty goals", () => {
  assert.throws(() => buildPrompt({ goal: "" }), /goal is required/i);
});

