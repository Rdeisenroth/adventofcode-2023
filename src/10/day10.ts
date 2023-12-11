import { AdventOfCodeDay, Direction, Point, directions, move } from "../util/util";
import {
    checkIntersection,
    colinearPointWithinSegment
} from "line-intersect";
import * as mathjs from "mathjs";
type Pipe = { symbol: string, directions: Direction[] };
export class Day10 extends AdventOfCodeDay {
    day = 10;
    availablePipes = [
        { symbol: "|", directions: [Direction.UP, Direction.DOWN] },
        { symbol: "-", directions: [Direction.LEFT, Direction.RIGHT] },
        { symbol: "L", directions: [Direction.UP, Direction.RIGHT] },
        { symbol: "J", directions: [Direction.UP, Direction.LEFT] },
        { symbol: "7", directions: [Direction.DOWN, Direction.LEFT] },
        { symbol: "F", directions: [Direction.DOWN, Direction.RIGHT] },
        { symbol: ".", directions: [] },
        { symbol: "S", directions: Object.values(Direction) },
    ] as Pipe[];
    grid = [] as Pipe[][];
    toGrid(lines: string[]) {
        return lines.map(line => line.split("").map(c => this.availablePipes.find(p => p.symbol === c)!)).reverse();
    }
    findPos(predicate: (pipe: Pipe) => boolean): Point | null {
        for (let y = 0; y < this.grid.length; y++) {
            const line = this.grid[y];
            for (let x = 0; x < line.length; x++) {
                const pipe = line[x];
                if (predicate(pipe)) {
                    return { x, y };
                }
            }
        }
        return null;
    }
    isValidPoint(p: Point) {
        return p.x >= 0 && p.y >= 0 && p.y < this.grid.length && p.x < this.grid[p.y].length;
    }
    findPossibleMoves(p: Point): Point[] {
        if (!this.isValidPoint(p)) {
            return [];
        }
        let pipe = this.grid[p.y][p.x];
        if (pipe.symbol !== "S") {
            let tmp = pipe.directions.map(d => move(p, d));
            let tmp2 = tmp.filter(p2 => !(p2.x === p.x && p2.y === p.y));
            return tmp2;
        }
        let tmp = directions.map(d => move(p, d.dir));
        console.log("tmpDirs", tmp.map(p => this.findPossibleMoves(p)));
        let tmp2 = tmp.filter(p2 => {
            let possibleMoves = this.findPossibleMoves(p2);
            let bool = possibleMoves.some(p3 => p3.x === p.x && p3.y === p.y);
            return bool;
            // this.findPossibleMoves(p).some(p2 => p2.x === p.x && p2.y === p.y)
        });
        return tmp2;
    }
    part1(input: string): string {
        const lines = this.inputLines;
        this.grid = this.toGrid(lines);
        const start = this.findPos(p => p.symbol === "S");
        if (!start) {
            throw new Error("Start not found");
        }
        let previous = [start];
        let currents = this.findPossibleMoves(start);
        let steps = 0;
        while (!currents.every(p => p.x === currents[0].x && p.y === currents[0].y)) {
            let newCurrent =currents.flatMap(p => this.findPossibleMoves(p)).filter(p => !previous.some(p2 => p2.x === p.x && p2.y === p.y));
            previous = currents;
            currents = newCurrent;
            steps++;
            // if(steps > 1000){
            //     throw new Error("Too many steps");
            // }
        }
        return (steps + 1).toString();
    }
    part2(input: string): string {
        throw new Error("Method not implemented.");
    }
}

new Day10().run();
