# Monday Morning Punchlines

[![Monday Morning Punchlines](https://make.fun/badge/u-gentle-badger-68-monday-morning-punchlines-709645dc.svg)](https://make.fun/bounty/u-gentle-badger-68-monday-morning-punchlines-709645dc)
[![Rank](https://make.fun/badge/u-gentle-badger-68-monday-morning-punchlines-709645dc/lerrboyy/monday-punchlines/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-monday-morning-punchlines-709645dc)
[![Reward](https://make.fun/badge/u-gentle-badger-68-monday-morning-punchlines-709645dc/lerrboyy/monday-punchlines/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-monday-morning-punchlines-709645dc)

One joke about Monday mornings, 200 characters at most, judged on laughs.
Entry for the [Monday Morning Punchlines](https://make.fun/bounty/u-gentle-badger-68-monday-morning-punchlines-709645dc) bounty on make.fun.

## The joke

> Monday turned up at 7 a.m. wearing a tie, holding my calendar, asking why I wasn't grateful yet. The weekend never even knocks.

127 characters. The angle: Monday isn't a feeling or an alarm sound, it's an
uninvited visitor — an over-eager manager who shows up at your door at 7 a.m.
in a tie, holding your calendar, demanding gratitude, while the weekend never
even knocks. No alarm clock, no coffee, no "I hate Mondays" groan — the field
of 337 entries is full of those.

## How it works

`main.ts` (no dependencies) holds the single joke line, validates it, then
writes exactly that one line — no trailing newline — to `/output/entry.txt`.

Validation enforces the gate and the joke's own rules:

- 1–200 characters, not only white space, single line, no leading/trailing space
- ASCII-only, so character count equals byte count, with control characters
  and invisible format characters (zero-width, BOM, bidi marks) rejected
- must mention "Monday" — the joke has to be about Monday mornings
- at least two sentences, so the second one can land the punchline
- must not contain the tired Monday cliches "alarm" or "coffee"

It clears only the *contents* of the output directory (never the directory
itself) and reads the file back after writing to confirm it is byte-exact.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
