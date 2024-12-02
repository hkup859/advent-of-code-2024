const isListSafe = (list: number[]) => {
  let direction: number = 0;
  for (let i = 1; i < list.length; i++) {
    const currentItem = list[i];
    const previousItem = list[i - 1];

    // Will always set direction on the first iteration
    if (i === 1) direction = currentItem > previousItem ? 1 : -1;

    const difference = currentItem - previousItem;

    // Check if increasing/decreasing in the correct direction. Will catch if there is no difference
    if (direction === 1 && difference < direction) return false;
    else if (direction === -1 && difference > direction) return false;
    // Check amount of change
    else if (Math.abs(difference) > 3) return false;
  }
  return true;
};

const inputFile = await Deno.readTextFile('./day2/puzzle-input/day2.txt')
const lists = inputFile.split("\n")
let safeCount = 0;
for (let i = 0; i < lists.length; i++) {
  const splitList = lists[i].split(" ").map((x) => Number(x));
  const result = isListSafe(splitList);
  if (result) safeCount++;
}

console.log("Safe Count: ", safeCount);
