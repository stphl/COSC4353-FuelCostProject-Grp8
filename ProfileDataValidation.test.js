const validator = require('./ProfileDataValidation.js')

describe (
    'Tests for Profile Data', () => {

        test('Test 1 for field with 9 characters max length requirement', () => {
            expect(
                validator.CheckMaxLength("123456789", 9)
            ).toBeTruthy()
        })

        test('Test 2 for field with 9 characters max length requirement', () => {
            expect(
                validator.CheckMaxLength("12345678910", 9)
            ).toBeFalsy()
        })

        test('Test 1 for field with 50 characters max length requirement', () => {
            expect(
                validator.CheckMaxLength("Peter", 50)
            ).toBeTruthy()
        })

        test('Test 2 for field with 50 characters max length requirement', () => {
            expect(
                validator.CheckMaxLength("AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz", 50)
            ).toBeFalsy()
        })

        test('Test 1 for field with 100 characters max length requirement', () => {
            expect(
                validator.CheckMaxLength("P. Sherman, 42 Wallaby Way, Sydney!", 100)
            ).toBeTruthy()
        })

        test('Test 2 for field with 100 characters max length requirement', () => {
            expect(
                validator.CheckMaxLength("AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvw", 100)
            ).toBeFalsy()
        })

        test('Test 1 for min length - required field', () => {
            expect(
                validator.CheckMinLength("Peter", 0)
            ).toBeTruthy()
        })

        test('Test 2 for min length - required field', () => {
            expect(
                validator.CheckMinLength("", 0)
            ).toBeFalsy()
        })

        test('Test 1 for min length of 5', () => {
            expect(
                validator.CheckMinLength("12345", 4)
            ).toBeTruthy()
        })

        test('Test 2 for min length of 5', () => {
            expect(
                validator.CheckMinLength("1234", 4)
            ).toBeFalsy()
        })

        test('Test 1 for required field', () => {
            expect(
                validator.CheckRequired(null)
            ).toBeFalsy()
        })

        test('Test 2 for required field', () => {
            expect(
                validator.CheckRequired(undefined)
            ).toBeFalsy()
        })

        test('Test 3 for required field', () => {
            expect(
                validator.CheckRequired("Peter")
            ).toBeTruthy()
        })
    }
)