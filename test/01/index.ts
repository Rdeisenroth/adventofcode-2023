import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day01 } from "./../../src/01/day01";
const dayImpl = new Day01();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("142");
    });
    test("test part 2", () => {
        dayImpl.inputPath = dayImpl.getInputPath(true, 2);
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe(`${281+83}`);
        // expect(() => dayImpl.part2(dayImpl.input)).toThrowError("Method not implemented.");
    });
});
