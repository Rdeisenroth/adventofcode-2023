import { AdventOfCodeDay } from "../util/util";

// example input
/*
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
 */
export type numberPositions = { value: number, positions: { x: number, y: number }[] }[];
export class Day03 extends AdventOfCodeDay {
    day = 3;
    part1(input: string): string {
        const lines = input.split("\n");
        const numbers: numberPositions = [];
        const symbolRegex = /[^\d\s\\.]/g;
        const numberRegex = /\d+/g;
        const symbolPositions: { x: number, y: number }[] = [];
        for (let y = 0; y < lines.length; y++) {
            const line = lines[y];
            let match: RegExpExecArray | null;
            while ((match = numberRegex.exec(line)) !== null) {
                const value = parseInt(match[0]);
                numbers.push({ value, positions: Array.from({ length: `${value}`.length }, (_, i) => ({ x: match!.index + i, y })) });
            }
            let symbolMatch: RegExpExecArray | null;
            while ((symbolMatch = symbolRegex.exec(line)) !== null) {
                symbolPositions.push({ x: symbolMatch.index, y });
            }
        }
        const chosenNumbers = symbolPositions.flatMap(({ x, y }) => {
            // find numbers that have distance less than 2 (also diagonal)
            const foundNumbers = numbers.filter(({ positions }) => positions.some(p => Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2)) < 2));
            return foundNumbers;
        });
        // filter out duplicates with same positions[0]
        const chosenNumbersSet = [...new Set(chosenNumbers.map(({ positions }) => positions[0]))
            .values()].map(p => chosenNumbers.find(({ positions }) => positions[0] === p)!);
        console.log("numbers", JSON.stringify(numbers, null, 2));

        return chosenNumbersSet.reduce((acc, { value }) => acc + value, 0).toString();
    }
    part2(input: string): string {
        const lines = input.split("\n");
        const numbers: numberPositions = [];
        const gearRegex = /\*/g;
        const numberRegex = /\d+/g;
        const gearPositions: { x: number, y: number }[] = [];
        for (let y = 0; y < lines.length; y++) {
            const line = lines[y];
            let match: RegExpExecArray | null;
            while ((match = numberRegex.exec(line)) !== null) {
                const value = parseInt(match[0]);
                numbers.push({ value, positions: Array.from({ length: `${value}`.length }, (_, i) => ({ x: match!.index + i, y })) });
            }
            let symbolMatch: RegExpExecArray | null;
            while ((symbolMatch = gearRegex.exec(line)) !== null) {
                gearPositions.push({ x: symbolMatch.index, y });
            }
        }
        const chosenNumbers = gearPositions.flatMap(({ x, y }) => {
            // find numbers that have distance less than 2 (also diagonal)
            const foundNumbers = numbers.filter(({ positions }) => positions.some(p => Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2)) < 2));
            if (foundNumbers.length !== 2) {
                return [];
            }
            return [foundNumbers[0].value * foundNumbers[1].value];
        });
        // filter out duplicates with same positions[0]

        return chosenNumbers.reduce((acc, value) => acc + value, 0).toString();
        // return "";
    }
}

new Day03().run();
