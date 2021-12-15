let url1 = 'https://api.instantwebtools.net/v1/passenger?page=0&size=10'
let defaultPorts = {
    "http:": 80,
    "https:": 443,
    "ftp:": 21
}

function parseWithClassURL(url1) {
    let myUrl = new URL(url1)
    
    return {
        scheme: myUrl.protocol,
        hostname: myUrl.hostname,
        pathname: myUrl.pathname,
        search: myUrl.search,
        port: 443,
    }
    
}

function test(addr, expected) {
    let res = parseUrl2(addr)
    if (JSON.stringify(res) != JSON.stringify(expected)) {
        console.log(`URL:${addr} => expected ${expected} but got ${res}`)
    } else {
        console.log('all done !');
    }
}

let expected = parseWithClassURL(url1)
test(url1, expected)

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

function parseUrl(address) {
    let [scheme, _, host, ...rest] = address.split('/')
    let { port, hostname } = extractPort(host, scheme)
    let restPartUrl = [...rest].join('/')
    let [pathname, search] = restPartUrl.split('?')
    pathname = `/${pathname}`
    if (search) {
        search = `?${search}`
        return { scheme, hostname, pathname,search, port }
    }

    return { scheme, hostname, pathname, port }
}

function parseUrl2(address) {
    let keyArr = ['scheme', 'hostname', 'pathname', 'search']
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

    if (str) {
        let [restStr, search] = str.split('?')
        result[keyArr[j]] = `?${search}`
        result['pathname'] = `/${result['pathname']}/${restStr}`
    }
    let resObj = extractPort(result.hostname, result.scheme)

    return Object.assign(result, resObj)
}


var urlParams = parseUrl(url1)
var urlParams2 = parseUrl2(url1)
console.log(urlParams)
console.log(urlParams2)
/*
{
    scheme: 'https',
    hostname: "eloquentjavascript.net",
    path: "/20_node.html",g
    method: "GET",
    port: 80,
    headers: {Accept: "text/html"}
  } */
