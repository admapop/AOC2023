// Broken?
// const file = Bun.file("input.txt").json();

import { readFileSync } from "node:fs";
const file = readFileSync("input.txt").toString();
const arrayOfLines = file.split("\n");
const result = [];

for (const line of arrayOfLines) {
  let tempString = "";

  for (let i = 0; i < line.length; i++) {
    if (!isNaN(parseInt(line[i]))) {
      tempString += line[i];
      break;
    }
  }

  for (let i = line.length - 1; i >= 0; i--) {
    if (!isNaN(parseInt(line[i]))) {
      tempString += line[i];
      break;
    }
  }
  console.log(tempString);

  result.push(parseInt(tempString));
}

console.log(result.reduce((a, b) => a + b, 0));
