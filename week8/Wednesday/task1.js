function getElements1(str) {
    function checkAllParent(node, tags) {
        let lastIndex = tags.length - 1
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
        for (let child of node.children) {
            if (tag == child.tagName && checkAllParent(child, tags)) {
                result.push(child)
            }
            scan(child, tag, tags)
        }
    }

    let result = []
    let tagsArr = str.split(' ').map(x => x.toUpperCase())
    let targetEL = tagsArr.pop()
    scan(document.body, targetEL, tagsArr)

    return result
}

let b = getElements1('body  article p a')
console.log(b);


/*
а
p a
p div a
body div p a */