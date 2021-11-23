function checkStrings(string, char) {
    return string.includes(char)
}

function checkStrings(str1, str2, index = 0) {
    if (index == str1.length) {
        return true
    }

    if (str1.length == str2.length) {
        if (!checkStrings(str2, str1[index])) {
            return false
        }

        if (!checkStrings(str1, str2[index])) {
            return false
        }
       
    } 
        if (str1.length < str2.length) {
            [str1, str2] = [str2, str1]
        }
        if (!checkStrings(str2, str1[index])) {
            return false
        }
        
    

    return checkStrings(str1, str2, index += 1)
}
let a = checkStrings("aba", "abc")
console.log(a);
/*
"abc", "cba" => true
"abc", "ab" => false
"ababc", "abcccc" => true */