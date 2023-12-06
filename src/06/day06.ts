import { AdventOfCodeDay } from "../util/util";

export class Day06 extends AdventOfCodeDay {
    day = 6;
    getDistance(numSecondsOfAccel: number, numSecondsTotal) {
        // let distance = 0;
        // let speed = 0;
        // for(let i = 0; i < numSecondsTotal; i++) {
        //     if(i < numSecondsOfAccel) {
        //         speed++;
        //     } else {

        //         distance += speed;
        //     }
        // }
        // return distance;
        return numSecondsOfAccel * (numSecondsTotal - numSecondsOfAccel);
    }
    part1(input: string): string {
        const [timeStr, distanceStr] = input.split("\n").filter(line => !!line);
        const times = timeStr.split(":")[1].trim().split(/\s+/).map(x => +x);
        const distances = distanceStr.split(":")[1].trim().split(/\s+/).map(x => +x);

        const numWaysToBeatRecordTime = distances.map((distance, i) => {
            const recordTime = times[i];
            let count = 0;
            for (let numSecondsOfAccel = 0; numSecondsOfAccel < recordTime; numSecondsOfAccel++) {
                let distanceCovered = this.getDistance(numSecondsOfAccel, recordTime);
                // console.log(`distanceCovered: ${distanceCovered} with ${numSecondsOfAccel} seconds of accel, and ${recordTime} seconds total`);
                if (distanceCovered > distance) {
                    count++;
                }
            }
            return count;
        });
        console.log(numWaysToBeatRecordTime);
        return numWaysToBeatRecordTime.reduce((a, b) => a * b, 1).toString();
    }
    part2(input: string): string {
        const [timeStr, distanceStr] = input.split("\n").filter(line => !!line);
        const time = +timeStr.split(":")[1].replace(/\s+/g, "").trim();
        const distance = +distanceStr.split(":")[1].replace(/\s+/g, "").trim();

        const recordTime = time;
        let count = 0;
        for (let numSecondsOfAccel = 0; numSecondsOfAccel < recordTime; numSecondsOfAccel++) {
            let distanceCovered = this.getDistance(numSecondsOfAccel, recordTime);
            // console.log(`distanceCovered: ${distanceCovered} with ${numSecondsOfAccel} seconds of accel, and ${recordTime} seconds total`);
            if (distanceCovered > distance) {
                count++;
            }
        }
        return count.toString();
    }
}

new Day06().run();
