Array.prototype.remove = function (f) {
    let deleteCount = 0;
    let count = 0;
    for (let index = 0; index < this.length; index++) {
        if (f(this[index])) {
            deleteCount++
        }else{
            this[count] = this[index]
            count++
        }
    } 
   this.length -= deleteCount
}

var a = [6, 1, 2, 3, 8, 10, 20, 7, 12]
a.remove(e => e % 2 == 0)
console.log(a)// [1, 3, 7]