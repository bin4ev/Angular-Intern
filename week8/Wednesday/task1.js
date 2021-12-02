function getElements1(str) {
    function checkAllParent(node, tags) {
        main: for (let i = tags.length - 1; i >= 0; i--) {
            while (node) {
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
        for (let child of node.children) {

            if (checkAllParent(child, tags)) {
                result.push(child)
            }
            scan(child, tags)

            while(child){
                if (checkAllParent(child, tags)) {
                    result.push(child)
                }

            }
        }
    }

    let result = []
    let tagsArr = str.split(' ').map(x => x.toUpperCase())
    scan(document.body, tagsArr)

    return result
}

let b = getElements1('body p a')
console.log(b);


/*
а
p a
p div a
body div p a */