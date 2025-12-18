import test from '../../fixtures/fixture';
import * as locators from "../../page_objects/locators";
import * as companiesLocators from "../../page_objects/companies_locators";
import * as commonLocators from "../../page_objects/common_locators";
import * as configprop from "../../utils/config_prop";
import dataHandling from "../../utils/data_handling";

const objReadData: any = new dataHandling();


test.describe('@contact Create Contact', () => {
    test('Create Contact', async ({ applicationGeneric, loginPage, contacts }: any) => {
        const objContactData: any = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx", "Contacts", "TC-01");

        await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => {

            await loginPage.login(configprop.UserName, configprop.PassWord);

            await loginPage.verifyLoginIsSuccessful();

            // await applicationGeneric.selectValueFromAutoCompleteSearch(companiesLocators.txtTags,"Demo deal",10);

            // await applicationGeneric.selectItemFromDropdown(companiesLocators.btnPriority,commonLocators.listDropDown,"Medium");

            // await playwrightUtil.waitForSomeTime(10);


        })

        await test.step(`Create Contact`, async () => {

            await contacts.navigateToContacts();

            await contacts.createContact(objContactData);

            await contacts.navigateToContacts();

            let contactFullName = objContactData.First_name + " " + objContactData.Last_name;

            if (objContactData.Middle_name) {
                contactFullName = objContactData.First_name + " " + objContactData.Middle_name + " " + objContactData.Last_name;
            }

            await contacts.verifyCreatedContact(contactFullName);


        })
        await test.step(`delete and purge`, async () => {
            let contactFullName = objContactData.First_name + " " + objContactData.Last_name;

            if (objContactData.Middle_name) {
                contactFullName = objContactData.First_name + " " + objContactData.Middle_name + " " + objContactData.Last_name;
            }

            await contacts.deleteAndPurge(contactFullName);
        })

    });
});
