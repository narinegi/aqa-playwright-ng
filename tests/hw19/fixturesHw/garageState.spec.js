import { test, expect } from '../../../src/fixtures/LoginState.js';
import { car } from "../../../src/testData/Car.js";

test.describe('Garage (storage state)', () => {

    test('Add car button should be displayed', async ({ garagePage }) => {
        await expect(garagePage.addCarButton).toBeVisible();
    });

    test.only('New car should be add for already log in user', async ({ garagePage }) => {
        const existingCarsQuantity = await garagePage.getExistingCarsCount();

        const addCarPopup = await garagePage.openAddCarPopup();
        await expect(addCarPopup.addCarPopupTitle).toContainText('Add a car');
        await addCarPopup.selectAddCarBrand.selectOption(CAR_DATA.brand);
        await addCarPopup.selectAddCarModel.selectOption(CAR_DATA.model);
        await addCarPopup.imputAddCarMileage.fill(CAR_DATA.miles);
        expect(addCarPopup.submitNewCarButton).toBeVisible();

        const carPromise = garagePage.page.waitForResponse("/api/cars");
        await addCarPopup.submitNewCarButton.click();
        await carPromise;
        const result = await garagePage.getExistingCarsCount();
        expect(result).toBe(existingCarsQuantity + 1);

    });

});
