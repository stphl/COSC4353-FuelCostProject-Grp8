const validator = require('./RegValidation.js')

describe(
    'Tests for Registration Validation',() =>{

        test('Test 1 for lower upper requirement', () =>{
            expect(
                validator.CheckLowUp("COSC4000")
            ).toBeFalsy()
        })

        test('Test 2 for lower upper requirement', () =>{
            expect(
                validator.CheckLowUp("WorkingPassword")
            ).toBeTruthy()
        })

        test('Test 1 for length requirement', () =>{
            expect(
                validator.CheckLength("WorkingPassword")
            ).toBeTruthy()
        })
        test('Test 2 for length requirement', () =>{
            expect(
                validator.CheckLength("short!")
            ).toBeFalsy()
        })

        test('Test 1 for symbol requirement', () =>{
            expect(
                validator.CheckSymb("WorkingPassword!")
            ).toBeTruthy()
        })
        test('Test 2 for  symbol requirement', () =>{
            expect(
                validator.CheckSymb("nosymbol")
            ).toBeFalsy()
        })

        test('Test 1 for check requirement', () =>{
            expect(
                validator.CheckMatch("WorkingPassword!","WorkingPassword!")
            ).toBeTruthy()
        })
        test('Test 2 for  check requirement', () =>{
            expect(
                validator.CheckMatch("not","equal")
            ).toBeFalsy()
        })


}
)
