const { createReadStream, readdirSync, statSync } = require("fs")
const lineReader = require('line-reader')
const path = require('path')
const wildcard = require('wildcard')
const minimist = require('minimist')

function readLineNumber(readStream) {
    let count = 0
    lineReader.eachLine(readStream, (line, last) => {
        count++
        if (!last && line.match(patern) != null) {
            console.log(`${count}: ${line}`);
        }
    })
}

function printName(readStream, pathFile) {
    lineReader.eachLine(readStream, (line) => {
        if (line.match(patern) != null) {
            console.log(path.basename(pathFile));
            return false
        }
    })
}

function readMatchLine(line) {
    lineReader.eachLine(readStream, (line) => {
        if (line.match(patern) != null) {
            console.log(line);
        }
    })
}

function scanFolder(command, filePath) {
    let files = readdirSync(filePath)
    for (let file of files) {
        let absPath = path.resolve(`${filePath}/${file}`)
        let stats = statSync(absPath);
        if (stats.isDirectory()) {
            scanFolder(command, absPath)
            continue
        }

        grep(command, absPath)
    }
}

commandRoute = {
    'n': readLineNumber,
    'l': printName,
    'i': readMatchLine
}

function grep(command, filePath) {
    let readStream = createReadStream(path.resolve(filePath), { encoding: 'utf-8' })
    let commandFunc = commandRoute[command] || readMatchLine
    commandFunc(readStream, filePath)
}

let argv = minimist(process.argv.slice(2))
let command = argv['c']
let patern = argv['p']
let files = argv['_']
if (command == 'i') {
    patern = RegExp(patern, 'i')
}
let baseDirPath = process.cwd()
let baseDir = path.basename(baseDirPath)
if (command == 'r' || !files) {
    scanFolder(command, baseDirPath)
    return
}

for (let file of files) {
    if (baseDir == file) {
        grep(command, file)
        continue
    }
    searchRecur(baseDirPath, file)
}

function searchRecur(baseDirPath, file) {
    let iter = scan(baseDirPath, file)
    for (let { pathFile, stats } of iter) {
        if (stats.isDirectory()) {
            scanFolder(command, pathFile, stats)
        } else {
            grep(command, pathFile)
        }
    }
}

function* scan(rootPath, searchFile,) {
    let files = readdirSync(path.resolve(rootPath))
    for (let file of files) {
        let pathFile = path.resolve(`${rootPath}/${file}`)
        let stats = statSync(pathFile);
        if (wildcard(searchFile, file)) {
            yield { pathFile, stats }
        }

        if (stats.isDirectory()) {
            yield* scan(pathFile, searchFile)
        }
    }
}

