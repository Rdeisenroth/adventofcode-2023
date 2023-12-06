import _ from "lodash";
import { AdventOfCodeDay } from "../util/util";

export class Day06 extends AdventOfCodeDay {
    day = 6;
    part1(input: string): string {
        const [times, distances] = this.inputLines.map(line => line.split(":")[1].trim().split(/\s+/).map(Number));
        return _.reduce(distances.map((distance, i) => _.range(times[i]).filter(x => x * (times[i] - x) > distance).length), _.multiply)!.toString();
    }
    part2(input: string): string {
        const [time, distance] = input.replace(/\s+/g, "").match(/\d+/g)!.map(Number);
        return _.range(time).filter(x => x * (time - x) > distance).length.toString();
    }
}

new Day06().run();
