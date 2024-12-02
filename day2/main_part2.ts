import listData from "./puzzle-input/list.json" with { type: "json" };

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

const lists = listData.data;
let safeCount = 0;
for (let i = 0; i < lists.length; i++) {
  const splitList = lists[i].split(" ").map((x) => Number(x));
  const fullListResult = isListSafe(splitList);
  if (fullListResult) safeCount++;
  else {
    for (let k = 0; k < splitList.length; k++) {
      const subsetList = ([] as number[]).concat(splitList);
      subsetList.splice(k, 1);

      const subsetResult = isListSafe(subsetList);
      if (subsetResult) {
        k = Infinity;
        safeCount++;
      }
    }
  }
}

console.log("Safe Count: ", safeCount);
