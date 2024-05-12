
// SideBar.js
import BaseComponent from "../../../components/BaseComponent.js";
import SettingsPage from "../../SettingsPage/SettingsPage.js";

export class SideBar extends BaseComponent {
    constructor(page) {
        super(page, page.locator('nav'));
        this.sideBarMenuSettings = page.locator('.sidebar_btn', { hasText: 'Settings' });
    }

    async openSettingsPage() {
        await this.sideBarMenuSettings.click();
        return new SettingsPage(this._page);
    }
}