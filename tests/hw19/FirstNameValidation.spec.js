import { expect, test } from "@playwright/test";
import { WelcomePage } from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import { test_data } from "../../src/testData/testData.js";


test.describe("New user Registration", () => {
    let popup;

    test.describe("Negative scenario - name input field", () => {
        test.beforeEach(async ({ page }) => {
            const welcomePage = new WelcomePage(page);
            await welcomePage.navigate();
            popup = await welcomePage.openSignUpPopup();
        });

        test("Empty input field - negative validation", async () => {
            await popup.nameInput.focus();
            await popup.nameInput.blur();
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.nameInputErrorMsg).toContainText('Name required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Short length - negative validation", async () => {
            await popup.nameInput.fill(test_data.negative_length.shortValue);
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.nameInputErrorMsg).toContainText('Name has to be from 2 to 20 characters long');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Negative - validation length", async () => {
            await popup.nameInput.fill(test_data.negative_length.longValue);
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.nameInputErrorMsg).toContainText('Name has to be from 2 to 20 characters long');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Negative scenario -name field validation1", async () => {
            await popup.nameInput.fill(test_data.negative_name.incorrectNameValue1)
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.nameInputErrorMsg).toContainText('Name is invalid');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Negative scenario -name field validation2", async () => {
            await popup.nameInput.fill(test_data.negative_name.incorrectNameValue2)
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.nameInputErrorMsg).toContainText('Name is invalid');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

    })

})
