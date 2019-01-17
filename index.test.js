const {multiply, faultyMultiply} = require('./index')

test('Multiplication of 3 and 5', () => {
    expect(multiply(3, 5)).toBe(15)
})

test('Faulty multiply of 3 and 5', () => {
    expect(faultyMultiply(3, 5)).toBe(15)       // example of a multiplication function that is wrong
                                                // caught by tests
})