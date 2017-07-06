/**
 * Created by jiachenpan on 16/11/18.
 */
export function formatDate (time) {
    let date = new Date(time)
    let Y, M, D, h, m, s
    Y = date.getFullYear() + '-'
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' '
    h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
    m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':'
    s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds())
    return Y+M+D+h+m+s
}

export function param (json) {
    if (!json) return ''
    return cleanArray(Object.keys(json).map(key => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })).join('&')
}

export function scrollTo (element, to, duration) {
    if (duration <= 0) return
    const difference = to - element.scrollTop
    const perTick = difference / duration * 10
    setTimeout(() => {
        console.log(new Date())
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) return
        scrollTo(element, to, duration - 10)
    }, 10)
}
