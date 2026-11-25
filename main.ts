// The Best Advice I Ever Got — entry program.
// Writes one sentence (max 200 characters) to /output/entry.txt.
// Node 22 stdlib only, no network, fully deterministic.
//
// Entry: "When I wanted to quit, my grandfather said the measure of a
// person isn't how hard they fall but whether they get up one more time
// than they fall, so I got up." (158 characters, one sentence.)
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// One sentence, advice actually given, recalled in a real voice.
const ENTRY =
  "When I wanted to quit, my grandfather said the measure of a person isn't how hard they fall but whether they get up one more time than they fall, so I got up.";

// The entry must be exactly one sentence: a single trailing full stop,
// no other sentence-ending punctuation, and no stray whitespace.
function assertOneSentence(text: string): void {
  const trimmed = text.trim();
  if (trimmed !== text) throw new Error("entry has leading/trailing whitespace");
  if (!trimmed.endsWith(".")) throw new Error("entry must end with a full stop");
  const inner = trimmed.slice(0, -1);
  if (/[.!?]/.test(inner)) throw new Error("entry must be a single sentence");
  if (/\s{2,}/.test(trimmed)) throw new Error("entry has double whitespace");
}

function main(): void {
  assertOneSentence(ENTRY);
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
  }
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, ENTRY, "utf8");
}

main();
