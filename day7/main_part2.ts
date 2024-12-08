const inputText = await Deno.readTextFile("./day7/puzzle-input/full_input.txt");

const formatInput = (input: string) => {
  return input.split("\n").map((line) => {
    const datas = line.split(": ");
    return {
      answer: Number(datas[0]),
      options: datas[1].split(" ").map((x) => Number(x)),
    };
  });
};

// Idea 1 - Could create a list of string permuations and process them using eval.
// Idea 2 (Went with this) - Since we only need if the value is correct, just process as we go, keeping track of the value until the end.
const canAnswer = (nums: number[], answer: number) => {
  let workingValues = [
    nums[0] * nums[1],
    nums[0] + nums[1],
    Number(nums[0].toString() + nums[1].toString()),
  ];
  for (let i = 2; i < nums.length; i++) {
    workingValues = workingValues.map((x) => [
      x * nums[i],
      x + nums[i],
      Number(x.toString() + nums[i].toString()),
    ]).flat();
  }
  return workingValues.includes(answer);
};

const solution = (input: string) => {
  const formattedInputs = formatInput(input);
  let total = 0;
  for (let i = 0; i < formattedInputs.length; i++) {
    const currentItem = formattedInputs[i];
    const isValid = canAnswer(currentItem.options, currentItem.answer);
    if (isValid) total += currentItem.answer;
  }
  return total;
};

console.log("Answer: ", solution(inputText));
