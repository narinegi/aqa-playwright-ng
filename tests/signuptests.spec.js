import signupData from '../../src/signupData/positive.js';
import {
    emailDetails,
    firstNameDetails,
    lastNameDetails,
    passwordConfirmation,
    passwordDetails
} from "../../src/signupData/negative.js";
import {expect, test} from "@playwright/test";

// Positive cases
test.describe('Successful Registration', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('Signup Successful Test Scenario', async ({ page }) => {
        const signupPopup = page.locator('app-signup-modal');
        const invalidField = signupPopup.locator('div.invalid-feedback');
        const registerBtn = page.locator('button', { hasText: 'Register' });

        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        await signUpBtn.click();
        await expect(signupPopup).toBeVisible();

        for (const [fieldName, value] of Object.entries(signupData)) {
            const fieldLocator = signupPopup.locator(`#signup${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`);
            await fieldLocator.fill(value);
            await expect(fieldLocator, `Filled in value should be '${value}'`).toHaveValue(value);
            if (fieldName === 'repeatPassword') {
                await expect(registerBtn, 'Register button should be enabled').toBeEnabled();
            } else {
                await expect(registerBtn, 'Register button should be disabled').toBeDisabled();
            }
        }

        await expect(invalidField).toBeHidden();
        await registerBtn.click();
        await expect(page).toHaveURL('/panel/garage');
        const pageAfterSignup = page.locator('div.panel-layout');
        await expect(pageAfterSignup).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        const settingsBtn = page.locator('a[routerLink=settings]');
        await settingsBtn.click();
        const removeMyAccountBtn = page.locator('button', { hasText: 'Remove my account' });
        await removeMyAccountBtn.click();
        const removePopup = page.locator('app-remove-account-modal');
        await expect(removePopup).toBeVisible();
        const removeBtn = page.locator('div.modal-footer button', { hasText: 'Remove' });
        await removeBtn.click();
        await expect(page).toHaveURL('');
        const pageBeforeSignup = page.locator('div.app-content');
        await expect(pageBeforeSignup).toBeVisible();
    });
});

// Negative cases

