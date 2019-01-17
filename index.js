function multiply(a, b) {
    return a * b
}

function faultyMultiply(a, b){
    return a + b
}

module.exports = {
    multiply,
    faultyMultiply
}