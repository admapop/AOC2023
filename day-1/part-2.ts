// Broken?
// const file = Bun.file("input.txt").json();

import { readFileSync } from "node:fs";
const file = readFileSync("input.txt").toString();
const arrayOfLines = file.split("\n");
const result = [];

const numberMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

for (const line of arrayOfLines) {
  const matches = findAllNumbers(line);

  const firstMatch = matches?.[0];
  const lastMatch = matches?.at(-1);

  let tempString = "";

  if (firstMatch) {
    if (!isNaN(parseInt(firstMatch))) {
      tempString += firstMatch;
    } else {
      const number = numberMap[firstMatch];
      tempString += String(number);
    }

    if (lastMatch) {
      if (!isNaN(parseInt(lastMatch))) {
        tempString += lastMatch;
      } else {
        const number = numberMap[lastMatch];
        tempString += String(number);
      }
    }
  }

  result.push(parseInt(tempString));
}

console.log(result.reduce((a, b) => a + b, 0));

// Absolutely ridiculous that you have to do this.
function findAllNumbers(str: string) {
  const patterns = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let matches: string[] = [];

  for (let i = 0; i < str.length; i++) {
    patterns.forEach((pattern) => {
      if (str.substring(i).startsWith(pattern)) {
        matches.push(pattern);
      }
    });
  }

  return matches;
}
