// This is our internal price per gallon rate without any service fee
const BaseFuelCostPerGallon = 2

class FuelQuote
{
    requested_date
    address
    city
    state
    gallons_requested
    delivery_date
    total_price

    constructor (address, city, state, gallons_requested, delivery_date)
    {
        this.requested_date = new Date()
        this.address = address
        this.city = city
        this.state = state
        this.gallons_requested = gallons_requested
        this.delivery_date = delivery_date
        this.BaseFuelCost = 0
        this.service_fee = 0
        this.total_price = 0

    }
    
    calcTotalPrice(customer_fuel_quotes)
    {
        this.BaseFuelCost = BaseFuelCostPerGallon * this.gallons_requested
        // assignment1.docx listed this variable as the profit_margin but I renamed it to service_fee
        this.service_fee = 0.15

        // out of state users will recieve an increased service fee
        if (this.state != "TX")
        {
            this.service_fee += 0.03
        }

        // if customer_fuel_quotes >= 1 then this is a returning customer and they get a lower service fee
        if(customer_fuel_quotes.length >= 1)
        {
            this.service_fee -= 0.03
        }

        // if number of gallons requested reach a certain threshold lower the service_fee
        if (this.gallons_requested >= 1000)
        {
            this.service_fee -= 0.05
        }
        else if(this.gallons_requested >= 500)
        {
            this.service_fee -= 0.03
        }
        else if(this.gallons_requested >= 100)
        {
            this.service_fee -= 0.01
        }

        this.total_price = this.BaseFuelCost + (this.BaseFuelCost * this.service_fee)
        this.service_fee = parseFloat(this.service_fee*100).toFixed(2)+"%"
    }

    // Use for unit testing
    checkEquals(address, state, gallons_requested, delivery_date, total_price) 
    {
        let flag = true
        if (address != this.address)
        {
            console.log("address mismatch");
            flag = false
        }
        if (state != this.state)
        {
            console.log("State mismatch");
            flag = false
        }
        if (gallons_requested != this.gallons_requested)
        {
            console.log("Gallons requested mismatch");
            flag = false
        }
        if (delivery_date != this.delivery_date)
        {
            console.log("Delivery date mismatch");
            flag = false
        }
        if (total_price != this.total_price)
        {
            console.log("Total price mismatch");
            flag = false
        }

        if(flag)
        {
            console.log("Is Equals");
        }
        return flag
    }

}

module.exports.FuelQuote = FuelQuote