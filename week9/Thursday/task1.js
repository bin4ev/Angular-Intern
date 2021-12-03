function promiseResolve(data) {
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 2000);
    })

    return p
}

promise = promiseResolve('hello from Promise')
promise.then(d => console.log(d))


function promiseReject(error) {
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(error)
        }, 2000);
    })
    return p
}

promise2 = promiseReject('oppps Error')
promise2.then(
    d => console.log(d),
    err => console.log(err)
)


