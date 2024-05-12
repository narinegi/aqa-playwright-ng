import { expect, test } from "@playwright/test";
import { WelcomePage } from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {test_data as testData, test_data} from "../../src/testData/testData.js";

test.describe("New User Registration", () => {
    let popup;

    test.beforeEach(async ({ page }) => {
        const welcomePage = new WelcomePage(page);
        await welcomePage.navigate();
        popup = await welcomePage.openSignUpPopup();
    });


    test.describe("Negative scenario - email input field", () => {

        test("Empty email input field validation", async () => {

            await popup.emailInput.focus();
            await popup.emailInput.blur();
            await popup.nameInput.fill(testData.positive_scenario.name);
            await popup.lastNameInput.fill(testData.positive_scenario.lastName);
            await popup.passwordInput.fill(testData.positive_scenario.password);
            await popup.repeatPasswordInput.fill(testData.positive_scenario.password);

            await expect(popup.emailInputErrorMsg).toContainText('Email required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Short length - email input field validation", async () => {

            await popup.emailInput.fill(testData.negative_length.shortValue);
            await popup.nameInput.fill(testData.positive_scenario.name);
            await popup.lastNameInput.fill(testData.positive_scenario.lastName);
            await popup.passwordInput.fill(testData.positive_scenario.password);
            await popup.repeatPasswordInput.fill(testData.positive_scenario.password);

            await expect(popup.emailInputErrorMsg).toContainText('Email is incorrect');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });


        test("Invalid Email - negative validation - 1", async () => {

            await popup.emailInput.fill(testData.invalid_email.invalidEmail);
            await popup.nameInput.fill(testData.positive_scenario.name);
            await popup.lastNameInput.fill(testData.positive_scenario.lastName);
            await popup.passwordInput.fill(testData.positive_scenario.password);
            await popup.repeatPasswordInput.fill(testData.positive_scenario.password);

            await expect(popup.emailInputErrorMsg).toContainText('Email is incorrect');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });


        test("Invalid Email - negative validation - 2", async () => {

            await popup.emailInput.fill(testData.invalid_email.notEnglishValue);
            await popup.nameInput.fill(testData.positive_scenario.name);
            await popup.lastNameInput.fill(testData.positive_scenario.lastName);
            await popup.passwordInput.fill(testData.positive_scenario.password);
            await popup.repeatPasswordInput.fill(testData.positive_scenario.password);

            await expect(popup.emailInputErrorMsg).toContainText('Email is incorrect');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });
    });
});
