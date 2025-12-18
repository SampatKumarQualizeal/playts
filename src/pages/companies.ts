import { Page, expect } from "@playwright/test";
import * as locators from "../page_objects/locators";
import * as commonLocators from "../page_objects/common_locators";
import * as login from "../page_objects/login";
import ApplicationGeneric from "./application_generic"
import * as configprop from "../utils/config_prop";
import * as companiesLocators from "../page_objects/companies_locators";
import * as applicationconstants from "../utils/application_constants";
import { text } from "stream/consumers";

class Companies extends ApplicationGeneric {
    constructor(page: Page) {
        super(page);
    }

    async navigateToCompanies(): Promise<void> {
        this.selectEntity(configprop.NavCompanies);
    }

    async verifyCreatedCompany(companyName: any): Promise<void> {
        this.checkRecordDisplayed(companyName);
    }

    async enterCompanyName(companyName: any): Promise<void> {
        if (companyName != undefined)
            await this.fillInputBox(companiesLocators.txtName, companyName);
    }

    async enterCompanyStreetAddress(streetAddress: any): Promise<void> {
        if (streetAddress != undefined)
            await this.fillInputBox(companiesLocators.txtStreetAddress, streetAddress);
    }


    async enterCompanyCity(city: any): Promise<void> {
        if (city != undefined)
            await this.fillInputBox(companiesLocators.txtCity, city);
    }

    async enterCompanySateNCountry(stateNCountry: any): Promise<void> {
        if (stateNCountry != undefined)
            await this.fillInputBox(companiesLocators.txtStateNCountry, stateNCountry);
    }

    async enterCompanyPostCode(postCode: any): Promise<void> {
        if (postCode != undefined)
            await this.fillInputBox(companiesLocators.txtPostCode, postCode);
    }

    async enterCompanyAddressCountry(addressCountry: any): Promise<void> {
        if (addressCountry != undefined)
            await this.selectItemFromDropdown(companiesLocators.btnAddressCountry, commonLocators.listDropDown, addressCountry);
    }
    async enterEmail(objCompanyData: any): Promise<void> {
        if (objCompanyData.Email != undefined) {
            await this.fillInputBox(companiesLocators.txtEmail, objCompanyData.Email);
            await this.fillInputBox(companiesLocators.txtEmailType, objCompanyData.EmailType);
            await this.clickOnElement(companiesLocators.btnEmailAdd);
        }
    }
    async enterPhone(objCompanyData: any): Promise<void> {
        if (objCompanyData.Phone != undefined) {
            await this.fillInputBox(companiesLocators.txtPhoneNumber, objCompanyData.Number);
            await this.fillInputBox(companiesLocators.txtHomeNWorkNmobile, objCompanyData.PhoneType);
            await this.clickOnElement(companiesLocators.btnPhoneAdd);
        }
    }
    async enterTags(tags: any): Promise<void> {
        if (tags != undefined) {
            await this.selectValueFromAutoCompleteSearch(companiesLocators.txtTags, tags, 10);
        }
    }
    async enterDescription(description: any): Promise<void> {
        if (description != undefined) {
            await this.fillInputBox(companiesLocators.txtDescription, description);
        }
    }
    async enterIndustry(Industry: any): Promise<void> {
        if (Industry != undefined) {
            await this.fillInputBox(companiesLocators.txtIndustry, Industry);
        }
    }

    async enterNoOfEmp(NoOfEmp: any): Promise<void> {
        if (NoOfEmp != undefined) {
            await this.fillInputBox(companiesLocators.txtNoOfEmployees, NoOfEmp);
        }
    }

    async enterStockSymbol(StockSymbol: any): Promise<void> {
        if (StockSymbol != undefined) {
            await this.fillInputBox(companiesLocators.txtStockSymbol, StockSymbol);
        }
    }

