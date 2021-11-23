function task1() {
    for (let i = 1; i <= 100; i++) {

        if (i % 15 == 0) {
            console.log('github');
        } else if (i % 3 == 0) {
            console.log('git');
        } else if (i % 5 == 0) {
            console.log('hub');
        } else {
            console.log(i);
        }

    };

};


task1();