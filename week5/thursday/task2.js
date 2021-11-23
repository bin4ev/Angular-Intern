function sorting(arr) {
    for (let i = 1; i < arr.length; i++) {
        let el = arr[i]
        for (let j = 0; j < arr.length; j++) {
            let saveEl = arr[i];
            if (arr[i] < arr[j]) {
                arr[i] = arr[j];
                arr[j] = saveEl
            }
        }
    }
    return arr;
}

 let a = sorting([4, 2, 3, 1,0])
console.log(a); 
