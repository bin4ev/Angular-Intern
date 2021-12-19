const { createReadStream, readdirSync, statSync } = require("fs")
const lineReader = require('line-reader');
const path = require('path');
const wildcard = require('wildcard');

function printMachedLine(readStream, patern) {
    lineReader.eachLine(readStream, (line) => {
        if (line.match(patern) != null) {
            console.log(line);
        }
    })
}
function grep(command, patern, filePath) {
    let stats
    try {
        stats = statSync(filePath);
    } catch (error) {
        console.log(error)
    }

    if (!stats.isDirectory()) {
        let readStream = createReadStream(path.resolve(filePath), { encoding: 'utf-8' })
        checkComand(command, readStream, filePath, patern)
        return
    }

    let files = readdirSync(filePath)
    for (let file of files) {
        let absPath = path.resolve(`${filePath}/${file}`)
        let stats = statSync(absPath);
        if (stats.isDirectory()) {
            grep(command, patern, absPath)
            continue
        }

        let readStream = createReadStream(absPath, { encoding: 'utf-8' })
        checkComand(command, readStream, absPath, patern)
    }

}

function checkComand(command, readStream, pathFile, patern) {
    switch (command) {
        case '-n':
            let count = 0
            lineReader.eachLine(readStream, (line, last) => {
                count++
                if (!last && line.match(patern) != null) {
                    console.log(count);
                }
            })
            break;
        case '-l':
            lineReader.eachLine(readStream, (line) => {
                if (line.match(patern) != null) {
                    console.log(path.basename(pathFile));
                    return false
                }
            })
            break
        case '-i':
            printMachedLine(readStream, patern)
            break;
        default:
            printMachedLine(readStream, patern)
            break;
    }
}

let args = process.argv.slice(2);
let command = args[0]
let patern = RegExp(args[1])
if (command == '-i') {
    patern = RegExp(args[0], 'i')
}
let baseDir = path.basename(process.cwd())
let files = args.slice(2)
for (let file of files) {
    if (baseDir == file) {
        grep(command, patern, file)
        continue
    }
    let iter = scan(process.cwd(), file)
    for (let i of iter) {
        grep(command, patern, i)
    }

}

function* scan(rootPath, searchFile,) {
    let files = readdirSync(path.resolve(rootPath))
    for (let file of files) {
        let pathFile = path.resolve(`${rootPath}/${file}`)
        if (wildcard(searchFile, file)) {
            yield pathFile
        }

        let stats = statSync(pathFile);
        if (stats.isDirectory()) {
            yield* scan(pathFile, searchFile)
        }
    }
}

