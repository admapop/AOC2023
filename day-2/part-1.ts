import { readFileSync } from "node:fs";
const file = readFileSync("input.txt").toString();
const lines = file.split("\n");
const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

enum CUBE {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

const MAX_MAP = {
  [CUBE.RED]: RED_CUBES,
  [CUBE.GREEN]: GREEN_CUBES,
  [CUBE.BLUE]: BLUE_CUBES,
};

function main() {
  const validGames = [];

  for (let i = 0; i < lines.length; i++) {
    const game = lines[i];
    const sets = game.substring(game.indexOf(":") + 1).split(";");
    const solvedSets = sets.reduce<Record<CUBE, number>>(
      (acc, set) => {
        const cubes = set
          .trim()
          .split(",")
          .map((cube) => cube.trim());

        cubes.forEach((cube) => {
          const [value, color] = cube.split(" ");
          acc[color as CUBE] += parseInt(value);
        });
        return acc;
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      },
    );

    if (
      Object.entries(solvedSets).every(
        ([color, value]) => value <= MAX_MAP[color as CUBE],
      )
    ) {
      validGames.push(i + 1);
    }
  }

  console.log(validGames.reduce((a, b) => a + b, 0));
}

main();
