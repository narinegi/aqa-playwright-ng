import BaseComponent from "../../components/BaseComponent.js";
import { SignInPopup } from "./components/SignInPopUp.js";
import BasePage from "../BasePage.js";

export class WelcomePage extends BasePage {
    constructor(page) {
        super(page, "/");
        this.signUpBtn = page.locator('button', { hasText: 'Sign up' });
        this.signInBtn = page.locator('button', { hasText: 'Sign in' });
    }
    async navigate() {
        await this._page.goto(this._url);
    }

    async openSignInPopup() {
        await this.signInBtn.click();
        return new SignInPopup(this._page);
    }
}
