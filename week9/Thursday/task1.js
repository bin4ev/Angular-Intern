function promiseResolve(data) {
    return new Promise((resolve) => {
        resolve(data)
    })
}

promise = promiseResolve('hello from Promise')
promise.then(d => console.log(d))


function promiseReject(error) {
    return new Promise((resolve, reject) => {
        reject(error)
    })
}

promise2 = promiseReject('oppps Error')
promise2.then(
        (d) => console.log(d),
        (err) => console.log(err)
    )


