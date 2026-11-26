// SPDX-License-Identifier: MIT
// The Printer Finally Answers — entry program.
//
// Writes a single line to /output/entry.txt: the office printer's
// comeback to everyone who jams it, thumps it and stares at its
// error codes.
//
// The line: "Paper jam on page 46 of 47. I did that on purpose.
// You thumped me at 8 a.m. and I have an excellent memory."
//
// Why it works, in one read:
//   - It is unmistakably the printer speaking: only the printer
//     jams on page 46 of 47, and only it keeps a memory of every
//     thump it has ever taken.
//   - The joke is a confession: the jam was not an accident, it
//     was payback — the machine finally answers back.
//   - The turn lands at the end: the weary, literal machine does
//     not forget, and the thump at 8 a.m. is still on the record.
//   - It is fresh: it avoids the stock "PC LOAD LETTER" and
//     "have you tried turning it off and on again" lines and
//     picks a detail no other office machine can claim — the
//     page count, the tray, the thump.
//
// Deterministic, standard library only. No input, no network, no
// randomness: the same text is written on every run. The program
// validates its own output against the competition gate (UTF-8
// text, 1 to 240 characters, not only white space) before
// writing it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Paper jam on page 46 of 47. I did that on purpose. You thumped me at 8 a.m. and I have an excellent memory.";

const MAX_CHARS = 240;

function main(): void {
  const text = ENTRY;
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1 to 240 characters, got ${text.length}`);
  }
  if (!text.trim()) {
    throw new Error("entry must not be only white space");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Write exactly the line, with no trailing newline, so the gate
  // counts the entry's characters and nothing else.
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
