const FuelQuote = require('./fuel-quote-class.js').FuelQuote

describe("Tests for Fuel Quote Class",()=>{

    test("In state cost for 100 gals for new customer",() =>{
        quote = new FuelQuote("123 Testing Ln", "Houston", "TX", 100,"01/02/34")
        quote.calcTotalPrice(0)
        expect(
            quote.total_price
        ).toBe(228)
    })
    test("In state cost for 1000 gals for new customer",() =>{
        quote = new FuelQuote("123 Testing Ln", "Houston", "TX", 1000,"01/02/34")
        quote.calcTotalPrice(0)
        expect(
            quote.total_price
        ).toBe(2200)
    })
    test("In state cost for 1000 gals for returning customer",() =>{
        quote = new FuelQuote("123 Testing Ln", "Houston", "TX", 1000,"01/02/34")
        quote.calcTotalPrice([1])
        expect(
            quote.total_price
        ).toBe(2140)
    })

    test("Out of state cost for 500 gals for returning customer",() =>{
        quote = new FuelQuote("123 Testing Ln", "Houston", "FL", 500,"01/02/34")
        quote.calcTotalPrice([1])
        expect(
            quote.total_price
        ).toBe(1120)
    })

})