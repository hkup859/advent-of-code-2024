const inputText = await Deno.readTextFile("./day6/puzzle-input/full_input.txt");

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

const findGuard = (grid: string[][]) => {
    const flatGrid = grid.flat()
    const guardFlatPositionUp = flatGrid.indexOf(GUARD_CHARS[0])
    const guardFlatPositionRight = flatGrid.indexOf(GUARD_CHARS[1])
    const guardFlatPositionDown = flatGrid.indexOf(GUARD_CHARS[2])
    const guardFlatPositionLeft = flatGrid.indexOf(GUARD_CHARS[3])
    
    // return {
    //     position: [(guardFlatPositionUp / grid.length).toFixed(0), (guardFlatPositionUp % grid.length)],
    //     // direction: guardFlatPositionUp !== -1 ? 'up' : guardFlatPositionRight !== -1 ? 'right'
    // }
    let guardFlatPosition: any = []
    let direction = ''
    // console.log("flatGrid: ", flatGrid)
    if(guardFlatPositionUp !== -1) {
        guardFlatPosition = [Math.floor((guardFlatPositionUp / grid.length)), (guardFlatPositionUp % grid.length)]
        direction = 'up'
    }
    else if(guardFlatPositionRight !== -1) {
        guardFlatPosition = [Math.floor((guardFlatPositionRight / grid.length)), (guardFlatPositionRight % grid.length)] 
        direction = 'right'
    }
    else if(guardFlatPositionDown !== -1) {
        guardFlatPosition = [Math.floor((guardFlatPositionDown / grid.length)), (guardFlatPositionDown % grid.length)] 
        direction = 'down'
    }
    else if(guardFlatPositionLeft !== -1) {
        guardFlatPosition = [Math.floor((guardFlatPositionLeft / grid.length)), (guardFlatPositionLeft % grid.length)] 
        direction = 'left'
    }
    return {position: guardFlatPosition, direction}
}

const findPositionsTraveled = (grid: string[][]) => {
  const positionsTraveled = [];
  for (let i = 0; i < grid.length; i++) {
    for (let k = 0; k < grid[i].length; k++) {
      if (grid[i][k] === TRAVEL_CHAR || GUARD_CHARS.includes(grid[i][k])) {
        positionsTraveled.push([i, k]);
      }
    }
  }
//   const encoder = new TextEncoder();
//     const data = encoder.encode(JSON.stringify(positionsTraveled));
//   Deno.writeFileSync('positionsTraveled.txt', data)
  return positionsTraveled;
};

