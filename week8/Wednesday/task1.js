function getElements1(str) {
    function checkAllParent(node, tags) {
        let lastIndex = tags.length - 2
        while (lastIndex >= 0) {
            if (node.parentNode.nodeName != tags[lastIndex]) {
                return false
            }

            node = node.parentNode
            lastIndex--
        }

        return true 
    }

    function scan(node, tag, tags) {

        for (let child of node.children ) {
            if (tag == child.tagName) {
                if (checkAllParent(child,tags)) {
                    result.push(child)
                }
            }
            scan(child, tag, tags)
        }

    }

    let result = []
    let tagsArr = str.split(' ').map(x => x.toUpperCase())
    let targetEL = tagsArr[tagsArr.length - 1]
    scan(document.body, targetEL, tagsArr)

    return result
}
let b = getElements1('a')
console.log(b);


/*
а
p a
p div a
body div p a */