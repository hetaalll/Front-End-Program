import { saveTrip, deleteTrip } from "../src/client/js/app"

//saveTrip tets
describe("Testing saveTrip function", () => {
    test("Testing saveTrip", () => {
        expect(saveTrip).toBeDefined();
    });
});

//deleteTrip test
describe("Testing deleteTrip function", () => {
    test("Testing deleteTrip", () => {
        expect(deleteTrip).toBeDefined();
    });
});
