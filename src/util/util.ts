import * as fs from "fs";

export const year = 2023;
export abstract class AdventOfCodeDay {
    abstract day: number;
    private _inputPath?: string;
    public static runnable = true;
    get inputPath(): string {
        return this._inputPath ?? `./data/day${`${this.day}`.padStart(2, "0")}.txt`;
    }
    set inputPath(path: string) {
        this._inputPath = path;
    }

    getInputPath(test = false, part = 1): string {
        return `./data${test ? "_test" : ""}/day${`${this.day}`.padStart(2, "0")}${part > 1 ? `_${part}` : ""}.txt`;
    }

    get input(): string {
        return fs.readFileSync(this.inputPath, "utf-8");
    }
    get inputLines(): string[] {
        return this.input.split(/\n/).filter(line => !!line);
    }

    abstract part1(input: string): string;
    abstract part2(input: string): string;
    run() {
        if (!AdventOfCodeDay.runnable) {
            return;
        }
        console.log(`----Day ${this.day} part 1---- \n${this.part1(this.input)}`);
        console.log(`----Day ${this.day} part 2---- \n${this.part2(this.input)}`);
    }
    testRun() {
        this.inputPath = `data_test/day${this.day}.txt`;
        this.run();
    }
}

export enum Direction {
    UP = "U",
    DOWN = "D",
    LEFT = "L",
    RIGHT = "R"
}

export enum Direction8 {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    UP_LEFT,
    UP_RIGHT,
    DOWN_LEFT,
    DOWN_RIGHT
}
export interface directionVector {
    x: number;
    y: number;
    dir: Direction;
}

export interface directionVector8 {
    x: number;
    y: number;
    dir: Direction8;
}

export const directions: directionVector[] = [
    { x: 0, y: 1, dir: Direction.UP },
    { x: 0, y: -1, dir: Direction.DOWN },
    { x: -1, y: 0, dir: Direction.LEFT },
    { x: 1, y: 0, dir: Direction.RIGHT },
];

export const directions8: directionVector8[] = [
    { x: 0, y: 1, dir: Direction8.UP },
    { x: 0, y: -1, dir: Direction8.DOWN },
    { x: -1, y: 0, dir: Direction8.LEFT },
    { x: 1, y: 0, dir: Direction8.RIGHT },
    { x: -1, y: 1, dir: Direction8.UP_LEFT },
    { x: 1, y: 1, dir: Direction8.UP_RIGHT },
    { x: -1, y: -1, dir: Direction8.DOWN_LEFT },
    { x: 1, y: -1, dir: Direction8.DOWN_RIGHT },
];

export type Point = { x: number, y: number };

export function move(p: Point, dir: Direction): Point {
    const d = directions.find(d => d.dir === dir)!;
    return { x: p.x + d.x, y: p.y + d.y };
}

export function move8(p: Point, dir: Direction8): Point {
    const d = directions8.find(d => d.dir === dir)!;
    return { x: p.x + d.x, y: p.y + d.y };
}


/**
 * Returns an array of numbers from l to u
 * @param l lower bound, inclusive
 * @param u upper bound, exclusive
 * @returns array of numbers from l to u
 */
export const range = (l = 0, u: number) => [...Array(u - l).keys()].map(x => x + l);

export function getDirectionFromLetter(letter: string): Direction {
    const dir = directions.find(d => d.dir === letter)?.dir;
    if (dir === undefined) {
        throw new Error(`Unknown direction ${letter}`);
    }
    return dir;
}

export function getDirectionVectorFromLetter(letter: string): directionVector {
    const dir = directions.find(d => d.dir === letter);
    if (dir === undefined) {
        throw new Error(`Unknown direction ${letter}`);
    }
    return dir;
}
