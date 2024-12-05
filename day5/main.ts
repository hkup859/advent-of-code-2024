const inputText = await Deno.readTextFile("./day5/puzzle-input/full_input.txt");


const formatInput = (input: string) => {
    const datasets = input.split('\n\n')
    return {rules: datasets[0].split('\n'), pages: datasets[1].split('\n')}
}

const solution = (input: string) => {
    const {rules, pages } = formatInput(input)
    // console.log("rules: ", rules)
    // console.log("pages: ", pages)
    

    let middlePageTotal = 0
    pages.forEach((page) => {
        // console.log("----------------")
        // console.log("Page: ", page)
        let safe = true
        // Shouldn't use a foreach, should just escape
        rules.forEach((rule) => {
            // console.log("Rule: ", rule)
            const rulePages = rule.split('|')
            const page1 = rulePages[0]
            const page2 = rulePages[1]
            const page1Index = page.indexOf(page1)
            const page2Index = page.indexOf(page2)
            if (page1Index !== -1 && page2Index !== -1 && page1Index > page2Index) safe = false 
            
        })
        // console.log("SAFE: ", safe)
        if (safe) {
            const pageArr = page.split(',')
            middlePageTotal += Number(pageArr[Math.round((pageArr.length - 1) / 2)]);
        }
    })
    return middlePageTotal
    

    
};

console.log("Answer: ", solution(inputText));
