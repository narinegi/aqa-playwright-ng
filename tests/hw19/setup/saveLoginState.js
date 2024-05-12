import { test, expect } from "@playwright/test";
import { WelcomePage } from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import { user_storage_state_path } from "../../src/constant.js";
import { loginData } from "../../../src/testData/loginData.js";

test.describe('Setup', () => {
        test("Login and Save as test user", async ({page}) => {
                const welcomePage = new WelcomePage(page);
                await welcomePage.navigate();
                const signInPopup = await welcomePage.openSignInPopup();
                await signInPopup.emailInput.fill(loginData.email);
                await signInPopup.passwordInput.fill(loginData.password);
                await signInPopup.logInButton.click();

                await expect(page).toHaveURL(/garage/);

                // Set storage state
                await page.context().storageState({
                        path: user_storage_state_path
                });
        });
});
