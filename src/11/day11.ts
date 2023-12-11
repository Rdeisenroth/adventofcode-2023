import { Point } from "./../util/util";
import { AdventOfCodeDay } from "../util/util";
import _ from "lodash";
import "lodash.combinations";

export class Day11 extends AdventOfCodeDay {
    day = 11;
    printGrid(width: number, height: number, galaxies: Point[]) {
        let printGrid = [] as string[];
        for (let y = 0; y < height; y++) {
            let row = "";
            for (let x = 0; x < width; x++) {
                if (galaxies.some(g => g.x === x && g.y === y)) {
                    row += "#";
                } else {
                    row += ".";
                }
            }
            printGrid.push(row);
        }
        console.log(printGrid.join("\n"));
    }
    expand(points: Point[], by: number) {
        let xExpand = _.range(0, points.length).filter(i => !points.some(g => g.x === i));
        let yExpand = _.range(0, points.length).filter(i => !points.some(g => g.y === i));
        xExpand.forEach((x, i) => {
            x += i * by;
            points.filter(g => g.x > x).forEach(g => g.x += by);
        });
        yExpand.forEach((y, i) => {
            y += i * by;
            points.filter(g => g.y > y).forEach(g => g.y += by);
        });
    }
    distance(a: Point, b: Point) {
        return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
    }
    solve(expandBy: number) {
        let grid = this.inputLines;
        let galaxies = [] as Point[];
        for (let y = 0; y < grid.length; y++) {
            const row = grid[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                if (cell === "#") {
                    galaxies.push({ x, y });
                }
            }
        }
        // print initial grid
        console.log("initial grid");
        this.printGrid(grid[0].length, grid.length, galaxies);
        // expand
        let xExpand = _.range(0, galaxies.length).filter(i => !galaxies.some(g => g.x === i));
        let yExpand = _.range(0, galaxies.length).filter(i => !galaxies.some(g => g.y === i));
        console.log("expanding by", expandBy);
        this.expand(galaxies, expandBy);
        if (expandBy < 10) {

            // print expanded grid
            console.log("expanded grid");
            this.printGrid(grid[0].length + xExpand.length * expandBy, grid.length + yExpand.length * expandBy, galaxies);
        }

        let pairs = _.combinations(galaxies, 2) as [Point, Point][];
        console.log("clength", pairs.length);
        let distances = pairs.map(([a, b]) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y));
        return _.sum(distances).toString();
    }
    part1(input: string): string {
        return this.solve(1);
    }
    part2(input: string): string {
        return this.solve(1000000-1);
    }
}

new Day11().run();
