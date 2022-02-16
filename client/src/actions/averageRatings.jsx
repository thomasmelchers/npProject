const averageRatings = (array) => {
let nbRatings = array.length
let result = 0
let i
for (i=0; i<array.length ; i++){
    result += array[i] 
}
return result/nbRatings
}

export default averageRatings