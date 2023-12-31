import { AdventOfCodeDay } from "../util/util";

type card = {
    cn: number,
    winAmount: number,
};
export class Day04 extends AdventOfCodeDay {
    day = 4;
    part1(input: string): string {
        return input
            .split("\n")
            .filter((line) => !!line)
            .map(line => line.split(":")[1])
            .map(line => {
                const [wnStr, anStr] = line.split("|");
                const wn = wnStr.trim().split(/\s+/).map(w => +w.trim());
                const an = anStr.trim().split(/\s+/).map(w => +w.trim());
                const count = an.filter(a => wn.some(w => a === w)).length;
                // console.log("wn", wn, "an", an, "count", count);
                return count === 0 ? 0 : Math.pow(2, count - 1);
            })
            .reduce((a, b) => a + b, 0)
            .toString();
    }

    part2(input: string): string {
        const cards = input
            .split("\n")
            .filter((line) => !!line)
            .map(line => line.split(":")[1])
            .map((line, i) => {
                const [wnStr, anStr] = line.split("|");
                const wn = wnStr.trim().split(/\s+/).map(w => +w.trim());
                const an = anStr.trim().split(/\s+/).map(w => +w.trim());
                const count = an.filter(a => wn.some(w => a === w)).length;
                return {
                    cn: i,
                    winAmount: count,
                };
            });
        const wonCards = [] as card[];
        cards.forEach((card, i) => {
            wonCards.push(card);
            const iCardsCopies = wonCards.filter(c => c.cn === i).length;
            for (let u = 0; u < iCardsCopies; u++) {
                for (let j = 0; j < card.winAmount; j++) {
                    const tmp = cards.find(c => c.cn === i+j+1);
                    if (tmp) {
                        wonCards.push(tmp);
                    } else {
                        cards.push({
                            cn: i+j+1,
                            winAmount: 0,
                        });
                    }
                }
            }
        });
        console.log("cards", cards);
        console.log("wonCards", wonCards);
        return wonCards.length.toString();
    }
}
new Day04().run();
