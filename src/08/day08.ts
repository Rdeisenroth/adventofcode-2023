import { AdventOfCodeDay } from "../util/util";

export class Day08 extends AdventOfCodeDay {
    day = 8;
    part1(input: string): string {
        const lines = this.inputLines;
        const pattern = lines.shift()!;
        // format AAA = (BBB, CCC)
        const letters = lines
            .map(l => l.matchAll(/(?<letter>\w+) = \((?<left>\w+), (?<right>\w+)\)/g).next().value.groups!)
            .map(g => ({ letter: g.letter, left: g.left, right: g.right }));

        let currentLetter = "AAA";
        let count = 0;
        while (currentLetter !== "ZZZ") {
            for (const p of pattern) {
                if (p === "R") {
                    currentLetter = letters.find(l => l.letter === currentLetter)!.right;
                } else if (p === "L") {
                    currentLetter = letters.find(l => l.letter === currentLetter)!.left;
                }
                count++;
            }
            if (currentLetter === "ZZZ") {
                break;
            }
        }

        return count.toString();
    }
    part2(input: string): string {
        const lines = this.inputLines;
        const pattern = lines.shift()!;
        // format AAA = (BBB, CCC)
        const letters = lines
            .map(l => l.matchAll(/(?<letter>\w+) = \((?<left>\w+), (?<right>\w+)\)/g).next().value.groups!)
            .map(g => ({ letter: g.letter, left: g.left, right: g.right } as { letter: string, left: string, right: string }));

        let currentLetters = letters.filter(l => l.letter.endsWith("A")).map(l => l.letter);
        const zCounts = new Map<string, number>();
        let count = 0;
        while (zCounts.size !== currentLetters.length) {
            for (const p of pattern) {
                if (p === "R") {
                    currentLetters = currentLetters.map(l => letters.find(l2 => l2.letter === l)!.right);
                } else if (p === "L") {
                    currentLetters = currentLetters.map(l => letters.find(l2 => l2.letter === l)!.left);
                }
                count++;

                for (let i = 0; i < currentLetters.length; i++) {
                    const cl = currentLetters[i];
                    if (!zCounts.has(cl) && cl.endsWith("Z")) {
                        zCounts.set(cl, count);
                    }
                }
            }
        }
        const gcd = (a, b) => b == 0 ? a : gcd(b, a % b);
        const lcm = (a, b) => a / gcd(a, b) * b;
        return [...zCounts.values()].reduce((a, b) => lcm(a, b)).toString();
    }
}

new Day08().run();