    async enterAnnualRevenue(AnnualRevenue: any): Promise<void> {
        if (AnnualRevenue != undefined) {
            await this.fillInputBox(companiesLocators.txtAnnualRevenue, AnnualRevenue);
        }
    }

    async setPriority(Priority: any): Promise<void> {
        if (Priority != undefined) {
            await this.selectItemFromDropdown(companiesLocators.btnPriority, commonLocators.listDropDown, Priority);
        }
    }

    async setStatus(Status: any): Promise<void> {
        if (Status != undefined) {
            await this.selectItemFromDropdown(companiesLocators.btnStatus, commonLocators.listDropDown, Status);
        }
    }

    async setSource(Source: any): Promise<void> {
        if (Source != undefined) {
            await this.selectItemFromDropdown(companiesLocators.btnSource, commonLocators.listDropDown, Source);
        }
    }

    async setCategory(Category: any): Promise<void> {
        if (Category != undefined) {
            await this.selectItemFromDropdown(companiesLocators.btnCategory, commonLocators.listDropDown, Category);
        }
    }

    async enterVATNumber(VATNumber: any): Promise<void> {
        if (VATNumber != undefined) {
            await this.fillInputBox(companiesLocators.txtVatNumber, VATNumber);
        }
    }

    async enterIdentifier(Identifier: any): Promise<void> {
        if (Identifier != undefined) {
            await this.fillInputBox(companiesLocators.txtIdentifier, Identifier);
        }
    }


    async enterDetails(objCompanyData: any): Promise<void> {

        await this.enterCompanyName(objCompanyData.Name);
        await this.enterCompanyStreetAddress(objCompanyData.StreetAddress);
        await this.enterCompanyCity(objCompanyData.City);
        await this.enterCompanySateNCountry(objCompanyData.SateNCountry);
        await this.enterCompanyPostCode(objCompanyData.PostCode);
        await this.enterEmail(objCompanyData);
        await this.enterPhone(objCompanyData);
        await this.enterTags(objCompanyData.Tags);
        await this.enterDescription(objCompanyData.Description);
        await this.enterIndustry(objCompanyData.Industry);
        await this.enterNoOfEmp(objCompanyData.NoOfEmp);
        await this.enterStockSymbol(objCompanyData.StockSymbol);
        await this.enterAnnualRevenue(objCompanyData.AnnualRevenue);
        await this.setPriority(objCompanyData.Priority);
        await this.setStatus(objCompanyData.Status);
        await this.setSource(objCompanyData.Source);
        await this.setCategory(objCompanyData.Category);
        await this.enterVATNumber(objCompanyData.VATNumber);
        await this.enterIdentifier(objCompanyData.Identifier);

    }

    async save(): Promise<void> {
        await this.clickOnElement(commonLocators.btnSave);
        await this.wait();
    }

    async createCompany(objCompanyData: any): Promise<void> {
        await this.clickOnCreate();

        await this.enterDetails(objCompanyData);

        //after filling data

        await this.save();
        await this.waitForSomeTime(2);

    }



    async editCompany(strCompany: any, objCompanyData: any): Promise<void> {
        await this.selectEntity(configprop.NavCompanies);

        await this.performTableOperation(strCompany, configprop.operationEditType);

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.createCompany(objCompanyData);

    }

    async deleteAndPurge(cName: any): Promise<void> {

        await this.deleteRecord(cName);

        await this.waitForSomeTime(2);

        await this.checkRecordNotDisplayed(cName);

        await this.rubbishBin("Company", cName, "Purge", "OK");

        await this.checkRecordNotDisplayed(cName);

        await this.waitForSomeTime(2);
    }

    async verifyMandatoryField(text: any): Promise<void> {
        await this.verifyToHaveText(commonLocators.inLineErrMsg, text);
    }

    async verifyCompanyFieldLength(text: any): Promise<void> {
        await this.verifyToHaveText(commonLocators.lengthErrorMsg, text);
    }

}
export default Companies;
