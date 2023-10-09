// This is our internal price per gallon rate without any service fee
const BaseFuelCostPerGallon = 2

class FuelQuote
{
    address
    state
    gallons_requested
    delivery_date
    total_price

    constructor (address, state, gallons_requested, delivery_date)
    {
        this.address = address
        this.state = state
        this.gallons_requested = gallons_requested
        this.delivery_date = delivery_date

    }
    
    calcTotalPrice(customer_fuel_quotes)
    {
        BaseFuelCost = BaseFuelCostPerGallon * this.gallons_requested
        // assignment1.docx listed this variable as the profit_margin but I renamed it to service_fee
        service_fee = 0.15

        // out of state users will recieve an increased service fee
        if (state != "TX")
        {
            service_fee += 0.03
        }

        // if customer_fuel_quotes >= 1 then this is a returning customer and they get a lower service fee
        if(length(customer_fuel_quotes) >= 1)
        {
            service_fee -= 0.03
        }

        // if number of gallons requested reach a certain threshold lower the service_fee
        if (this.gallons_requested >= 100)
        {
            service_fee -= 0.01
        }
        else if(this.gallons_requested >= 500)
        {
            service_fee -= 0.03
        }
        else if(this.gallons_requested >= 1000)
        {
            service_fee -= 0.05
        }

        this.total_price = BaseFuelCost + (BaseFuelCost * profit_margin)
    }


}

module.exports.FuelQuote = FuelQuote