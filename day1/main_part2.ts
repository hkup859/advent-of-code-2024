import list1 from "./puzzle-input/list1.json" with { type: "json" };
import list2 from "./puzzle-input/list2.json" with { type: "json" };

const leftList = list1.data.sort();
const rightList = list2.data.sort();

// Loop through the sortedList to find all matches.
const countInstances = (
  num: number,
  listToCheck: number[],
  lastI: number,
): { newLastI: number; count: number } => {
  let count = 0;
  let newLastI = 0;
  for (let i = lastI; i < listToCheck.length; i++) {
    if (listToCheck[i] === num) {
      count++;
    } else if (listToCheck[i] > num) {
      newLastI = i;
      i = Infinity;
    }
  }
  return { newLastI, count };
};

let lastCalculated = { value: -1, num: -1 };
let totalValue = 0;
let lastI = 0;
for (let i = 0; i < leftList.length; i++) {
  if (lastCalculated.num === leftList[i]) {
    totalValue += lastCalculated.value;
  } else {
    const { newLastI, count } = countInstances(leftList[i], rightList, lastI);
    lastI = newLastI;
    const calculatedValue = leftList[i] * count;
    lastCalculated = { value: calculatedValue, num: leftList[i] };
    totalValue += calculatedValue;
  }
}

console.log("totalValue: ", totalValue);
