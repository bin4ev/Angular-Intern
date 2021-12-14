function* splitLines(str) {
    let startCutIndex = 0
    for (let i = 0; i < str.length; i++) {
        if (str[i] != '\n')
            continue

        yield str.slice(startCutIndex, i)
        startCutIndex = i + 1
    }
    yield str.slice(startCutIndex)
}

let multiLineString =
    `ala
bala
portokala`
let lines = splitLines(multiLineString)
for (let line of lines) {
    console.log(line)
}