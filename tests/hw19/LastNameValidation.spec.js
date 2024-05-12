import { expect, test } from "@playwright/test";
import { WelcomePage } from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import { test_data } from "../../src/testData/testData.js";

test.describe("New user Registration", () => {
    let popup;

    test.beforeEach(async ({ page }) => {
        const welcomePage = new WelcomePage(page);
        await welcomePage.navigate();
        popup = await welcomePage.openSignUpPopup();
    });

    test.describe("Negative- Last name field validation", () => {
        test("Empty field - negative validation", async () => {
            await popup.lastNameInput.focus();
            await popup.lastNameInput.blur();
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.lastNameInputErrorMsg).toContainText('Last name required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Short Length - validation", async () => {
            await popup.lastNameInput.fill(test_data.negative_length.shortValue);
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.lastNameInputErrorMsg).toContainText('Last name has to be from 2 to 20 characters long');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Length validation", async () => {
            await popup.lastNameInput.fill(test_data.negative_length.longValue);
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.lastNameInputErrorMsg).toContainText('Last name has to be from 2 to 20 characters long');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Negative scenario - validation for last name input field tc1", async () => {
            await popup.lastNameInput.fill(test_data.negative_name.incorrectNameValue1);
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.lastNameInputErrorMsg).toContainText('Last name is invalid');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Negative scenario - validation for last name input field tc2", async () => {
            await popup.lastNameInput.fill(test_data.negative_name.incorrectNameValue2);
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.lastNameInputErrorMsg).toContainText('Last name is invalid');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });
    });
});
