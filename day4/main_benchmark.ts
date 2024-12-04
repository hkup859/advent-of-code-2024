// Solution compatible with https://github.com/sigmaSd/Aoc2024Bench
const solution = (input) => {
  const fullText = input.split("\n").join(",");
  const lineLength = fullText.indexOf(",");

  const downRegex = new RegExp(
    `(?=X.{${lineLength}}M.{${lineLength}}A.{${lineLength}}S)`,
    "g",
  );
  const upRegex = new RegExp(
    `(?=S.{${lineLength}}A.{${lineLength}}M.{${lineLength}}X)`,
    "g",
  );
  const diagonalDownRightRegex = new RegExp(
    `(?=X.{${lineLength + 1}}M.{${lineLength + 1}}A.{${lineLength + 1}}S)`,
    "g",
  );
  const diagonalDownLeftRegex = new RegExp(
    `(?=X.{${lineLength - 1}}M.{${lineLength - 1}}A.{${lineLength - 1}}S)`,
    "g",
  );
  const diagonalUpRightRegex = new RegExp(
    `(?=S.{${lineLength - 1}}A.{${lineLength - 1}}M.{${lineLength - 1}}X)`,
    "g",
  );
  const diagonalUpLeftRegex = new RegExp(
    `(?=S.{${lineLength + 1}}A.{${lineLength + 1}}M.{${lineLength + 1}}X)`,
    "g",
  );

  // TODO - would combining the REGEXes into 1 be faster?
  const FORWARDS = fullText.match(/XMAS/g) ?? [];
  const BACKWARDS = fullText.match(/SAMX/g) ?? [];
  const DOWN = fullText.match(downRegex) ?? [];
  const UP = fullText.match(upRegex) ?? [];
  const DIAGONAL_DOWN_RIGHT = fullText.match(diagonalDownRightRegex) ?? [];
  const DIAGONAL_DOWN_LEFT = fullText.match(diagonalDownLeftRegex) ?? [];
  const DIAGONAL_UP_RIGHT = fullText.match(diagonalUpRightRegex) ?? [];
  const DIAGONAL_UP_LEFT = fullText.match(diagonalUpLeftRegex) ?? [];

  // Combine all searches
  return FORWARDS.length + BACKWARDS.length + DOWN.length + UP.length +
    DIAGONAL_DOWN_RIGHT.length + DIAGONAL_DOWN_LEFT.length +
    DIAGONAL_UP_RIGHT.length + DIAGONAL_UP_LEFT.length;
};