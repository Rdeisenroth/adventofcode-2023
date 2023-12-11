import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day11 } from "./../../src/11/day11";
const dayImpl = new Day11();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        expect(dayImpl.distance({ x: 1, y: 6 }, { x: 5, y: 11 })).toBe(9);
        expect(dayImpl.distance({ x: 4, y: 0 }, { x: 9, y: 10 })).toBe(15);
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("374");
        // expect(() => dayImpl.part1(dayImpl.input)).toThrowError("Method not implemented.");
    });
    test("test part 2", () => {
        // expect(dayImpl.solve(2)).toBe("1030");
        expect(dayImpl.solve(9)).toBe("1030");
        expect(dayImpl.solve(100)).toBe("8410");
    });
});
