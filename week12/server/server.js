import { readdir, readFile } from "fs/promises"
import { createServer } from "http"
import { sep } from "path"

async function fetchData(path) {
    try {
        let file = await readdir(baseDirPath + sep + path)
        data = readFile(path + sep + file, 'utf8').then(d => JSON.parse(d))
    } catch (err) {
        console.error(err)
    }
}

function decline(response) {
    response.statusCode = 400
    response.end('resource is forbidden')
}

let baseDirPath = process.cwd()
let data
let objRoute = {'/users': fetchData('users')}
createServer((request, response) => {
    let myurl = new URL(request.url, `http://${request.headers.host}`)
    objRoute[myurl.pathname] || decline(response)
    data.then(d => {
        response.writeHead(200, { "Content-Type": "application/json" })
        if (!myurl.search) {
            response.end(JSON.stringify(d))
            return
        }

        let params = new URLSearchParams(myurl.search);
        response.end(JSON.stringify(d.slice(params.get('start'),params.get('end'))))
    });
}).listen(8000)

console.log('server listen on...');