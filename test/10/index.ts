import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day10 } from "./../../src/10/day10";
const dayImpl = new Day10();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("4");
        // expect(() => dayImpl.part1(dayImpl.input)).toThrowError("Method not implemented.");
    });
    test("test part 1_2", () => {
        dayImpl.inputPath = dayImpl.getInputPath(true, 2);
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("8");
        // expect(() => dayImpl.part1(dayImpl.input)).toThrowError("Method not implemented.");
    });
    test("test part 2", () => {
        dayImpl.inputPath = dayImpl.getInputPath(true, 2);
        // const result = dayImpl.part2(dayImpl.input);
        // expect(result).toBe("1");
        expect(() => dayImpl.part2(dayImpl.input)).toThrowError("Method not implemented.");
    });
});
