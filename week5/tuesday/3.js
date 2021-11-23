function splitLines(str) {

    let i = 0
    let startCutIndex = 0
return  {
        [Symbol.iterator]() {
            return {
                next: () => {
                    let value = ''
                    for (; i < str.length; i++) {
                        const el = str[i];
                        if (el == '\n' || i == str.length - 1) {
                            value = str.substring(startCutIndex, i+1)
                            startCutIndex = i + 1
                            break
                        }

                    }

                    if (!value) {
                        return { done: true }
                    }

                    i += value.length + 1

                    return {
                        value: value,
                        done: false
                    }
                }
            }

        }
    }
}


let multiLineString =
    `ala
bala
portokala`

let lines = splitLines(multiLineString)
for (line of lines) {
    console.log(line)
}