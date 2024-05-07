import { expect, test } from "@playwright/test";
import { WelcomePage } from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {test_data} from "../../src/testData/testData.js";

test.describe("New User Registration", () => {
    let popup;
    const errorText = "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

    test.describe("Negative cases for Password field", () => {
        test.beforeEach(async ({ page }) => {
            const welcomePage = new WelcomePage(page);
            await welcomePage.navigate();
            popup = await welcomePage.openSignUpPopup();
        });

        test("Empty password input field - negative", async () => {
            await popup.passwordInput.focus();
            await popup.passwordInput.blur();
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);

            await expect(popup.passwordInputErrorMsg).toContainText('Password required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Repeat password - negative validation", async () => {
            await popup.repeatPasswordInput.focus();
            await popup.repeatPasswordInput.blur();
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.passwordInput.fill(test_data.positive_scenario.password);

            await expect(popup.repeatPasswordInputErrorMsg).toContainText('Re-enter password required');
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Invalid password- negative scenario", async () => {
            await popup.passwordInput.fill(test_data.invalid_password.invalidPasswordData);
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.repeatPasswordInput.fill(test_data.invalid_password.invalidPasswordData);

            await expect(popup.passwordInputErrorMsg).toContainText(errorText);
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Short password - negative validation", async () => {
            await popup.passwordInput.fill(test_data.negative_length.shortValue);
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.repeatPasswordInput.fill(test_data.invalid_password.invalidPasswordData);

            await expect(popup.passwordInputErrorMsg).toContainText(errorText);
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Invalid password - numbers validation", async () => {
            await popup.passwordInput.fill(test_data.invalid_password.onlyNumbers);
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.repeatPasswordInput.fill(test_data.invalid_password.onlyNumbers);

            await expect(popup.passwordInputErrorMsg).toContainText(errorText);
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });

        test("Password doesnt match - negative scenario", async () => {
            await popup.passwordInput.fill(test_data.positive_scenario.password);
            await popup.nameInput.fill(test_data.positive_scenario.name);
            await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
            await popup.emailInput.fill(test_data.positive_scenario.email);
            await popup.repeatPasswordInput.fill(test_data.invalid_password.passwordMatchFalse);
            await popup.repeatPasswordInput.blur();

            await expect(popup.repeatPasswordInputErrorMsg).toContainText(errorText);
            await expect(popup.errorBorder).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(popup.registerBtn).toBeDisabled();
        });
    });
});
