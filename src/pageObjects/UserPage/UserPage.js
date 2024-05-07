import BaseComponent from '../../components/BaseComponent.js';
import RemovePopup from './../SettingsPage/components/RemovePopUp.js';

export default class SettingsPage extends BaseComponent {
    _removeMyAccountBtnSelector = 'button:has-text("Remove my account")';

    constructor(page) {
        super(page);
        this.removeMyAccountBtn = page.locator(this._removeMyAccountBtnSelector);
    }

    async openRemovePopup() {
        await this.removeMyAccountBtn.click();
        return new RemovePopup(this._page);
    }
}