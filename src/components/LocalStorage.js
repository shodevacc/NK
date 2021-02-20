const isBrowser = typeof window !== "undefined" //Check if window is avaialble
export const getItem = (name, parse = false) => {
    if (isBrowser&&parse)
        return (JSON.parse(localStorage.getItem(name)))
    else
        return (isBrowser&&(localStorage.getItem(name)))

}
export const setItem = (name, value) => {
    isBrowser&&localStorage.setItem(name, value)
}
export const removeItem = (name) => {
    isBrowser&&localStorage.removeItem(name)
}
export const checkItem = (name,checkParsedLength=false) => {
    const item = isBrowser&&localStorage.getItem(name,checkParsedLength)
    // if it doesnt exist
    if (item == null || (JSON.parse(item)) == null || item.length == 0 || (checkParsedLength && (JSON.parse(item).length)==0) ) {
        return false
    }
    else {
        return true
    }
}
// null if not there
