// Solution compatible with https://github.com/sigmaSd/Aoc2024Bench
const formatInput = (input) => {
  const halfSplitList = input.split("\n");
  const list1 = [];
  const list2 = [];
  for (let i = 0; i < halfSplitList.length; i++) {
    const fullSplit = halfSplitList[i].split("   ");
    list1.push(fullSplit[0]);
    list2.push(fullSplit[1]);
  }

  const sortedList1 = list1.sort();
  const sortedList2 = list2.sort();

  return { sortedList1, sortedList2 };
};

function solution(input) {
  let totalDifference = 0;
  const { sortedList1, sortedList2 } = formatInput(input);
  for (let i = 0; i < sortedList1.length; i++) {
    totalDifference += Math.abs(sortedList1[i] - sortedList2[i]);
  }
  return totalDifference;
}
