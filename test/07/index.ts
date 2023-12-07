import { AdventOfCodeDay } from "../../src/util/util";
// disable running the actual code
AdventOfCodeDay.runnable = false;
import { Day07 } from "./../../src/07/day07";
const dayImpl = new Day07();
dayImpl.inputPath = dayImpl.getInputPath(true);

describe(`testing day ${dayImpl.day}`, () => {
    test("test part 1", () => {
        const result = dayImpl.part1(dayImpl.input);
        expect(result).toBe("6440");
    });
    test("test part 2", () => {
        const result = dayImpl.part2(dayImpl.input);
        expect(result).toBe("5905");
    });
});
