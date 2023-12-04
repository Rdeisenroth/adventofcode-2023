import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day04 } from "./../../src/04/day04";
const dayImpl = new Day04();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("13");
    });
    test("test part 2", () => {
        // dayImpl.inputPath = dayImpl.getInputPath(true, 2);
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("30");
        // expect(() => dayImpl.part2(dayImpl.input)).toThrowError("Method not implemented.");
    });
});
