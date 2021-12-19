import { createReadStream } from "fs"
import { createServer } from "http"
import { resolve, sep } from "path"

createServer((request, response) => {
    let baseDir = process.cwd();
    let myurl = new URL(request.url, `http://${request.headers.host}`)
    let pathname = myurl.pathname.split('/')
    let path = resolve(...pathname);
    if (!path.startsWith(baseDir + sep)) {
        response.statusCode = 400
        response.end('resource is forbidden')
        return
    }

    response.writeHead(200, { "Content-Type": "text/plain" });
    createReadStream(path).pipe(response)
}).listen(8000);
console.log('server listen on...');
