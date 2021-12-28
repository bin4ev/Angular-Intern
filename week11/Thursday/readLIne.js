import { createReadStream } from "fs"

async function* readLine(readStream) {
    let curr = ''
    for await (let chunk of readStream) {
        let startCutIndex = 0
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] != '\n') {
                continue
            }

            yield curr + chunk.slice(startCutIndex, i)
            curr = ''
            startCutIndex = i + 1
        }
        curr += chunk.slice(startCutIndex)
    }
    yield curr
}

let readStream = createReadStream('./public/data1.json', "utf-8")
let lines = readLine(readStream)
let lineNum = 1;
(async function () {
    for await (let line of lines) {
        lineNum++;
        console.log(`${lineNum}-${line}`);
    }
})()
