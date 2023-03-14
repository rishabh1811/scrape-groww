const puppeteer = require('puppeteer');
const fs = require('fs');



(async () => {
    const url = "https://groww.in/mutual-funds/quant-small-cap-fund-direct-plan-growth";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.click('.holdings101Cta');

  const tableData = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.holdings101Row'));
    return rows.map(row => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, column => column.innerText);
    
    });
  });
//   console.log(tableData);
const modTableData = tableData.map(data => {
    return { name:data.shift() , weight :data.pop()}
})

console.log(modTableData);
//   try {
//     fs.writeFileSync('./test.txt', tableData);
//     // file written successfully
//   } catch (err) {
//     console.error(err);
//   }

  await browser.close();
})();

