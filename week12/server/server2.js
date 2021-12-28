import { createWriteStream, readFileSync, readdirSync } from "fs"
import { readFile, writeFile } from "fs/promises"
import { createServer } from "http"
import { sep } from "path"

class HttpServer {
    constructor(params) {
        this.getHandler = {
            '/users/': getData,
        }
        this.postHandler = {
            '/users/': createUser 
        }
        this.putHandler = {}
        this.deleteHandler = {}

        this.objRouter = {
            'GET': this.getHandler,
            'POST': this.postHandler,
            'PUT': this.putHandler,
            'DELETE': this.deleteHandler
        }
    }

    start(port = 8000) {
        createServer((request, response) => {
            let requestHandler = this.getRequestHandler(request.method, request.url)
            if (requestHandler) {
                requestHandler(request, response)
            } else {
                this.notAllowed(response)
            }
        }).listen(port, () => {
            console.log('server listen on...');
        })
    }

    notAllowed(res) {
        res.statusCode = 400
        res.end('Invalid Method !')
    }

    getRequestHandler(method, path) {
        return this.objRouter[method][path]
    }

    get(path, f) {
        this.getHandler[path] = f
    }

    post(path, f) {
        this.postHandler[path] = f
    }

    put(path, f) {
        this.putHandler[path] = f
    }

    delete(path, f) {
        this.deleteHandler[path] = f
    }
}

let data
let baseDirPath = process.cwd()
let file = readdirSync(baseDirPath + sep + 'users')
let filePath = 'users' + sep + file

function getBodyReq(req) {
    let newUserData = ''
    return new Promise((res, rej) => {
        req.on('data', chunk => {
            newUserData += chunk;
        })
        req.on('end', () => res(JSON.parse(newUserData)))
    })
}

function getData(req, res) {
    data = JSON.parse(readFileSync(filePath, 'utf8'))
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(data))
}

function getDataById(req, res) {
    let id = req.url.match(/[0-9]+/g)
    readFile(filePath)
        .then(data => JSON.parse(data))
        .then(users => {
            let user = users.find(user => user.id == id)
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(user))
        })
        .catch(console.error())
}

async function createUser(req, res) {
    let newUserData = await getBodyReq(req)
    readFile(filePath)
        .then(data => JSON.parse(data))
        .then(users => {
            users.push(newUserData)
            return JSON.stringify(users)
        })
        .then(users => {
            writeFile(filePath, users)
        })
        .catch(console.error())
}

async function updateUser(req, res) {
    let newUserData = await getBodyReq(req)
    let id = req.url.match(/[0-9]+/g)[0]
    readFile(filePath)
        .then(data => JSON.parse(data))
        .then(users => {
            users = users.map(user => user = user.id == id ? newUserData : user)
            return JSON.stringify(users)
        })
        .then(users => {
            writeFile(filePath, users)
        })
        .catch(console.error())
}

 function deleteUser(req, res) {
    let id = req.url.match(/[0-9]+/g)
    readFile(filePath)
        .then(data => JSON.parse(data))
        .then(users => {
            let index = users.findIndex(user => user.id == id)
            if(index > -1) {
                users.splice(index,1)
            }
            return JSON.stringify(users)
        })
        .then(users => {
            writeFile(filePath, users)
        })
        .catch(console.error())
}


let server = new HttpServer()
server.get('/users/1', getDataById)

server.post('/users', (req, res) => createUser)
server.put('/users/151', updateUser)
server.delete('/users/153', deleteUser)

server.start(8000) 