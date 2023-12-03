import { readFileSync } from "node:fs";
const file = readFileSync("input.txt").toString();
const schematicArray: string[][] = [];
const pointsOfInterest: {
  x: number;
  y: number;
  adjacentPositions: { x: number; y: number }[];
}[] = [];

function generateSchematicArray() {
  const lines = file.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const rows = [];
    for (let j = 0; j < lines[i].length; j++) {
      rows.push(lines[i][j]);
    }
    schematicArray.push(rows);
  }
}

function generatePointsOfInterest() {
  const regex = /[^.0-9]/g;

  for (let i = 0; i < schematicArray.length; i++) {
    for (let j = 0; j < schematicArray[i].length; j++) {
      if (regex.test(schematicArray[i][j])) {
        pointsOfInterest.push({
          x: i,
          y: j,
          adjacentPositions: calculateAdjacentPositions(i, j),
        });
      }
    }
  }
}

function calculateAdjacentPositions(x: number, y: number) {
  const adjacentPositions: { x: number; y: number }[] = [];

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) {
        continue;
      } else {
        adjacentPositions.push({ x: i, y: j });
      }
    }
  }

  return adjacentPositions;
}

function isDigit(char: string) {
  const parsedChar = parseInt(char);
  if (isNaN(parsedChar)) {
    return false;
  }

  return true;
}

function navigateSchematic() {
  const numbers = [];
  let tempNumber = "";
  let isNumberAdjacent = false;

  for (let i = 0; i < schematicArray.length; i++) {
    for (let j = 0; j < schematicArray[i].length; j++) {
      if (isDigit(schematicArray[i][j])) {
        tempNumber += schematicArray[i][j];
        isNumberAdjacent =
          isNumberAdjacent ||
          pointsOfInterest.some((pointOfInterest) =>
            pointOfInterest.adjacentPositions.some(
              (adjacentPosition) =>
                adjacentPosition.x === i && adjacentPosition.y === j,
            ),
          );
      } else {
        if (tempNumber.length) {
          isNumberAdjacent && numbers.push(parseInt(tempNumber));
          tempNumber = "";
          isNumberAdjacent = false;
        }
      }
    }
    if (tempNumber.length) {
      isNumberAdjacent && numbers.push(parseInt(tempNumber));
      tempNumber = "";
      isNumberAdjacent = false;
    }
  }

  return numbers;
}

generateSchematicArray();
generatePointsOfInterest();
console.log(navigateSchematic().reduce((a, b) => a + b, 0)); //831312
