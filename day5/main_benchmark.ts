// Solution compatible with https://github.com/sigmaSd/Aoc2024Bench
const formatInput = (input) => {
  const datasets = input.split("\n\n");
  return { rules: datasets[0].split("\n"), pages: datasets[1].split("\n") };
};

const solution = (input) => {
  const { rules, pages } = formatInput(input);

  let middlePageTotal = 0;
  pages.forEach((page) => {
    let safe = true;
    // Shouldn't use a foreach, should just escape
    rules.forEach((rule) => {
      const rulePages = rule.split("|");
      const page1 = rulePages[0];
      const page2 = rulePages[1];
      const page1Index = page.indexOf(page1);
      const page2Index = page.indexOf(page2);
      if (page1Index !== -1 && page2Index !== -1 && page1Index > page2Index) {
        safe = false;
      }
    });
    if (safe) {
      const pageArr = page.split(",");
      middlePageTotal += Number(pageArr[Math.round((pageArr.length - 1) / 2)]);
    }
  });
  return middlePageTotal;
};