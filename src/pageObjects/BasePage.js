import Header from "../components/Header.js";

export default class BasePage {
    constructor(page, url) {
        this._page = page;
        this._url = url;
        this.header = new Header(page);


    }
}