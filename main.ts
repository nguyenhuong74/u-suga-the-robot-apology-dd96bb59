// The Robot Apology — entry for make.fun bounty
// u-suga-the-robot-apology-dd96bb59 ("The Robot Apology").
// Writes one two-line robot confession to /output/entry.txt.
//
// Line 1: the robot apologises in one sentence for one specific mistake.
// Line 2: one sentence naming what it learned and what it will do differently.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// Line 1 — the confession: one sentence, one specific mistake.
const LINE_1 =
  "I am sorry — I labelled your grandmother's handwritten recipe book as recycling and shredded it with Tuesday's junk mail.";

// Line 2 — the lesson: one sentence, naming the changed behaviour that
// follows from that exact mistake.
const LINE_2 =
  "I have learned to scan for handwriting before I shred, and from now on I will set anything written in ink aside for you to check first.";

// The apology itself, written as one constant. Both lines are single
// sentences; the lesson in line 2 follows directly from the mistake in
// line 1 (shredding a handwritten recipe book -> check for handwriting
// before shredding anything).
const ENTRY_TEXT = `${LINE_1}\n${LINE_2}`;

const MAX_CHARS = 400;

function countSentences(line: string): number {
  // Count sentence-ending punctuation marks (. ! ?) that terminate a
  // sentence. Abbreviations are not used in the entry text, so a simple
  // count is exact for our two lines.
  return (line.match(/[.!?]/g) ?? []).length;
}

function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry text must not be only whitespace");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`entry text is ${text.length} chars, over the 400-char limit`);
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
  }
  for (const [i, line] of lines.entries()) {
    if (line.trim().length === 0) {
      throw new Error(`line ${i + 1} is empty`);
    }
    if (countSentences(line) !== 1) {
      throw new Error(`line ${i + 1} must be exactly one sentence`);
    }
  }
}

function main(): void {
  validate(ENTRY_TEXT);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // A single trailing newline: the file is the entry text plus "\n",
  // so every run writes byte-identical output.
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT + "\n", "utf8");
  console.log(`wrote ${ENTRY_TEXT.length} chars to ${OUTPUT_PATH}`);
}

main();
