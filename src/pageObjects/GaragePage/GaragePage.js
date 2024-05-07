import BasePage from "../BasePage.js";
import { SideBar } from "./components/SideBar.js";
import Header from "../../components/Header.js";

export default class GaragePage extends BasePage {
    constructor(page) {
        super(page, "/panel/garage");
        this.titleGaragePage = page.locator('h1', { hasText: 'Garage' });
        this.sideBar = new SideBar(page); // Here, use SideBar directly instead of this.sideBar
        this.header = new Header(page);
        this.profileBtnInHeader = page.getByRole('button', {name: 'My profile'});
    }

    async navigate() {
        await this._page.goto(this._url);
    }

    async presentProfile() {
        // Add logic to present the user's profile here
        // For example, clicking on the profile button in the header
        await this.header.clickProfileButton();
        // Optionally, return any relevant information about the profile
    }
}
