import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day03 } from "./../../src/03/day03";
const dayImpl = new Day03();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("4361");
        // expect(() => dayImpl.part1(dayImpl.input)).toThrowError("Method not implemented.");
    });
    test("test part 2", () => {
        // dayImpl.inputPath = dayImpl.getInputPath(true, 2);
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("467835");
    });
});
