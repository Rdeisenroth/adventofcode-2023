import { AdventOfCodeDay } from "../util/util";

export class Day09 extends AdventOfCodeDay {
    day = 9;
    calculateNext(numbers: number[]) {
        if (numbers.every(n => n === 0)) {
            return 0;
        }
        const newNumbers = [] as number[];
        let tmp = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            const current = numbers[i];
            newNumbers.push(current - tmp);
            tmp = current;
        }
        return numbers[numbers.length - 1] + this.calculateNext(newNumbers);
    }
    calculatePrev(numbers: number[]) {
        if (numbers.every(n => n === 0)) {
            return 0;
        }
        const newNumbers = [] as number[];
        let tmp = numbers[numbers.length - 1];
        for (let i = numbers.length - 2; i >= 0; i--) {
            const current = numbers[i];
            newNumbers.unshift(tmp - current);
            tmp = current;
        }
        return numbers[0] - this.calculatePrev(newNumbers);
    }
    part1(input: string): string {
        return this.inputLines
            .map(l => l.split(/\s+/).map(n => +n))
            .map(l => this.calculateNext(l))
            .reduce((a, b) => a + b, 0).toString();
    }
    part2(input: string): string {
        return this.inputLines
            .map(l => l.split(/\s+/).map(n => +n))
            .map(l => this.calculatePrev(l))
            .reduce((a, b) => a + b, 0).toString();
    }
}

new Day09().run();
