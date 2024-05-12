import BaseComponent from "../../../components/BaseComponent.js";

export class SignUpPopup extends BaseComponent {
    constructor(page) {
        super(page, page.locator('app-signup-modal'));
        this._nameInputSelector = '#signupName';
        this._lastNameInputSelector = '#signupLastName';
        this._emailInputSelector = '#signupEmail';
        this._passwordInputSelector = '#signupPassword';
        this._repeatPasswordInputSelector = '#signupRepeatPassword';
        this._borderColorSelector = '.is-invalid';

        this.titlePopup = this.container.locator('.modal-title');

        this.nameInput = this.container.locator(this._nameInputSelector);
        this.nameInputErrorMsg = this.container.locator(`${this._nameInputSelector} + .invalid-feedback`);

        this.lastNameInput = this.container.locator(this._lastNameInputSelector);
        this.lastNameInputErrorMsg = this.container.locator(`${this._lastNameInputSelector} + .invalid-feedback`);

        this.emailInput = this.container.locator(this._emailInputSelector);
        this.emailInputErrorMsg = this.container.locator(`${this._emailInputSelector} + .invalid-feedback`);

        this.passwordInput = this.container.locator(this._passwordInputSelector);
        this.passwordInputErrorMsg = this.container.locator(`${this._passwordInputSelector} + .invalid-feedback`);

        this.repeatPasswordInput = this.container.locator(this._repeatPasswordInputSelector);
        this.repeatPasswordInputErrorMsg = this.container.locator(`${this._repeatPasswordInputSelector} + .invalid-feedback`);

        this.registerBtn = this.container.locator('button', { hasText: 'Register' });

        this.errorBorder = this.container.locator(this._borderColorSelector);
    }
}
