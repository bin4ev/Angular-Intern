import { request } from "https"

function fetcAsStream(url) {
    let myUrl = new URL(url)
    Object.assign(myUrl, { path: myUrl.pathname, method: "GET", headers: { Accept: "text/plain" } })

    return new Promise((resolve, reject) => {
        request(myUrl, response => {
                resolve(response)
                response.on('error', err => reject(err))
            }).end()

    })
}

let url = 'https://eloquentjavascript.net/20_node.html' 
let result = fetcAsStream(url)
result.then(response => response.pipe(process.stdout))


