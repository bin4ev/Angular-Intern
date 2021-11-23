class NumberSet {
    constructor(capacity) {
        this.content = []
        this.capacity = capacity
    }

    add(n) {
        if (this.content.length < this.capacity) {
            this.content.push(n)
        }
    }

    delete(n) {
        this.content = this.content.filter(e => e != n)
    }

    has(n) {
        return this.content.includes(n)
    }

    size() {
        return this.content.length
    }

    clear() {
        this.content.length = 0
    }

    values() {
        return this.content
    }

    equals(set2) {
        for (let el of this.content) {
            if (!set2.has(el)) {
                return false
            }
        }
        return true
    }

    toString() {
        return `{${this.content.toString()}}`
    }
}


let set = new NumberSet(256)
let set2 = new NumberSet(256)
set2.add(1)
set2.add(2)
set.add(1)
set.add(2)
var a = set.values() // [1, 2]

console.log(set.equals(set2))
console.log('set -> ' + set.toString())
console.log('set2-> ' + set2.toString());
/* // {1, 2}
set.delete(2)
console.log(set.content)
// {1}
set.clear()
console.log(set.content)
// {} */

//console.log(set.equals(new Set([1, 2, 3]))); 