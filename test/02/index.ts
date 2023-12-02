import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day02 } from "./../../src/02/day02";
const dayImpl = new Day02();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("8");
    });
    test("test part 2", () => {
        // dayImpl.inputPath = dayImpl.getInputPath(true, 2);
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("2286");
    });
});
