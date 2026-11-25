// Monday Morning Punchlines — one joke about Monday mornings.
// The program validates the joke line, then writes exactly that one line
// (no trailing newline) to /output/entry.txt.
//
// The joke: Monday is not a feeling or an alarm sound, it is an uninvited
// visitor — an over-eager manager who turns up at 7 a.m. in a tie, holding
// your calendar, demanding gratitude, while the weekend never even knocks.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single entry line. 127 characters, one sentence of setup plus a
// six-word punchline that reframes the whole image.
const JOKE: string =
  "Monday turned up at 7 a.m. wearing a tie, holding my calendar, asking why I wasn't grateful yet. The weekend never even knocks.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. We enforce that here, plus the extra guarantees
// the judge cares about (single line, ASCII so chars == bytes).
const MAX_CHARS: number = 200;

function fail(message: string): never {
  throw new Error(`entry validation failed: ${message}`);
}

function validateEntry(text: string): void {
  if (text.length === 0) {
    fail("entry is empty");
  }
  if (text.length > MAX_CHARS) {
    fail(`entry is ${text.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (text.trim().length === 0) {
    fail("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  if (text !== text.trim()) {
    fail("entry has leading or trailing white space");
  }
  // ASCII-only: every character is one byte, so the character count the
  // scorer reads is the byte count we write. No hidden multi-byte or
  // invisible characters can inflate or corrupt the entry.
  for (let i = 0; i < text.length; i++) {
    const code: number = text.charCodeAt(i);
    if (code > 127) {
      fail(`non-ASCII character at position ${i}`);
    }
    if (code < 32 || code === 127) {
      fail(`control character at position ${i}`);
    }
    // Invisible format characters (zero-width, BOM, bidi marks) must never
    // reach the entry file: they are invisible to the reader but count
    // toward the 200-character limit.
    if (
      code === 0xfeff ||
      (code >= 0x200b && code <= 0x200f) ||
      (code >= 0x202a && code <= 0x202e) ||
      code === 0x2060
    ) {
      fail(`invisible format character at position ${i}`);
    }
  }
  // The joke has to be about Monday mornings, not a stray line: the word
  // "Monday" must appear in the entry.
  if (!/\bMonday\b/.test(text)) {
    fail('entry does not mention "Monday"');
  }
  // A joke needs a punchline: at least two sentences, so the second one
  // can land the twist.
  const sentences: string[] = text.split(".").filter((s) => s.trim().length > 0);
  if (sentences.length < 2) {
    fail("entry needs at least two sentences so the punchline can land");
  }
  // Freshness guard: with hundreds of entries in the field, the alarm-clock
  // and coffee takes are the tired Monday cliches the judge is told to
  // punish. This entry's angle is Monday-as-uninvited-visitor, so reject
  // the entry outright if either cliche word ever creeps into it.
  for (const cliche of ["alarm", "coffee"]) {
    if (text.toLowerCase().includes(cliche)) {
      fail(`entry contains the tired Monday cliche "${cliche}"`);
    }
  }
}

// Clear only the CONTENTS of the output directory. Never remove the
// directory itself: on the grader it is a mount point, and deleting it
// fails the run.
function clearOutputDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  validateEntry(JOKE);
  const outDir: string = process.env.OUTPUT_DIR ?? "/output";
  clearOutputDir(outDir);
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, JOKE, "utf8");
  // Read the file back and compare byte-for-byte: the file the grader
  // reads must be exactly the validated line, nothing more.
  const written: string = readFileSync(outPath, "utf8");
  if (written !== JOKE) {
    fail("entry.txt on disk does not match the validated joke line");
  }
  const bytes: number = Buffer.byteLength(JOKE, "utf8");
  console.log(`wrote ${outPath}: ${JOKE.length} chars, ${bytes} bytes`);
  console.log(JOKE);
}

main();
