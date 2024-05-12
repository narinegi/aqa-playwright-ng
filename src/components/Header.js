// Header.js
import BaseComponent from "./BaseComponent.js";

export default class Header extends BaseComponent {
    constructor(page) {
        super(page, page.locator('header'));
        // Refine the locator to target the profile button specifically
        this.profileBtnInHeader = page.locator('button[aria-label="My profile"]');
    }

    async clickProfileButton() {
        await this.profileBtnInHeader.click();
    }
}

