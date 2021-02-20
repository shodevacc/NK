
export const getItem = (name, parse = false) => {
    if (parse)
        return (JSON.parse(localStorage.getItem(name)))
    else
        return ((localStorage.getItem(name)))

}
export const setItem = (name, value) => {
    localStorage.setItem(name, value)
}
export const removeItem = (name) => {
    localStorage.removeItem(name)
}
export const checkItem = (name,checkParsedLength=false) => {
    const item = localStorage.getItem(name,checkParsedLength)
    // if it doesnt exist
    if (item == null || (JSON.parse(item)) == null || item.length == 0 || (checkParsedLength && (JSON.parse(item).length)==0) ) {
        return false
    }
    else {
        return true
    }
}
// null if not there
