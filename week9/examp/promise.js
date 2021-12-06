class Future {
    constructor(execFn) {
        this.value = ''
        this.status
        execFn(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(val) {
        this.status = 'done'
        this.value = val
    }

    reject(err) {
        this.status = 'rejected'
        this.value = err
    }

    then(res, rej) {
        switch (this.status) {
            case 'done':
                res(this.value)
                break;
            case 'rejected':
                rej(this.value)
                break;
            default:
                break;
        }
    }
}


function divide(x, y) {
    return new Future((resolve, reject) => {
        if (y === 0) {
            reject("division by zero")
            return
        }
        var result = x / y
        resolve(result)
    })
}

var p = divide(25, 5).then(
    value => console.log("result", value),
    error => console.error(error)
)


