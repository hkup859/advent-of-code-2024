// Solution compatible with https://github.com/sigmaSd/Aoc2024Bench
const solution = (input) => {
  // Find all valid mul commands
  const getValidMuls = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);

  let total = 0;
  getValidMuls?.forEach((mul) => {
    const args = mul.substring(4, mul.length - 1).split(",").map(
      (x) => Number(x),
    );
    total += args[0] * args[1];
  });
  return total;
};
