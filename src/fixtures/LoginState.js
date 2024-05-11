import { expect as baseExpect, test as base } from "@playwright/test";
import { WelcomePage } from "../pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import { user_storage_state_path } from "../constant.js";

export const test = base.extend({
    welcomePage: async ({ page }, use) => {
        const welcomePage = new WelcomePage(page);
        await use(welcomePage);
    },
    garagePage: async ({ browser }, use) => {
        const ctx = await browser.newContext({
            storageState: user_storage_state_path
        });
        const page = await ctx.newPage();
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
    }
});

export const expect = baseExpect;