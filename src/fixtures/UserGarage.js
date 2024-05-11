import { expect as baseExpect, test as base } from "@playwright/test";
import { WelcomePage } from "../pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import { loginData } from "../testData/loginData.js";

export const test = base.extend({
    garagePage: async ({ page }, use) => {
        const welcomePage = new WelcomePage(page);
        await welcomePage.navigate();
        const signInPopup = await welcomePage.openSignInPopup();
        await signInPopup.emailInput.fill(loginData.email);
        await signInPopup.passwordInput.fill(loginData.password);
        await signInPopup.logInButton.click();

        await expect(page).toHaveURL(/garage/);
        const garagePage = new GaragePage(page);

        await use(garagePage);
    }
});

export const expect = baseExpect;