function compare(obj1, obj2) {
    let keysArr1 = Object.keys(obj1)
    let keysArr2 = Object.keys(obj2)
    console.log(keysArr1);

    getKeyFromObjByIndex = (obj1,index) => {
        let arr = obj1.entries()
        for (let i = 0; i < array.length; i++) {
            let kvp= arr[i]
            if (index == i) {
                return kvp[0]
            }
        }
    }
    
    if (keysArr1.length !== keysArr2.length) {
        return false
    }

    for (let i = 0; i < keysArr1.length; i++) {

        let keyElement = keysArr1[i];

        console.log(getKeyFromObjByIndex(obj2,1));
        if (keyElement !== obj2.hasOwnProperty(keyElement)) {
            return false
        }
        let o1 = obj1[keyElement]
        let o2 = obj2[keyElement]
        if (typeof o1 == "object" && typeof o2 == "object") {
            return compare(o1, o2)
        } else {
            if (o1 !== o2) {
                return false
            }
        }
    }

    return true
}


var o1 = { 2: 1, 1: 2, 0: 3 }
var o2 = { 0: 3, 1: 2, 2: 1 }
let a = compare(o1, o2)
console.log(a);                                      // true