import { AdventOfCodeDay } from "../util/util";

enum HandType {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}
export class Day07 extends AdventOfCodeDay {
    day = 7;
    private cardOrder = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    private cardOrder2 = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];
    // private handTypes = ["five of a kind", "four of a kind", "full house", "three of a kind", "two pair", "one pair", "high card"];
    private getHandType(hand: string): HandType {
        const cardCounts = new Map<string, number>();
        for (const card of hand) {
            cardCounts.set(card, (cardCounts.get(card) ?? 0) + 1);
        }
        // five of a kind
        if ([...cardCounts.entries()].some(([_, count]) => count === 5)) {
            return HandType.FiveOfAKind;
        }
        // four of a kind
        if ([...cardCounts.entries()].some(([_, count]) => count === 4)) {
            return HandType.FourOfAKind;
        }
        // full house
        if ([...cardCounts.entries()].some(([_, count]) => count === 3) && [...cardCounts.entries()].some(([_, count]) => count === 2)) {
            return HandType.FullHouse;
        }
        // three of a kind
        if ([...cardCounts.entries()].some(([_, count]) => count === 3)) {
            return HandType.ThreeOfAKind;
        }
        // two pair
        if ([...cardCounts.entries()].filter(([_, count]) => count === 2).length === 2) {
            return HandType.TwoPair;
        }
        // one pair
        if ([...cardCounts.entries()].some(([_, count]) => count === 2)) {
            return HandType.OnePair;
        }
        // high card
        return HandType.HighCard;
    }
    private getHandType2(hand: string): HandType {
        // j is joker
        const cardCounts = new Map<string, number>();
        for (const card of hand) {
            cardCounts.set(card, (cardCounts.get(card) ?? 0) + 1);
        }
        const jokerCardCount = cardCounts.get("J") ?? 0;
        cardCounts.delete("J");
        if(jokerCardCount === 0) {
            return this.getHandType(hand);
        }
        // five of a kind
        if (jokerCardCount === 5 || [...cardCounts.entries()].some(([_, count]) => count + jokerCardCount === 5)) {
            return HandType.FiveOfAKind;
        }
        // four of a kind
        if ([...cardCounts.entries()].some(([_, count]) => count + jokerCardCount === 4)) {
            return HandType.FourOfAKind;
        }
        // full house
        const threeOfAKind = [...cardCounts.entries()]
            .sort(([_, count]) => count)
            .reverse()
            .find(([_, count]) => count + jokerCardCount === 3);
        if (threeOfAKind) {
            const remainingJokers = jokerCardCount - (3 - threeOfAKind[1]);
            // let toakIndex = [.]
            if ([...cardCounts.entries()]
                .map(([_, count]) => (_ !== threeOfAKind[0] ? [_, count] : [_, 0]) as [string, number])
                .some(([_, count]) => count + remainingJokers === 2)) {
                return HandType.FullHouse;
            }
        }
        // three of a kind
        if ([...cardCounts.entries()].some(([_, count]) => count + jokerCardCount === 3)) {
            return HandType.ThreeOfAKind;
        }
        // two pair
        const pairs = [...cardCounts.entries()]
            .sort(([_, count]) => count)
            .reverse()
            .filter(([_, count]) => count + jokerCardCount === 2);
        if (pairs.length) {
            const remainingJokers = jokerCardCount - (2 - pairs[0][1]);
            if ([...cardCounts.entries()]
                .map(([_, count]) => (_ !== pairs[0][0] ? [_, count] : [_, 0]) as [string, number])
                .some(([_, count]) => count + remainingJokers === 2)) {
                return HandType.TwoPair;
            }
        }
        // one pair
        if ([...cardCounts.entries()].some(([_, count]) => count + jokerCardCount === 2)) {
            return HandType.OnePair;
        }
        // high card
        return HandType.HighCard;
    }
    private compareHands(hand1: string, hand2: string): number {
        const hand1Type = this.getHandType(hand1);
        const hand2Type = this.getHandType(hand2);
        if (hand1Type > hand2Type) {
            return 1;
        } else if (hand1Type < hand2Type) {
            return -1;
        }
        for (let i = 0; i < hand1.length; i++) {
            const card1 = hand1[i];
            const card2 = hand2[i];
            const card1Index = this.cardOrder.indexOf(card1);
            const card2Index = this.cardOrder.indexOf(card2);
            if (card1Index > card2Index) {
                return -1;
            } else if (card1Index < card2Index) {
                return 1;
            }
        }
        return 0;
    }
    private compareHands2(hand1: string, hand2: string): number {
        const hand1Type = this.getHandType2(hand1);
        const hand2Type = this.getHandType2(hand2);
        if (hand1Type > hand2Type) {
            return 1;
        } else if (hand1Type < hand2Type) {
            return -1;
        }
        for (let i = 0; i < hand1.length; i++) {
            const card1 = hand1[i];
            const card2 = hand2[i];
            const card1Index = this.cardOrder2.indexOf(card1);
            const card2Index = this.cardOrder2.indexOf(card2);
            if (card1Index > card2Index) {
                return -1;
            } else if (card1Index < card2Index) {
                return 1;
            }
        }
        return 0;
    }
    parse() {
        return new Map(this.inputLines
            .map(l => l.split(" "))
            .map(l => [l[0], +l[1]]));
    }
    sortedHands(bids: Map<string, number>, part2: boolean): string[] {
        // hands sorted ascending
        const hands = [...bids.keys()].sort((a, b) => part2 ? this.compareHands2(b, a) : this.compareHands(b, a)).reverse();
        return hands;
    }
    doStuff(part2: boolean){
        const bids = this.parse();
        // hands sorted ascending
        const hands = this.sortedHands(bids, part2);
        const winnings = hands.map(h => bids.get(h) ?? 0).reduce((a, b, i) => a + b * (i + 1), 0);
        return winnings.toString();
    }
    part1(input: string): string {
        return this.doStuff(false);
    }
    part2(input: string): string {
        return this.doStuff(true);
    }
}

new Day07().run();
