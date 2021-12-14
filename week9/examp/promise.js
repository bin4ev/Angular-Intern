class Future {
    constructor(init) {
        init(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve(value) {
        if (this.done) {
            return
        }

        if (this.saveResponse) {
            this.saveResponse(value)
            return
        }

        this.done = true
        this.result = value
    }

    reject(error) {
        if (this.done) {
            return
        }

        if (this.saveReject) {
            this.saveReject(error)
            return
        }

        this.done = true
        this.error = error
    }

    then(onSuccess, onError) {
        if (this.result) {
            onSuccess(this.result)
        } else if (this.error) {
            onError(this.error)
        } else {
            this.saveResponse = onSuccess
            this.saveReject = onError
        }
    }
}

function divide(x, y) {
    return new Future((resolve, reject) => {
        if (y === 0) {
            setTimeout(() => {
                reject("division by zero")
            }, 2000)
            return
        }

        setTimeout(() => {
            var result = x / y
            resolve(result)
        }, 2000)
    })
}

var p = divide(25, 0).then(
    value => console.log("result", value),
    error => console.error(error)
)