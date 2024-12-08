const inputText = await Deno.readTextFile("./day6/puzzle-input/test1.txt");

const formatInput = (input: string) => {
  return input.split("\n").map((x) => x.split(""));
};

const GUARD_CHARS = ["^", ">", "v", "<"]; // in order
const ITEM_CHAR = "#";
const TRAVEL_CHAR = "@";

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
          grid[i][k] = TRAVEL_CHAR;
        }
        stop = true;
        break;
      }
    }
    if (stop) break;
  }
  return { grid, finish: false };
};

const findPositionsTraveled = (grid: string[][]) => {
  const positionsTraveled = [];
  for (let i = 0; i < grid.length; i++) {
    for (let k = 0; k < grid[i].length; k++) {
      if (grid[i][k] === TRAVEL_CHAR || GUARD_CHARS.includes(grid[i][k])) {
        positionsTraveled.push([i, k]);
      }
    }
  }
  return positionsTraveled;
};

// TODO - add a detection for infinite loop. Current brute forcing process is horribly inefficient and technically could have loopholes
const processMapRun = (grid: string[][]) => {
  // Idea 1 - if you have moved total grid size spaces all on @ spaces -> 130*130 = 16k. Still very slow
  // Idea 2 - Count turns and if you have touched a new space. If your direction has changed 4 times and all the spaces you touched are used, then it's a loop. -> Close but no.
  // Idea 3 - Track spaces traveled & combine with Idea 2. If we have turned 4 times on all used spaces, check the traveled spaces to see if we have repeated the exact same loop. Might have a small loophole, run twice?
  let spacesTraveled = [];
  let turns = 0;
  let touchedNewSpace = true;
  for (let i = 0; i < 50000; i++) {
    const results = moveGrid(grid);
    if (results.finish) {
      return { map: results.grid, status: "Finished" };
    }
    grid = results.grid;
  }
  return { map: [], status: "Unfinished" };
};

const solution = (input: string) => {
  let totalChoices = 0;
  const grid = formatInput(input);
  //   console.log("MAP1: ", `\n${grid.join("\n")}`);
  // Ensures we never enter an infinite loop
  //   for ()
  const { map, status } = processMapRun(JSON.parse(JSON.stringify(grid)));
  if (status === "Finished") {
    // console.log("MAP2: ", `\n${map.join("\n")}`);
    const positionsTraveled = findPositionsTraveled(
      JSON.parse(JSON.stringify(map)),
    );
    // console.log(positionsTraveled);

    // Loop through positions for obstructions
    positionsTraveled.forEach((position, index) => {
      console.log(
        "Percentage: ",
        `${(((index + 1) / positionsTraveled.length) * 100).toFixed(2)}%`,
      );
      // const position = [6, 3]
      //     console.log("Position: ", position)
      const tempGrid = JSON.parse(JSON.stringify(grid));
      if (!GUARD_CHARS.includes(tempGrid[position[0]][position[1]])) {
        tempGrid[position[0]][position[1]] = ITEM_CHAR;
        if (processMapRun(tempGrid).status === "Unfinished") {
          //   console.log("NO FINISH: ", position);
          totalChoices++;
        }
      }
    });
  }
  return totalChoices;
};

console.log("Answer: ", solution(inputText));
