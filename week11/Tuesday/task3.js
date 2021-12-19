import { request } from "http"

async function fetch1(url) {
  let myUrl = new URL(url)
  let objUrl = {
    hostname: myUrl.hostname,
    path: myUrl.pathname,
    port : myUrl.port
  }

  request( Object.assign(objUrl,{ method: "POST", headers: { Accept: "text/plain" }})
    , response => {
     response.on('data', chunck => (chunck.toString()))
    }).end('opaa')
}

let url = /* 'https://eloquentjavascript.net/20_node.html' */'http://localhost:8000'
let result = fetch1(url)
result.then(console.log())
.catch(console.error())


