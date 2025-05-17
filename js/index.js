console.log("hi javascript")
// console.log("globalThis",globalThis.Array["from"] === Array.from)
 const arr = ["one", "two", "two","one"]
console.log("arr", arr)
const set = new Set(arr) // removes duplicates
console.log(set === set) // true
console.log(typeof set) // object

const map = new Map()
const obj = {
    one: 1,
    two: 2
}
console.log("map : ", map)

for (key in obj) {
    map.set(key, obj[key])
}

console.log("map", map)
console.log(map.get("one")) // 1
console.log(map.clear())
console.log(map)


const number = [1,2,3,4]
const newNumber = number.map((n) => {
    return n * 2;
})
console.log("newNumber", newNumber) // [2,4,6,8]

function multiply(n){
    console.log("n", n)
    return n * 10;
}

const newNumber2 = number.map(multiply)
console.log("newNumber2", newNumber2) // [10,20,30,40];

const newMap = new Map()
console.log(newMap)

// console.log("newMap", newMap) // Map(3) { 1 => undefined, 2 => undefined, 3 => undefined }
