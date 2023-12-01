import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { DayXX } from "./../../src/template/dayXX";
const dayImpl = new DayXX();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        // const result = dayImpl.part1(dayImpl.input);
        // expect(result).toBe("1");
        expect(() => dayImpl.part1(dayImpl.input)).toThrowError("Method not implemented.");
    });
    test("test part 2", () => {
        dayImpl.inputPath = dayImpl.getInputPath(true, 2);
        // const result = dayImpl.part2(dayImpl.input);
        // expect(result).toBe("1");
        expect(() => dayImpl.part2(dayImpl.input)).toThrowError("Method not implemented.");
    });
});
