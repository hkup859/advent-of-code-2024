import list1 from "./puzzle-input/list1.json" with { type: "json" };
import list2 from "./puzzle-input/list2.json" with { type: "json" };

const sortedList1 = list1.data.sort();
const sortedList2 = list2.data.sort();

let totalDifference = 0;
// Assumes the lists are equal length (prompt was not specific, but implied this)
for (let i = 0; i < sortedList1.length; i++) {
  totalDifference += Math.abs(sortedList1[i] - sortedList2[i]);
}

console.log("totalDifference: ", totalDifference);