// TODO - add a detection for infinite loop. Current brute forcing process is horribly inefficient and technically could have loopholes
const processMapRun = (grid: string[][]) => {
    // Idea 1 - if you have moved total grid size spaces all on @ spaces -> 130*130 = 16k. Still very slow
    // Idea 2 - Count turns and if you have touched a new space. If your direction has changed 4 times and all the spaces you touched are used, then it's a loop. -> Close but no.
    // Idea 3 - Track spaces traveled & combine with Idea 2. If we have turned 4 times on all used spaces, check the traveled spaces to see if we have repeated the exact same loop. Might have a small loophole, run twice?
    let spacesTraveled: any = []
    let turns = 0
    let touchedNewSpace = true
    let lastDirection = ''
    let lastGrid = [[]]
    let nextPredictedPosition = ''
  for (let i = 0; i < 50000; i++) {
    lastGrid = JSON.parse(JSON.stringify(grid))
    const results = moveGrid(grid);
    if (results.finish) {
      return { map: results.grid, status: "Finished" };
    }

    const {position, direction } = findGuard(grid)
    
    // Track turns
    if (direction !== lastDirection) {
        // console.log("TURNED")
        turns++
        lastDirection = direction
    }

    // Track new spaces
    // console.log("position[0]: ", position[0])
    // console.log("lastGrid[position[0]]: ", lastGrid[position[0]])
    else if(lastGrid[position[0]][position[1]] !== TRAVEL_CHAR) {
        // console.log("RESET")
        // Reset
        turns = 0
        spacesTraveled = []
        touchedNewSpace = true
        nextPredictedPosition = ''
    } else {
        // console.log("CONTINUE: ", turns)
        touchedNewSpace = false
        spacesTraveled.push(position.join('|'))
    }

    if (turns > 4) {
        // console.log("TURNS")
        // you have turned 4 times, check spaces traveled. We MIGHT have completed a loop. Longer loops will continue turning though.
        // is guard position in the 
        const spaceTraveledPosition = spacesTraveled.indexOf(position.join('|'))
        if (spaceTraveledPosition != -1) {
            // console.log("spaceTraveledPosition")
            // console.log("-----------")
            // console.log("nextPredictedPosition: ", nextPredictedPosition)
            // console.log("spaceTraveledPosition: ", spaceTraveledPosition)
            // console.log("spacesTraveled.length: ", spacesTraveled.length)
            if (nextPredictedPosition === spacesTraveled[spaceTraveledPosition]) {
                // Loop
                return {map: [], status: "Unfinished"}
            }
            // We have been on this space in the last loop.
            nextPredictedPosition = spaceTraveledPosition+1 < spacesTraveled.length ? spacesTraveled[spaceTraveledPosition+1] : spacesTraveled[0]
            
            // console.log(spaceTraveledPosition+1 < spacesTraveled.length)
            // console.log(spacesTraveled[spaceTraveledPosition+1])
            // console.log(spacesTraveled[0])
            // console.log("-----------")
        }
    }

    if (turns > 1000) console.log("HELP")
    

    // if (grid[position[0]][position[1]] === TRAVEL_CHAR) 

    grid = results.grid;
  }
  return { map: [], status: "Unfinished" };
};

// const solution = (input: string) => {
//   let totalChoices = 0;
//   const grid = formatInput(input);
//   //   console.log("MAP1: ", `\n${grid.join("\n")}`);
//   // Ensures we never enter an infinite loop
//   const { map, status } = processMapRun(JSON.parse(JSON.stringify(grid)));
//   if (status === "Finished") {
//     // console.log("MAP2: ", `\n${map.join("\n")}`);
//     const positionsTraveled = findPositionsTraveled(
//       JSON.parse(JSON.stringify(map)),
//     );
//     // console.log(positionsTraveled);

//     // Loop through positions for obstructions
//     positionsTraveled.forEach((position, index) => {
//         console.log("Percentage: ", `${(((index+1)/positionsTraveled.length)*100).toFixed(2)}%`)
//       // const position = [6, 3]
//       //     console.log("Position: ", position)
//       const tempGrid = JSON.parse(JSON.stringify(grid));
//       if (!GUARD_CHARS.includes(tempGrid[position[0]][position[1]])) {
//         tempGrid[position[0]][position[1]] = ITEM_CHAR;
//         if (processMapRun(tempGrid).status === "Unfinished") {
//           //   console.log("NO FINISH: ", position);
//           totalChoices++;
//         }
//       }
//     });
//   }
//   return totalChoices
// };

const solution = (input: string) => {
    let totalChoices = 0;
   
      const positionsTraveled = []
      
  
      // Loop through positions for obstructions
      positionsTraveled.forEach((position, index) => {
          console.log("Percentage: ", `${(((index+1)/positionsTraveled.length)*100).toFixed(2)}%`)
        const tempGrid = JSON.parse(JSON.stringify(grid));
        if (!GUARD_CHARS.includes(tempGrid[position[0]][position[1]])) {
          tempGrid[position[0]][position[1]] = ITEM_CHAR;
          if (processMapRun(tempGrid).status === "Unfinished") {
            totalChoices++;
          }
        }
      });
    
    return totalChoices
  };

console.log("Answer: ", solution(inputText));
