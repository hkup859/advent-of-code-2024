const inputText = await Deno.readTextFile("./day6/puzzle-input/full_input.txt");

const formatInput = (input: string) => {
  return input.split('\n').map(x => x.split(''))
};

const GUARD_CHARS = ['^', '>', 'v', '<'] // in order
const ITEM_CHAR = '#'

const moveGrid = (grid: string[][]) => {
    let stop = false
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i]
        for (let k = 0; k < row.length; k++) {
            let currentPosition = row[k]
            if (GUARD_CHARS.includes(currentPosition)) {
                // console.log("FOUND: ", i, k)
                let spotToMove
                if (currentPosition === GUARD_CHARS[0]) {
                    // Check up
                    spotToMove = [i-1, k]
                } else if (currentPosition === GUARD_CHARS[1]) {
                    // Check right
                    spotToMove = [i, k+1]
                } else if (currentPosition === GUARD_CHARS[2]) {
                    // Check down
                    spotToMove = [i+1, k]
                } else {
                    // Check left
                    spotToMove = [i, k-1]
                }

                // console.log("spotToMove: ", spotToMove)

                // Is map over?
                if (spotToMove[0] < 0 || spotToMove[1] < 0 || spotToMove[0] > grid.length-1 || spotToMove[1] > row.length-1) {
                    console.log("GAME OVER: ", spotToMove)
                    return { grid, finish: true}
                }

                // Is object in our way?
                else if (grid[spotToMove[0]][spotToMove[1]] === '#') {
                    grid[i][k] = GUARD_CHARS[(GUARD_CHARS.indexOf(currentPosition)+1)%4]
                }

                else {
                    // console.log("HERE: ", grid[spotToMove[0]][spotToMove[1]])
                    grid[spotToMove[0]][spotToMove[1]] = currentPosition
                    grid[i][k] = '@'
                }
                stop = true
                // console.log("STOP")
                break
            }
            // console.log("K")
        }
        // console.log("I: ", stop)
        // break
        if (stop) break
        
    }
    // console.log("RETURN")
    return { grid, finish: false}
}

const solution = (input: string) => {
    const grid = formatInput(input)
    
    // console.log("START grid: ", '\n', grid.join('\n'))
    

    // console.log("------")
    let iGrid = grid
    for (let i = 0; i < 55000; i++) {
        const results = moveGrid(iGrid)
        if (results.finish) return results.grid.flat().filter(x => x === '@').length+1
        iGrid = results.grid
        // console.log("NEW grid: ", '\n',iGrid.join('\n'))
    }
    
    
};

console.log("Answer: ", solution(inputText));

/*

....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...

*/