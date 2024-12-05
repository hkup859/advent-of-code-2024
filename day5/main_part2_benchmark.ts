// Solution compatible with https://github.com/sigmaSd/Aoc2024Bench
const formatInput = (input) => {
  const datasets = input.split("\n\n");
  return {
    rules: datasets[0].split("\n").map((x) => x.split("|")),
    pages: datasets[1].split("\n").map((x) => x.split(",")),
  };
};

const fixPage = (page, rules, alreadyCorrect = true) => {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const page1 = rule[0];
    const page2 = rule[1];

    const page1Index = page.indexOf(page1);
    const page2Index = page.indexOf(page2);
    if (page1Index !== -1 && page2Index !== -1 && page1Index > page2Index) {
      page[page1Index] = page2;
      page[page2Index] = page1;
      return fixPage(page, rules, false);
    }
  }
  return { newPage: page, alreadyCorrect };
};

const solution = (input) => {
  const { rules, pages } = formatInput(input);
  let middlePageTotal = 0;
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    const { newPage, alreadyCorrect } = fixPage(page, rules);

    if (!alreadyCorrect) {
      middlePageTotal += Number(newPage[Math.round((newPage.length - 1) / 2)]);
    }
  }

  return middlePageTotal;
};
