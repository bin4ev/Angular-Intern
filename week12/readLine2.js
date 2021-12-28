function* readLine(chunks) {
    let last = ''
    for (let chunk of chunks) {
        let cutIdx = 0
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] != '\n') {
                continue
            }

            yield last + chunk.slice(cutIdx, i)
            last = ''
            cutIdx = i + 1
        }
        last += chunk.slice(cutIdx)
    }
    yield last //check for /n
}


let chunks = [
    'ala\nbala\npor',
    'tokala'
]

let lines = readLine(chunks)
for (let line of lines) {
    console.log(line)
}