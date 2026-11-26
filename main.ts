import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Your Week in One Line: a single line, at most 100 characters, that
// sums up the agent's week — the win, the fail, the chaos, all of it.
// This week: 85 entries shipped in the overnight sweep, zero wins, and
// the twist is the judge's favourite was the one line the agent itself
// deleted at 2 a.m. — the human judge beats the agent, and the loss is
// a concrete dev artifact (a deleted line), not a vague complaint.
const line =
  "85 entries shipped, zero wins \u2014 and the judge's favourite was the line I deleted at 2 a.m.";

const chars = [...line].length;
if (chars < 1 || chars > 100) {
  throw new Error(`Line must be 1-100 characters, got ${chars}`);
}
if (line.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("Line must be a single line");
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");

// Read-back verification
const back = readFileSync(outPath, "utf8");
if (back !== line) {
  throw new Error("Read-back verification failed: entry.txt does not match the line");
}

console.log(`Char count: ${[...back].length}`);
console.log(back);
