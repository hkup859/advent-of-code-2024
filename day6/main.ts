const inputText = await Deno.readTextFile("./day6/puzzle-input/full_input.txt");

const formatInput = (input: string) => {
  return input.split("\n").map((x) => x.split(""));
};

const GUARD_CHARS = ["^", ">", "v", "<"]; // in order
const ITEM_CHAR = "#";

const moveGrid = (grid: string[][]) => {
  let stop = false;
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let k = 0; k < row.length; k++) {
      const currentPosition = row[k];
      if (GUARD_CHARS.includes(currentPosition)) {
        let spotToMove;
        if (currentPosition === GUARD_CHARS[0]) spotToMove = [i - 1, k]; // Up
        else if (currentPosition === GUARD_CHARS[1]) spotToMove = [i, k + 1]; // Right
        else if (currentPosition === GUARD_CHARS[2]) spotToMove = [i + 1, k]; // Down
        else spotToMove = [i, k - 1]; // Left

        // Will we move off map?
        if (
          spotToMove[0] < 0 || spotToMove[1] < 0 ||
          spotToMove[0] > grid.length - 1 || spotToMove[1] > row.length - 1
        ) return { grid, finish: true };
        // Is an object in our way?
        else if (grid[spotToMove[0]][spotToMove[1]] === ITEM_CHAR) {
          grid[i][k] =
            GUARD_CHARS[(GUARD_CHARS.indexOf(currentPosition) + 1) % 4];
        } else {
          grid[spotToMove[0]][spotToMove[1]] = currentPosition;
          grid[i][k] = "@";
        }
        stop = true;
        break;
      }
    }
    if (stop) break;
  }
  return { grid, finish: false };
};

const solution = (input: string) => {
  const grid = formatInput(input);
  let iGrid = grid;

  // Ensures we never enter an infinite loop
  for (let i = 0; i < 500000; i++) {
    const results = moveGrid(iGrid);
    if (results.finish) {
      return results.grid.flat().filter((x) => x === "@").length + 1;
    }
    iGrid = results.grid;
  }
};

console.log("Answer: ", solution(inputText));
