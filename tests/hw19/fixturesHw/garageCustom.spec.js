import { test, expect } from '../../../src/fixtures/UserGarage.js';
import { car } from "../../../src/testData/Car.js";

test.describe('Garage custom fixtures', () => {

    test('Add car button should be displayed', async ({ garagePage }) => {
        await expect(garagePage.addCarButton).toBeVisible();
    });

    test('New car should be added for log in user', async ({ garagePage }) => {
        const existingCarsQuantity = await garagePage.getExistingCarsCount();

        const addCarPopup = await garagePage.openAddCarPopup();
        await expect(addCarPopup.addCarPopupTitle).toContainText('Add a car');

        await addCarPopup.selectAddCarBrand.selectOption(car.brand);
        await addCarPopup.selectAddCarModel.selectOption(car.model);
        await addCarPopup.imputAddCarMileage.fill(car.miles);
        expect(addCarPopup.submitNewCarButton).toBeVisible();


        await addCarPopup.submitNewCarButton.click();

        await garagePage.page.waitForResponse("/api/cars");

        const result = await garagePage.getExistingCarsCount();
        expect(result).toBe(existingCarsQuantity + 1);
    });
});
