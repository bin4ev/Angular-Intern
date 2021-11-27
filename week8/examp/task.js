class Calculator {
    constructor(config, data) {
        this.result = 0
        this.config = config
        this.data = data
        this.firstNum
        this.secNum
        this.sign
        this.createCalc()
    }

    calculate(first, sec, sign) {
        let res = 0
        switch (sign) {
            case '+':
                res = first + sec
                break;
            case '-':
                res = first - sec
                break;
            case '*':
                res = first * sec
                break;
            case '/':
                res = first / sec
                break;
            default:
                break;
        }
        return res
    }

    reset() {
        this.firstNum = 0
        this.secNum = 0
        this.sign = ''
    }

    cutString(str) {
        return str.substr(0, result.value.length - 1)
    }



    addEvent(node) {
        node.addEventListener('click', (e) => {
            let val = e.target
            let result = document.querySelector('#result')


            if (val.textContent == 'C') {
                result.value = 0
                this.reset(result)

            } else if (val.textContent == '<') {
                result.value= this.cutString(result.value)
            
            } else if (!isNaN(val.textContent) || val.textContent == '.') {
                if (isNaN(result.value) || result.value == 0) {
                    result.value = ''
                }
                result.value += val.textContent

            } else if (val.textContent !== '=') {
                this.firstNum = Number(result.value)
                this.sign = val.textContent
                result.value = val.textContent

            } else {
                this.secNum = Number(result.value)
                result.value = this.calculate(this.firstNum, this.secNum, this.sign)
                this.reset()
            }
        })
    }

    createCalc() {
        let head = document.createElement("input");
        head.setAttribute('id', 'result')
        head.value = this.result
        document.body.appendChild(head)

        let table = document.createElement("table");
        for (let i = 0; i < this.config.rows; i++) {
            let tr = document.createElement("tr");
            table.appendChild(tr);

            for (data of this.data[i]) {
                let td = document.createElement("td");
                td.textContent = data
                this.addEvent(td)
                tr.appendChild(td);
            }
        }
        document.body.appendChild(table)
    }
}

let data = [
    ['%', 'M+', '<', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['.', '0', 'C', '='],

]
let tableConfig = {
    'rows': 5,
}

let c = new Calculator(tableConfig, data)