import fetch from "node-fetch"
import { createWriteStream } from "fs"

class Curl {
    constructor(map) {
        this.command = map.get('command')
        this.url = new URL(map.get('url'))
        this.fileName = map.get('fileName')
        this.headers = map.get('header')
        this.body = map.get('body')
        if (this.command == '-X') {
            this.method = map.get('method')
        }
        this.getRequest()
    }

    getRequest() {
        let writeStream
        let value = this.method
        let body
        if (this.body) {
            body = JSON.stringify(this.decodeQuery(this.body))
            value = "POST"
        }

        fetch(this.url.href, { method: value, headers:this.headers, body })
            .then(res => { //method Class
                switch (this.command) {
                    case '-I':
                        console.log(res.headers.raw())
                        break
                    case '-O':
                        let fileName = this.getFileName()
                        writeStream = createWriteStream(`./public/${fileName}.json`)
                        res.body.pipe(writeStream)
                        break
                    case '-o':
                        writeStream = createWriteStream(`./public/${this.fileName}`)
                        res.body.pipe(writeStream)
                        console.log(`File with name ${this.fileName} is written.`)
                        break
                    case '-i':
                        console.log(res.headers.raw());
                        res.body.pipe(process.stdout)
                        break
                    default:
                }
            })
            .catch(console.error())
    }

    getFileName() {
        let pathName = this.url.pathname
        let idx = pathName.lastIndexOf('/')
        return pathName.slice(idx)
    }

    decodeQuery(query) {
        let params = {}
        let paramsArr = query.split('&')
        for (let p of paramsArr) {
            let [key, value] = p.split('=')
            key = decodeURIComponent(key)
            value = decodeURIComponent(value)
            params[key] = value
        }
        return params
    }
}

//set
let validMethods = new{   
    GET: true,
    POST: true,
    DELETE: true,
    PUT: true
}

function validateUrl(str) {
    return new URL(str)
}
function validateMethod(method) {
    if (!validMethods[method]) {
        throw 'Invalid method!'
    }

    return method
}

let args = process.argv.slice(2);
let map = new Map()
try {  //func
    switch (args[0]) {
        case '-o':
            if (validateUrl(args[1])) {
                throw 'missing params'
            }
            map.set('command', args[0])
            map.set('fileName', args[1])
            break;
        case '-O': case '-I': case '-i':
            map.set('command', args[0])
            break;
        case '-H':
            if (validateUrl(args[1])) { //checkUrl
                throw 'missing params'
            }
            map.set('command', args[0])
            map.set('header', args[1])
            break;
        case '-X':
            if (validateUrl(args[1])) {
                throw 'missing params'
            }
            map.set('command', args[0])
            map.set('method', validateMethod(args[1].toUpperCase()))
            break
        case '-d':
            if (validateUrl(args[1])) {
                throw 'missing params'
            }
            map.set('command', args[0])
            map.set('body', args[1])
            break
        default:
            throw 'invalid command'

    }
    map.set('url', args[args.length - 1]) //check url
    let curl = new Curl(map)
    console.log(curl);
} catch (error) {
    console.error(error);
}

/*'https://api.instantwebtools.net/v1/passenger?page=0&size=10' */
