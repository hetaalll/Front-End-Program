import { isValid } from "../src/client/js/validate"

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
        expect(isValid('www.google.com')).toEqual(true);
        expect(isValid('.com')).toEqual(false);
    })
});