test.describe('Negative Sign up ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        const signUpBtn = page.locator('button', { hasText: 'Sign up' });
        await signUpBtn.click();
    });

    test.describe('"Name" input field', () => {
        test('"Name" input field validations', async ({ page }) => {
            const signupPopup = page.locator('app-signup-modal');
            const invalidField = signupPopup.locator('div.invalid-feedback');
            const nameField = signupPopup.locator('#signupName');
            const registerBtn = page.locator('button', { hasText: 'Register' });

            await test.step('Empty "Name" value should give an error', async () => {
                await nameField.focus();
                await nameField.blur();
                await expect(invalidField).toHaveText('Name required');
                await expect(registerBtn).toBeDisabled();
            });

            await test.step('Invalid "Name" error', async () => {
                for (const [fieldName, value] of Object.entries(firstNameDetails)) {
                    await nameField.fill(value);
                    await expect(nameField, `Value should be '${value}'`).toHaveValue(value);

                    if (fieldName === 'shortValue' || fieldName === 'longValue') {
                        await expect(invalidField).toHaveText('Name has to be from 2 to 20 characters long');
                    } else if (fieldName === 'LongInvalidValue') {
                        await expect(invalidField).toHaveText(/Name is invalid.*Name has to be from 2 to 20 characters long/);
                    } else {
                        await expect(invalidField).toHaveText('Name is invalid');
                    }
                    await expect(registerBtn).toBeDisabled();
                    await nameField.clear();
                }
            });

            await test.step('"Name" input field red border validation', async () => {
                await expect(invalidField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            });
        });
    });

    test.describe('"Last name" input field', () => {
        test('"Last name" scenarios', async ({ page }) => {
            const signupPopup = page.locator('app-signup-modal');
            const invalidField = signupPopup.locator('div.invalid-feedback');
            const lastNameField = signupPopup.locator('#signupLastName');
            const registerBtn = page.locator('button', { hasText: 'Register' });

            await test.step('Empty "Last name"', async () => {
                await lastNameField.focus();
                await lastNameField.blur();
                await expect(invalidField).toHaveText('Last name required');
                await expect(registerBtn).toBeDisabled();
            });

            await test.step('Invalid "Last name" error', async () => {
                for (const [fieldName, value] of Object.entries(lastNameDetails)) {
                    await lastNameField.fill(value);
                    await expect(lastNameField, `Value should be '${value}'`).toHaveValue(value);

                    if (fieldName === 'shortValue' || fieldName === 'longValue') {
                        await expect(invalidField).toHaveText('Last name has to be from 2 to 20 characters long');
                    } else if (fieldName === 'LongInvalidValue') {
                        await expect(invalidField).toHaveText('Last name has to be from 2 to 20 characters long');

                    } else {
                        await expect(invalidField).toHaveText('Last name is invalid');
                    }
                    await expect(registerBtn).toBeDisabled();
                    await lastNameField.clear();
                }
            });

            await test.step('"Last Name" input field border', async () => {
                await expect(invalidField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            });
        });
    });

    test.describe('"Email" input field', () => {
        test('"Email" input field scenarios', async ({ page }) => {
            const signupPopup = page.locator('app-signup-modal');
            const invalidField = signupPopup.locator('div.invalid-feedback');
            const emailField = signupPopup.locator('#signupEmail');
            const registerBtn = page.locator('button', { hasText: 'Register' });

            await test.step('Empty "Email" validation', async () => {
                await emailField.focus();
                await emailField.blur();
                await expect(invalidField).toHaveText('Email required');
                await expect(registerBtn).toBeDisabled();
            });

            await test.step('Invalid "Email" validation', async () => {
                for (const [fieldName, value] of Object.entries(emailDetails)) {
                    await emailField.fill(value);
                    await expect(emailField, `Value should be '${value}'`).toHaveValue(value);

                    await expect(invalidField).toHaveText('Email is incorrect');
                    if (fieldName === 'invalidValue7') {
                    }

                    await expect(registerBtn).toBeDisabled();
                    await emailField.clear();
                }
            });

            await test.step('"Email" input field border', async () => {
                await expect(invalidField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            });
        });
    });

    test.describe('"Password" input field', () => {
        test('"Password" input field', async ({ page }) => {
            const signupPopup = page.locator('app-signup-modal');
            const invalidField = signupPopup.locator('div.invalid-feedback');
            const passwordField = signupPopup.locator('#signupPassword');
            const registerBtn = page.locator('button', { hasText: 'Register' });

            await test.step('Empty "Password" input field value', async () => {
                await passwordField.focus();
                await passwordField.blur();
                await expect(invalidField).toHaveText('Password required');
                await expect(registerBtn).toBeDisabled();
            });

            await test.step('Incorrect "Password" error ', async () => {
                for (const [fieldName, value] of Object.entries(passwordDetails)) {
                    await passwordField.fill(value);
                    await expect(passwordField, `Value should be '${value}'`).toHaveValue(value);

                    await expect(invalidField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                    if (fieldName === 'longValue') {
                    }

                    await expect(registerBtn).toBeDisabled();
                    await passwordField.clear();
                }
            });

            await test.step('"Password" input field border', async () => {
                await expect(invalidField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            });
        });
    });

    test.describe('"Re-enter password" ', () => {
        test('"Re-enter password" scenarios', async ({ page }) => {
            const signupPopup = page.locator('app-signup-modal');
            const invalidField = signupPopup.locator('div.invalid-feedback');
            const repeatPasswordField = signupPopup.locator('#signupRepeatPassword');
            const registerBtn = page.locator('button', { hasText: 'Register' });

            await test.step('Empty "Re-enter password" error', async () => {
                await repeatPasswordField.focus();
                await repeatPasswordField.blur();
                await expect(invalidField).toHaveText('Re-enter password required');
                await expect(registerBtn).toBeDisabled();
            });

            await test.step('Invalid "Re-enter password" error', async () => {
                for (const [fieldName, value] of Object.entries(passwordConfirmation)) {
                    await repeatPasswordField.fill(value);
                    await expect(repeatPasswordField, `Value should be '${value}'`).toHaveValue(value);
                    if (fieldName === 'passwordsDoNotMatch') {
                        await expect(invalidField).toHaveText('Passwords do not match');
                    } else {
                        await expect(invalidField).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
                    }
                    await expect(registerBtn).toBeDisabled();
                    await repeatPasswordField.clear();
                }
            });

            await test.step('"Re-enter password" input field border', async () => {
                await expect(invalidField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            });
        });
    });
});