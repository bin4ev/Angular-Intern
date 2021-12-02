class Calculator {
    constructor() {
        this.result = 0
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

    reset(firstNum,secNum,sign) {
        firstNum = 0
        secNum = 0
        sign = ''
    }

    cutString(str) {
        return str.substr(0, result.value.length - 1)
    }

    addEvent(e) {
        let val = e.target
        let result = document.querySelector('span')
        let calc = this.calculate
        let first 
        let sec
        let sign

/*         switch (val.textContent) {
            case 'C':
                result.textContent = 0
                this.reset(first,sec,sign)
                break;
            case '<':
                result.textContent = this.cutString(result.textContent)
                break
            case '+': case '-': case 'x': case '\u00F7':
                first = Number(result.textContent)
                sign = val.textContent
                result.textContent += val.textContent
                break
            case '+/-':
                if (result.textContent > 0) {
                    result.textContent = '-' + result.textContent
                } else {
                    result.textContent = Math.abs(result.textContent)
                }
                break
            case '.':
                result.textContent += val.textContent
                break
            case '=':
                sec = Number(result.textContent[result.textContent.length - 1])
                result.textContent = calc(first,sec,sign)
                this.reset()
                break
            default:
                result.textContent = result.textContent == 0 ?
                    result.textContent = val.textContent : result.textContent += val.textContent
                break
        } */


    }

    createCalc() {
        let container = document.createElement("div");
        container.setAttribute('id', 'container')
        let head = document.createElement("div");
        head.setAttribute('id', 'header')
        let span = document.createElement("span");
        span.textContent = this.result
        head.appendChild(span)
        container.appendChild(head)
        let data1 = ['MC', 'MR', 'M+', 'M-', 'MS', 'M',]
        let data2 = [
            '%', 'CE', 'C', '<', //"\u232b"
            '1/x', 'x2', 'x', '\u00F7',
            '7', '8', '9', 'x',
            '4', '5', '6', '-',
            '1', '2', '3', '+',
            '+/-', '0', '.', '='
        ]
        let wrap = document.createElement("div");
        wrap.setAttribute('id', 'wrap-btns')
        let wraperData1 = document.createElement("div");
        wraperData1.classList.add('wrap-div-btns')
        for (let d of data1) {
            let btn = document.createElement("div");
            btn.classList.add('div-btns')
            if (d == 'M+' || d == 'M-' || d == 'MS') {
                btn.classList.add('div-btns-bold')
            }
            btn.textContent = d
            btn.addEventListener('click', this.addEvent)
            wraperData1.appendChild(btn)
            head.appendChild(wraperData1)
        }
        for (let d of data2) {
            let btn = document.createElement("button");
            if (!isNaN(d)) {
                btn.classList.add('numbers')
            }
            if (d == '+/-' || d == '.') {
                btn.classList.add('symbols')
            }
            if (d == '=') {
                btn.classList.add('equal')
            }
            btn.textContent = d
            btn.addEventListener('click', this.addEvent)
            wrap.appendChild(btn)
        }
        container.appendChild(wrap)
        document.body.appendChild(container)
    }
}

let c = new Calculator()