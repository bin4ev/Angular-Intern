function task3(arrNum) {

let result =[]
     for (let i = 1; i <=5; i++) {

         let newArr=arrNum.filter(el=>el==i)
         newArr.forEach(element => {
             result.push(element)
         });
       
     }
     console.log(result);

       
}

task3([,1, 3, 1,, 2, 5, 2, 1, 3])