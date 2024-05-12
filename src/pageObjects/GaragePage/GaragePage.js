import BasePage from "../BasePage.js";
import { SideBar } from "./components/SideBar.js";
import Header from "../../components/Header.js";
import { AddCarPopup } from "./components/AddCar.js";
import BaseComponent from "../../components/BaseComponent.js";

export default class GaragePage extends BasePage {
    constructor(page) {
        super(page);
        this.titleGaragePage = page.locator('h1', { hasText: 'Garage' });
        this.sideBar = new SideBar(this._page);
        this.header = new Header(this._page);
        this.addCarButton = page.getByRole('button', { name: 'Add car' });
        this.existingCarsList = page.locator('.car-list .car-item');
    }

    async openAddCarPopup() {
        await this.addCarButton.click();
        return new AddCarPopup(this._page);
    }

    async getExistingCarsCount() {
        return await this.existingCarsList.count();
    }
}
