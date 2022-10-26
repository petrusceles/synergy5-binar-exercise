const os = require("os");
const fs = require("fs");

console.log("Application is runinng!");

console.log(area(3, 4));
console.log('Free Memory:', os.freemem());

const fileContent = fs.readFileSync("./data/text.txt", 'utf-8');
console.log(fileContent);

fs.writeFileSync("./data/text1.txt", "aku menulis ke dalam file");