import { AdventOfCodeDay, Direction, Point, directions, move } from "../util/util";


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
        const pipe = this.grid[p.y][p.x];
        if (pipe.symbol !== "S") {
            const tmp = pipe.directions.map(d => move(p, d));
            const tmp2 = tmp.filter(p2 => !(p2.x === p.x && p2.y === p.y));
            return tmp2;
        }
        const tmp = directions.map(d => move(p, d.dir));
        console.log("tmpDirs", tmp.map(p => this.findPossibleMoves(p)));
        const tmp2 = tmp.filter(p2 => {
            const possibleMoves = this.findPossibleMoves(p2);
            const bool = possibleMoves.some(p3 => p3.x === p.x && p3.y === p.y);
            return bool;
            // this.findPossibleMoves(p).some(p2 => p2.x === p.x && p2.y === p.y)
        });
        return tmp2;
    }
    getInsidePoints() {
        const lines = this.inputLines;
        this.grid = this.toGrid(lines);
        const start = this.findPos(p => p.symbol === "S");
        if (!start) {
            throw new Error("Start not found");
        }
        let previous = [start];
        let currents = this.findPossibleMoves(start);
        const path = [] as Point[];
        path.push(start);
        path.push(...currents);
        while (!currents.every(p => p.x === currents[0].x && p.y === currents[0].y)) {
            const newCurrent = currents.flatMap(p => this.findPossibleMoves(p)).filter(p => !previous.some(p2 => p2.x === p.x && p2.y === p.y));
            previous = currents;
            currents = newCurrent;
            path.push(...currents);
            // if(steps > 1000){
            //     throw new Error("Too many steps");
            // }
        }
        const inside = [] as Point[];
        const height = this.grid.length;
        const width = this.grid[0].length;
        for (let y = 0; y < this.grid.length; y++) {
            const line = this.grid[y];
            const lastPipeX = -1;
            const lastPipe = null as Pipe | null;
            const exitDir = null as Direction | null;
            const pipeCount = 0;
            for (let x = 0; x < line.length; x++) {
                const pipe = line[x];
                if (path.some(p => p.x === x && p.y === y)) {
                    continue;
                }

                let crosses = 0;
                let currentX = x;
                let currentY = y;

                // Count crosses in diagonal direction
                while (currentX < width && currentY < height) {
                    // const currentSymbol = this.grid[currentY][currentX].symbol;
                    // if (path.some(p => p.x === currentX && p.y === currentY) && currentSymbol !== "F" && currentSymbol !== "J") {
                    const possibleDirs = this.findPossibleMoves({ x: currentX, y: currentY }).map(p => directions.find(d => d.x === p.x - currentX && d.y === p.y - currentY)!.dir);
                    if (path.some(p => p.x === currentX && p.y === currentY)
                        && !(
                            (possibleDirs.includes(Direction.DOWN) && possibleDirs.includes(Direction.RIGHT))
                            || (possibleDirs.includes(Direction.UP) && possibleDirs.includes(Direction.LEFT))
                        )) {
                        crosses++;
                    }
                    currentX++;
                    currentY++;
                }

                // Check if inside an area with odd crosses
                if (crosses % 2 === 1) {
                    inside.push({ x, y });
                }




                // check if part of path
                // if (path.some(p => p.x === x && p.y === y)) {
                //     // check if connected to last pipe
                //     if (lastPipe && this.findPossibleMoves({ x, y }).some(p => p.x === lastPipeX && p.y === y)) {
                //         // do not increment pipeCount
                //         lastPipeX = x;
                //         lastPipe = pipe;
                //         if (exitDir && pipe.directions.includes(exitDir)) {
                //             pipeCount--;
                //         }
                //         continue;
                //     }
                //     // increment pipeCount
                //     pipeCount++;
                //     lastPipeX = x;
                //     lastPipe = pipe;
                //     let tmp = this.findPossibleMoves({ x, y }).map(p => directions.find(d => d.x === p.x - x && d.y === p.y - y)!.dir).filter(d => d === Direction.UP || d === Direction.DOWN);
                //     exitDir = tmp.length > 0 ? tmp[0] : null;
                // } else {
                //     // check if inside
                //     if (pipeCount % 2 === 1) {
                //         inside.push({ x, y });
                //     }
                // }
            }
        }
        return inside;
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
            const newCurrent = currents.flatMap(p => this.findPossibleMoves(p)).filter(p => !previous.some(p2 => p2.x === p.x && p2.y === p.y));
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
        const inside = this.getInsidePoints();
        return inside.length.toString();
    }
}

new Day10().run();
