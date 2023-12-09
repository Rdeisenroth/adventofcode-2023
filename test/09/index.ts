import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day09 } from "./../../src/09/day09";
const dayImpl = new Day09();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("114");
        // expect(() => dayImpl.part1(dayImpl.input)).toThrowError("Method not implemented.");
    });
    test("test part 1 helpers", () => {
        expect(dayImpl.calculateNext([10, 13, 16, 21, 30, 45])).toBe(68);
        expect(dayImpl.calculateNext([20, 10, 0, -10])).toBe(-20);
    });
    test("test part 2 helpers", () => {
        expect(dayImpl.calculatePrev([10, 13, 16, 21, 30, 45])).toBe(5);
    });
    test("test part 2", () => {
        dayImpl.inputPath = dayImpl.getInputPath(true, 2);
        // const result = dayImpl.part2(dayImpl.input);
        // expect(result).toBe("1");
        expect(() => dayImpl.part2(dayImpl.input)).toThrowError("Method not implemented.");
    });
});
