import {SignUpPopup} from "./components/SignUp.js";
import BasePage from "../BasePage.js";



export class WelcomePage extends BasePage {
    constructor(page) {
        super(page, "/");
        this.signUpBtn = page.locator('button', { hasText: 'Sign up' });
    }

    async navigate() {

        await this._page.goto(this._url);
    }

    async openSignUpPopup() {
        await this.signUpBtn.click();
        return new SignUpPopup(this._page);
    }
}