class Future {
    constructor(init) {
        try {
            init(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(value) {
        if (this.done) {
            return
        }

        /*     queueMicrotask(() => { */
        this.status = 'fullfill'
        this.done = true
        this.result = value

        if (this.saveResponse) {
            this.saveResponse(value)
        }
        /*   }) */
    }

    reject(error) {
        if (this.done) {
            return
        }

        /*    queueMicrotask(() => { */
        this.status = 'reject'
        this.done = true
        this.error = error

        if (this.saveReject) {
            this.saveReject(error)
        }
        /*    }) */
    }

    static resolve(data) {
        return new Future((resolve, reject) => resolve(data))
    }

    static reject(err) {
        return new Future((resolve, reject) => reject(err))
    }

    static all(futures) {
        let results = new Array(futures.length)
        let count = 0;
        return new Future((res, rej) => {
            for (let i = 0; i < futures.length; i++) {
                futures[i].then(result => {
                    results[i] = result;
                    count += 1
                    if (count == values.length) {
                        res(results);
                    }
                }).catch(err => rej(err));
            }

        })
    }

    static allSettled(futures) {
        let results = new Array(futures.length)
        let count = 0;
        return new Future((res, rej) => {
            for (let i = 0; i < futures.length; i++) {
                futures[i].then(result => {
                    results[i] = { status: 'fullfil', value: result }
                    count += 1
                    if (count == futures.length) {
                        res(results);
                    }
                }, error => {
                    results[i] = { status: 'reject', error }
                    count += 1
                    if (count == futures.length) {
                        rej(results);
                    }
                })
            }
        })
    }

    static any(promises) {
        if (!(promises instanceof Array)) {
            promises = [...promises]
        }

        return new Future((res, rej) => {
            
            let result=[]
            for (let i = 0; i < promises.length; i++) {
                let j = i
                promises[i].then()
                    .catch(err => {
                        result[j] = err
                  
                    })
            }
        })
    }

    static race(futures) {
        return new Future((resolve, reject) => {
            for (const f of futures) {
                f.then(resolve, reject)
            }
        })
    }

    then(onSuccess, onError) {
        if (this.result) {
            if (onSuccess) {
                let succResult = onSuccess(this.result)
                return succResult instanceof Future ? succResult : Future.resolve(succResult)
            }
            return Future.resolve(this.result)

        } else if (this.error) {
            if (onError) {
                let errResult = onError(this.error)
                return onError instanceof Future ? errResult : Future.reject(errResult)
            }

        } else {
            this.saveResponse = onSuccess
            this.saveReject = onError
        }
    }

    catch(onError) {
        if (this.error) {
            onError(this.error)
        }
    }
}

/*  function divide(x, y) {
    return new Future((resolve, reject) => {
        if (y == 0)
            throw new Error("divide by 0")
        else
            resolve(x / y)
    })
}

var p1 = divide(25, 0)
    .then(
        value => console.log("result", value),
        error => console.error(error))
  */
/*  var p2 = divide(25, 5)
    .then(value => console.log("result", value))
    .catch(error => console.error(error))
   */
/*  var p3 = divide(25, 5)
    .then(value => value * 2)
    .then(value => console.log("result", value))
    .catch(error => console.error(error))
  */


// queueMicrotask
/* setTimeout(() => console.log("timeout"));

Future.resolve("promise")
    .then((d) => console.log(d));

console.log("code");

 */
//all Exampale
/* const promise1 = Future.resolve('2');
const promise3 = Future.reject('err')



Future.allSettled([promise1, promise3])
    .then(value => console.log(value[0], value[1]))
    .catch(err => console.log(err[0], err[1])) */

const promise1 = new Future((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const promise2 = new Future((resolve, reject) => {
    setTimeout(reject, 400, 'two');
});

Future.any([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
}).catch(err => console.log(err))