import { USER_RANKS } from "./constants"

const serverHttp = `${import.meta.env.VITE_SERVER_ADDRESS}:${import.meta.env.VITE_SERVER_PORT}`

const romanMap = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I"
}

const keys = Object.keys(romanMap)
const revKeys = keys.reverse()
const mapLen = keys.length

export async function fetchRequest(endpoint, type = "GET", body = {}) {
    return await fetch(serverHttp + endpoint, {
        method: type,
        headers: type == "POST" || type == "PATCH" ? {
            "Content-Type": "application/json"
        } : undefined,
        body: type == "POST" || type == "PATCH" ? JSON.stringify(body) : undefined
    })
}

export function setCookie(cname, cvalue, exhours) {
    const d = new Date()
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000))
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

export function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export function convertToRoman(num) {
    let base = num
    let romans = []
    let index = 0

    while (index < mapLen && base > 0) {
        let val = revKeys[index]

        if (base >= val) {
            romans.push(romanMap[val])
            base -= val
            index = 0
            continue
        }

        index++
    }

    return romans.join("")
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day

    return [year, month, day].join('-')
}

export function calculateRank(donations) {
    if (donations > 11) return `${USER_RANKS.RESOURCEWISE_EXPERT}`

    const rankIndex = donations == 0 ? 0 : Math.floor(donations / 3)
    const rank = Array.from(Object.values(USER_RANKS))[rankIndex]
    const level = (donations % 3) + 1

    return `${rank} ${convertToRoman(level)}`
}