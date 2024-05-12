import { test, expect } from "@playwright/test";
import { profile_test_data } from "../../src/pageObjects/ProfilePage/fixtures/profile_test_data.js";
import GaragePage from "../../src/pageObjects/GaragePage/GaragePage.js";

test.describe('Profile (network)', async () => {
    test('Should mock response body for profile request', async ({ page }) => {
        await page.route('/api/users/profile', async (route) => {
            return route.fulfill({
                status: 200,
                body: JSON.stringify(profile_test_data)
            });
        });

        const garagePage = new GaragePage(page);
        const sideBar = await garagePage.sideBar;
        const profilePage = await sideBar.openProfilePage();
        await expect(profilePage.titleProfilePage).toHaveText('Profile');
        await expect(profilePage.editProfileButton).toBeVisible();
        await expect(profilePage.profileFullName).toHaveText(`${profile_test_data.data.name} ${profile_test_data.data.lastName}`);
    });
});
