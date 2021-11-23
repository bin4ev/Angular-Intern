function task2(stringOne, stringTwo) {
    let result = '';
    
    for (let i = 0; i < stringOne.length; i++) {
        const element = stringOne[i];
        let indexOfStr = stringTwo.indexOf(element)

        if (indexOfStr > -1) {
            if (!result.includes(element)) {
                result += element;
            }

        }

    }
    console.log(result);

}

task2("aabdc", "deaaf")