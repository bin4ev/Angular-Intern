class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x <= y; x++) {
                this.content[y * width +x] = element(x, y);
            }
        }
    }

    toString() {
        let str = ''
        for (let i = 0; i < this.content.length; i++) {
            if (i % this.width == 0) {
                str += '\n'
            }
            str += this.content[i] + ' '
        }
        return str
    }
}


let fillMatrix = (x, y) => 1
let fillMatrix1 = (x, y) => x + y
let fillMatrix2 = (x, y) => x === y ? 1 : 0
let fillMatrix3 = (x, y) => x === y ? x + 1 : 0
let fillMatrix4 = (x, y) => x > y ? 1 : (x < y ? -1 : 0)
let fillMatrix5 = (x, y) => x === y ? 0 : (x > y ? x - y : y - x)
let str = '0123456789abcdef'
let fillMatrix6 = (x, y) => str[y * 4 + x]
let m = new Matrix(4, 4, fillMatrix)
console.log(m.toString())
