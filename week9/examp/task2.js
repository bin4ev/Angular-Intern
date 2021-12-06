function findElements(str) {
    function checkAllParent(node, tags) {
        main: for (let i = tags.length - 1; i >= 0; i--) {
            if (tags[i] == '>') {
                if (node.parentNode.nodeName == tags[i - 1]) {
                    continue
                }
            }
            
            while (node) {                          //one loop
                if (node.nodeName == tags[i]) {
                    continue main
                }
                node = node.parentNode
            }
            return false
        }
        return true
    }

    function scan(node, tags) {
        if (checkAllParent(node, tags)) {
            result.push(node)
        }

        for (let child of node.children) {
            scan(child, tags)
        }
    }

    let result = []
    let tagsArr = str.toUpperCase().split(' ')
    scan(document.body, tagsArr)

    return result
}

let b = findElements('body p > a')
console.log(b);
/* а
p a
p div > a
body > div p a */