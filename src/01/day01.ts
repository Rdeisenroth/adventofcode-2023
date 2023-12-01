import { AdventOfCodeDay } from "../util/util";

export class Day01 extends AdventOfCodeDay {
    day = 1;
    getCalibrationStuff(regex: RegExp, input: string, mapper = (digit: string) => +digit): string {
        return input.split("\n")
            .filter((line) => !!line)
            .reduce((acc, curr) => {
                // digit can be a number or one of the numberStrings
                const digits = [...curr.matchAll(regex)]
                    .map(match => match[1])
                    .map((digit) => mapper(digit));
                const currNum = +`${digits[0]}${digits[digits.length - 1]}`;
                return acc + currNum;
            }, 0).toString();
    }
    part1(input: string): string {
        return this.getCalibrationStuff(/(?=(\d))/g, input);
    }
    part2(input: string): string {
        const numberStrings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        return this.getCalibrationStuff(
            new RegExp(`(?=(\\d|${numberStrings.join("|")}))`, "g"),
            input,
            (digit) => !Number.isNaN(+digit) ? +digit : numberStrings.indexOf(digit) + 1,
        );
    }
}

new Day01().run();
