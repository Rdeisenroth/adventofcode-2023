import _ from "lodash";
import { AdventOfCodeDay } from "../util/util";

// const dictKeys = ["seed", "soil", "fertilizer", "water", "light", "temperature", "humidity", "location"];
type Dict = { from: string, to: string, mappings: { ds: number, ss: number, size: number, lastProcessed?: number }[] };

export class Day05 extends AdventOfCodeDay {
    day = 5;
    mapDict(input: number, dict: Dict): number {
        const mapping = dict.mappings.find(m => m.ss <= input && input < (m.ss + m.size));
        if (!mapping) {
            return input;
        }
        const shiftBy = mapping.ds - mapping.ss;
        return input + shiftBy;
    }
    mapDictRange(input: { start: number, size: number }, dict: Dict): { start: number, size: number }[] {
        const mappings = dict.mappings.filter(m => this.rangesOverlap(input, { start: m.ss, size: m.size }));
        if (!mappings.length) {
            return [input];
        }
        let result = [] as { start: number, size: number, originalStart: number }[];
        for (const mapping of mappings) {
            // before
            const overlapStart = Math.max(mapping.ss, input.start);
            const overlapEnd = Math.min(input.start + input.size - 1, mapping.ss + mapping.size - 1);
            const lower = { start: input.start, size: mapping.ss - input.start, originalStart: input.start };
            const lowerConflctMappings = dict.mappings.filter(m => m != mapping && this.rangesOverlap({ start: m.ss, size: m.size }, lower));
            if (lower.size > 0 && lowerConflctMappings.length) {
                lower.start = Math.max(...lowerConflctMappings.map(m => Math.max(m.ss + m.size, overlapStart)));
                lower.originalStart = lower.start;
                const lowerEnd = overlapStart - 1;
                lower.size = lowerEnd - lower.start + 1;
            }
            result.push(lower);
            // overlap
            const overlapShift = mapping.ds - mapping.ss;
            result.push({ start: overlapStart + overlapShift, size: overlapEnd - overlapStart + 1, originalStart: overlapStart });
            // after
            const upper = { start: overlapEnd + 1, size: (input.start + input.size) - (overlapEnd + 1), originalStart: overlapEnd + 1 };
            const upperConflctMappings = dict.mappings.filter(m => m != mapping && this.rangesOverlap({ start: m.ss, size: m.size }, upper));
            if (upper.size > 0 && upperConflctMappings.length) {
                upper.start = overlapEnd + 1;
                upper.originalStart = upper.start;
                const upperEnd = Math.min(...upperConflctMappings.map(m => m.ss - 1));
                upper.size = upperEnd - upper.start + 1;
            }
            result.push(upper);
        }
        result = result.filter(r => r.size > 0);
        // verify against mapDict
        for (const r of result) {
            const mr = this.mapDict(r.originalStart, dict);
            if (mr !== r.start) {
                throw new Error("mapDictRange failed");
            }
        }
        return result.map(r => ({ start: r.start, size: r.size }));
    }
    isInRange(n: number, range: { start: number, size: number }): boolean {
        return range.start <= n && n < (range.start + range.size);
    }
    rangesOverlap(range1: { start: number, size: number }, range2: { start: number, size: number }): boolean {
        return this.isInRange(range1.start, range2) || this.isInRange(range2.start, range1);
    }
    part1(input: string): string {
        const lines = input.split("\n").filter(l => !!l);
        const seeds = lines.shift()!.split(":")[1].trim().split(/\s+/).map(s => +s.trim());

        console.log("seeds", seeds);
        const dicts = [] as Dict[];
        while (lines.length) {
            const line = lines.shift()!.trim();
            // new dict line format: <from>-to-<to> map:
            const match = line.match(/(?<from>[a-z]+)-to-(?<to>[a-z]+)\s+map:/);
            let dict = {} as Dict;
            if (match) {
                dict = { from: match.groups!.from, to: match.groups!.to, mappings: [] };
                dicts.push(dict);
            } else {
                dict = dicts[dicts.length - 1];
            }
            if (!dict) {
                throw new Error("dict not found");
            }
            // add mappings
            const [ds, ss, size] = line.split(/\s+/).map(s => +s.trim());
            dict.mappings.push({ ds, ss, size });
        }

        const locations = seeds
            .map(s => {
                // map with each dict to get to location
                let current = s;
                for (const dict of dicts) {
                    current = this.mapDict(current, dict);
                }
                return current;
            });

        // console.log("locations", locations);

        return _.min(locations)!.toString();
    }
    part2(input: string): string {
        const lines = input.split("\n").filter(l => !!l);
        const seedRangesStr = lines.shift()!.split(":")[1].trim().split(/\s+/).map(s => +s.trim());
        const seedRanges = [] as { start: number, size: number }[];

        const dicts = [] as Dict[];
        while (lines.length) {
            const line = lines.shift()!.trim();
            // new dict line format: <from>-to-<to> map:
            const match = line.match(/(?<from>[a-z]+)-to-(?<to>[a-z]+)\s+map:/);
            let dict = {} as Dict;
            if (match) {
                dict = { from: match.groups!.from, to: match.groups!.to, mappings: [] };
                dicts.push(dict);
                continue;
            } else {
                dict = dicts[dicts.length - 1];
            }
            if (!dict) {
                throw new Error("dict not found");
            }
            // add mappings
            const [ds, ss, size] = line.split(/\s+/).map(s => +s.trim());
            dict.mappings.push({ ds, ss, size });
        }

        for (let i = 0; i < seedRangesStr.length; i += 2) {
            seedRanges.push({ start: seedRangesStr[i], size: seedRangesStr[i + 1] });
        }



        const rangeCandidates = seedRanges
            .flatMap(s => {
                // map with each dict to get to location
                let candidates = [s];
                for (const dict of dicts) {
                    candidates = _.flatMap(candidates, c => this.mapDictRange(c, dict));
                }
                return candidates;
            });

        return _.min(rangeCandidates.map(c => c.start))!.toString();
    }
}

new Day05().run();
