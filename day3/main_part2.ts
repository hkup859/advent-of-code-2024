const inputText = await Deno.readTextFile("./day3/puzzle-input/day3.txt");

const solution = (input: string) => {
  // Find all valid mul, do, and don't commands
  const getValidMuls = input.match(
    /(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|don't\(\)/g,
  );

  let total = 0;
  let allowedToProcess = true;
  getValidMuls?.forEach((mul) => {
    if (mul.substring(0, 5) === "don't") allowedToProcess = false;
    else if (mul.substring(0, 2) == "do") allowedToProcess = true;

    if (allowedToProcess && mul.substring(0, 1) !== "d") {
      const args: number[] = mul.substring(4, mul.length - 1).split(",").map(
        (x) => Number(x),
      );
      total += args[0] * args[1];
    }
  });
  return total;
};

console.log("Answer: ", solution(inputText));
