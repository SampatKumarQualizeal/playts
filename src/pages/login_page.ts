import { Page, expect } from "@playwright/test";
import * as locators from "../page_objects/locators";
import * as commonLocators from "../page_objects/common_locators";
import * as login from "../page_objects/login";
import playwrightUtil from "../utils/playwright_util";
import ApplicationGeneric from "./application_generic"
import * as configprop from "../utils/config_prop";

class LoginPage extends ApplicationGeneric {
    constructor(page: Page) {
        super(page);
    }

    async login(strUserName: any, strPassword: any): Promise<void> {
        await this.open(configprop.URL);

        await this.waitForPageLoadDomcontentloaded();

        await this.fillInputBox(login.txtEmail, strUserName);

        await this.fillInputBox(login.txtPassword, strPassword);

        await this.clickOnElement(login.btnLogin);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

    }

    async verifyLoginIsSuccessful(): Promise<void> {
        await this.verifyElementAttached(commonLocators.lnkHome);
    }

    async logout(): Promise<void> {
        await this.clickOnElement(commonLocators.btnTopHeaderMenuSettings);

        await this.clickOnElement(login.btnLogout)
    }


}
export default LoginPage;
