import BaseComponent from '../../components/BaseComponent.js';
import RemovePopup from './components/RemovePopup.js';

export default class SettingsPage extends BaseComponent {
    constructor(page) {
        super(page, '/panel/settings');
        this.removeUserBlock = page.locator('.user-settings_form', { hasText: 'Remove account' });
        this.removeUserButton = page.locator('.-remove-account button');
    }

    async removeUserAction() {
        await this.removeUserButton.click();
    }

    async openRemovePopup() {
        await this.removeUserButton.click();
        return new RemovePopup(this.page);
    }
}
