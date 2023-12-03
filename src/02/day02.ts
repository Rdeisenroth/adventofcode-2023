import { AdventOfCodeDay } from "../util/util";

enum CubeColor {
    RED = "red",
    GREEN = "green",
    BLUE = "blue",
}

type Game = {
    id: number,
    subsets: Map<CubeColor, number>[],
}

export class Day02 extends AdventOfCodeDay {
    day = 2;
    private parseInput(input: string): Game[] {
        return input
            .split("\n")
            .filter((line) => !!line)
            .map((line) => {
                const [prefix, subsetString] = line.split(":");
                let id = parseInt(prefix.split(" ")[1]);
                let subsets = subsetString.split(";").map((subsetString) => new Map(subsetString.split(",").map((colorString) => {
                    let [count, color] = colorString.trim().split(" ");
                    return [color, parseInt(count)] as [CubeColor, number];
                })),
                );
                return { id, subsets };
            });
    }
    part1(input: string): string {
        let games = this.parseInput(input);
        console.log("games", JSON.stringify(games, null, 2));
        const max_red = 12, max_green = 13, max_blue = 14;
        let validGames = games.filter((game) => !game.subsets.some((subset) => {
            return (subset.get(CubeColor.RED) ?? 0) > max_red
                || (subset.get(CubeColor.GREEN) ?? 0) > max_green
                || (subset.get(CubeColor.BLUE) ?? 0) > max_blue;
        },
        ));

        return validGames.map((game) => game.id).reduce((a, b) => a + b, 0).toString();
    }
    part2(input: string): string {
        let games = this.parseInput(input);
        console.log("games", JSON.stringify(games, null, 2));
        let powers = games.map((game) => {
            let min_red = 0, min_green = 0, min_blue = 0;
            game.subsets.forEach((subset) => {
                if ((subset.get(CubeColor.RED) ?? 0) > min_red) {
                    min_red = subset.get(CubeColor.RED) ?? 0;
                }
                if ((subset.get(CubeColor.GREEN) ?? 0) > min_green) {
                    min_green = subset.get(CubeColor.GREEN) ?? 0;
                }
                if ((subset.get(CubeColor.BLUE) ?? 0) > min_blue) {
                    min_blue = subset.get(CubeColor.BLUE) ?? 0;
                }
            });
            return min_red * min_green * min_blue;
        });

        console.log("powers", JSON.stringify(powers, null, 2));

        return powers.reduce((a, b) => a + b, 0).toString();
    }
}

new Day02().run();
