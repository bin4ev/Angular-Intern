const { createReadStream, createWriteStream } = require("fs")
const lineReader = require('line-reader');

async function* readLine(readStream) {

    for await (chunk of readStream){
        yield chunk
    }





}


let readStream = createReadStream('./public/data1.json', { encoding: 'utf-8' })
let lines = readLine(readStream)

let lineNum = 1;

(async function () {
    for await (let line of lines) {
        lineNum++;
        console.log(`${lineNum}-${line}`);
    }
})()
/* for (let line of lines) {
    lineNum++;
    console.log(`${lineNum}-${line}`);
}
 */