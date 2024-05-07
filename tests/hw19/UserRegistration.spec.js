import { expect, test } from "@playwright/test";
import { WelcomePage } from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import { test_data } from "../../src/testData/testData.js";
import GaragePage from "../../src/pageObjects/GaragePage/GaragePage.js";
import SettingsPage from "../../src/pageObjects/SettingsPage/SettingsPage.js";
import RemoveUserPopup from "../../src/pageObjects/SettingsPage/components/RemovePopUp.js";
import {SideBar} from "../../src/pageObjects/GaragePage/components/SideBar.js";
test.describe("New User Registration", () => {
    let popup;

    test.beforeEach(async ({ page }) => {
        const welcomePage = new WelcomePage(page);
        await welcomePage.navigate();
        popup = await welcomePage.openSignUpPopup();
    });

    test.afterEach(async ({ page }) => {
        const garagePage = new GaragePage(page);
        const settingsPage = new SettingsPage(page);
        const removeUserPopup = new RemoveUserPopup(page);
        const sideBar = new SideBar(page);

        await garagePage.navigate();
        await expect(garagePage.profileBtnInHeader).toBeVisible();
        await expect(garagePage.titleGaragePage).toContainText('Garage');

        await sideBar.openSettingsPage();
        await expect(settingsPage.removeUserBlock).toBeVisible();

        await settingsPage.removeUserAction();
        await expect(removeUserPopup.removeUserBtn).toBeVisible();
        await expect(removeUserPopup.cancelDeleteUserBtn).toBeVisible();
        await expect(removeUserPopup.removePopupTitle).toContainText('Remove account');
        await removeUserPopup.confirmDeleteUser();
    });

    test("User should be able to register", async ({ page }) => {
        await expect(popup.titlePopup).toContainText('Registration');
        await popup.nameInput.fill(test_data.positive_scenario.name);
        await popup.lastNameInput.fill(test_data.positive_scenario.lastName);
        await popup.emailInput.fill(test_data.positive_scenario.email);
        await popup.passwordInput.fill(test_data.positive_scenario.password);
        await popup.repeatPasswordInput.fill(test_data.positive_scenario.password);
        await popup.registerBtn.click();

        await expect(page).toHaveURL('/panel/garage');
    });
});
