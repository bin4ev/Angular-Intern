function arrRange(array) {
    function compareArr(arr1, arr2) {
        let result = []
        if (arr1[1] < arr2[0] || arr2[1] < arr1[0]) {
            return false
        }
        result.push(Math.min(arr1[0], arr2[0]))
        result.push(Math.max(arr1[1], arr2[1]))

        /*         if (arr1[0] <= arr2[0] && arr1[1] >= arr2[1] ||
                    arr1[0] >= arr2[0] && arr1[1] <= arr2[1]) {
        
                  
                    } */
        return result

    }

    for (let i =0; i<array.length; i++) {
        const el = array[i];
         for (let j = i+1; j < array.length-1; j++) {
            let mergeArr = compareArr(el, array[j])
            if (mergeArr) {
                array[j]=mergeArr
            }

        }
    


    }


}
let a = arrRange([[1, 2], [4, 8], [3, 4], [2, 5], [56, 57]])
console.log(a);