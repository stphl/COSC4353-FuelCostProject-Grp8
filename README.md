# <p align="center"> Fuel Cost Prediction Project </p>
<p align="center"> COSC 4353 - Software Design - Fuel Cost Prediction Project - Group 8 </p>

## ⚝ Group Members
- Jaspreet Singh
- Jesse T Vela
- Rabil S Momin
- Stephany Lopez

## ⚝ Description
Build a software application that will predict the rate of the fuel based on the following criteria:
- Client Location (in-state or out-of-state)
- Client history (existing customer with previous purchase or new)
- Gallons requested
- Company profit margin (%)

### Front end:
- Login (allow client to register if not a client yet)
- Client Registration (username and password)
- Client Profile Management including the following fields: (after client registers they should login first to complete the profile) 
    - Full Name (50 characters, required)
    - Address 1 (100 characters, required)
    - Address 2 (100 characters, optional)
    - City (100 characters, required)
    - State (drop down, selection required - DB will store 2 character state code)
    - Zipcode (9 characters, at least 5 character code required)
    
- Fuel Quote Form with following fields:
    - Gallons Requested (numeric, required)
    - Delivery Address (non-editable, comes from client profile)
    - Delivery Date (calendar, date picker)
    - Suggested Price / gallon (numeric non-editable, price will be calculated by pricing module)
    - Total Amount Due (numeric non-editable, calculated (gallons * price))
    
- Fuel Quote History
    - Tabular display of all client quotes in the past. All fields from Fuel Quote are displayed

### Back end:
- Login module
- Client Profile Management module
- Fuel Quote module, includes list of quote history for a client
- Pricing module

### Database tables:
- UserCredentials (ID and encrypted password)
- ClientInformation
- FuelQuote
- Helper tables like States

### Important deliverables:
- You should have validations in place for required fields, field types, and field lengths
- Backend should retrieve data from DB and display it to front end
- Form data should be populated from backend. Backend should receive data from front end, validate, and persist to DB
- Any new code added should be covered by unit tests. Keep code coverage above 80%

## ⚝ Technologies
- Frontend: [Javascript](https://www.javascript.com/)
- Backend: [Node.js](https://nodejs.org/en)
- Database: [SQLite](https://www.sqlite.org/index.html)

## ⚝ Installation and commands
  - Clone this repository: `git clone https://github.com/stphl/COSC4353-FuelCostProject-Grp8.git`
    
  - Backend: `npm install` to install dependencies and then `npm run devStart` to run to the server

  - Unit tests and code coverage: `npm run test`
    
  - Database:

## ⚝ Demo
- Walk-through video: 

- Screenshots: 