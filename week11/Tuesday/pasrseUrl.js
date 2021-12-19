let defaultPorts = {
    "http:": 80,
    "https:": 443,
    "ftp:": 21
}

function extractPort(hostname, protocol) {
    let startPortIdx = hostname.indexOf(':')
    let port
    if (startPortIdx > -1) {
        port = hostname.slice(startPortIdx + 1)
        hostname = hostname.slice(0, startPortIdx)

        return { port, hostname }
    }
    port = defaultPorts[protocol]

    return { port, hostname }
}

function extractUserAndPass(strHost) {
    let [paramsOrHost, hostname] = strHost.split('@')
    if (hostname) {
        let [username, password] = paramsOrHost.split(':')
        return { username, password, hostname }
    }

    hostname = paramsOrHost
    return { hostname }
}

function parseUrl(address) {
    let [scheme, _, host, ...rest] = address.split('/')
    if (!defaultPorts[scheme]) {
        throw 'Invalid protocol'
    }

    let username = ''
    let password = ''
    let extractedObj = extractUserAndPass(host)
    if (extractedObj[username]) {
        username = extractedObj[username]
        password = extractedObj[password]
    }

    let { port, hostname } = extractPort(extractedObj.hostname, scheme)
    let restPartUrl = [...rest].join('/')
    let [pathname, query] = restPartUrl.split('?')
    pathname = `/${pathname}`
    if (!query) {
        query = ''
        return { scheme, hostname, pathname, query, port, username, password}
    }

    let params = {}
    let paramsArr = query.split('&')
    for (let p of paramsArr) {
        let [key, value] = p.split('=')
        key = decodeURIComponent(key)
        value = decodeURIComponent(value)
        params[key] = value
    }

    query = `?${query}`
    return { scheme, hostname, pathname, query, port, params, username, password }
}

let url1 = `https://anonymous:flabada@developer.mozilla.org/en-US/docs/Web/API/URL/password`
let url2 = 'https://anonymous:flabada@developer.mozilla.org/en-US/docs/Web/API/URL/password'
var urlParams2 = parseUrl(url1)
console.log(urlParams2)
parseWithClassURL(url1)
/*
https://developer.mozilla.org
https://developer.mozilla.org/en-US/docs/Learn/
https://developer.mozilla.org/en-US/search?q=URL
https://anonymous:flabada@developer.mozilla.org/en-US/docs/Web/API/URL/password

{
    scheme: 'https',
    hostname: "eloquentjavascript.net",
    path: "/20_node.html",g
    port: 80,
    query: page=0&size=10,
    params : {
        page : 0
        size : 10
    },
    username,
    password
 
  } */


function parseWithClassURL(url1) {
    let myUrl = new URL(url1)
    let params = {}
    console.log(myUrl.password)
    console.log(myUrl.username);
    let valuesIter = myUrl.searchParams.values()
    for (let key of myUrl.searchParams.keys()) {
        params[key] = valuesIter.next().value
    }

    console.log(Object.entries({
        scheme: myUrl.protocol,
        hostname: myUrl.hostname,
        pathname: myUrl.pathname,
        query: myUrl.search,
        port: 443,
        params

    }).forEach((e) => {
        console.log(`key=>${e[0]} value=>${e[1]}`);
    }));

}

/* function parseUrl2(address) {
    let keyArr = ['scheme', 'hostname', 'pathname', 'query']
    let result = {}
    let str = ''
    let countIdx
    let j = 0
    for (let i = 0; i < address.length; i++) {
        const el = address[i];
        if (el != '/') {
            str += el
            continue
        }

        if (countIdx == i - 1) {
            continue
        }

        countIdx = i
        result[keyArr[j]] = str
        str = ''
        j++
    }

    result[keyArr[j]] = str
    let [restStr, query] = str.split('?')

    if (query) {
        result[keyArr[j]] = `?${query}`
        result['pathname'] = `/${result['pathname']}/${restStr}`
    }


    let resObj = extractPort(result.hostname, result.scheme)

    return Object.assign(result, resObj)
}

 */

