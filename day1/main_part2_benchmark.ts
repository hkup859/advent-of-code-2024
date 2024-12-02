// Solution compatible with https://github.com/sigmaSd/Aoc2024Bench
const formatInput = (input) => {
  const halfSplitList = input.split("\n");
  const leftList = [];
  const rightList = [];
  for (let i = 0; i < halfSplitList.length; i++) {
    const fullSplit = halfSplitList[i].split("   ");
    leftList.push(fullSplit[0]);
    rightList.push(fullSplit[1]);
  }

  return { leftList: leftList.sort(), rightList: rightList.sort() };
};

// Loop through the sortedList to find all matches.
const countInstances = (
  num,
  listToCheck,
  lastI,
) => {
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

const solution = (input) => {
  const { leftList, rightList } = formatInput(input);

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
  return totalValue;
};

const getFile = await Deno.readTextFile("./day1/puzzle-input/day1.txt");
console.log(solution(getFile));
