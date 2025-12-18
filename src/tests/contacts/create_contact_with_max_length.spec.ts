import test from '../../fixtures/fixture';
import * as locators from "../../page_objects/locators";
import * as companiesLocators from "../../page_objects/companies_locators";
import * as commonLocators from "../../page_objects/common_locators";
import * as configprop from "../../utils/config_prop";
import dataHandling from "../../utils/data_handling";
import { chromium } from '@playwright/test';
import * as applicationconstants from "../../utils/application_constants";

let objReadData = new dataHandling();

test.describe('@contact Create Contact', () => {
  test('Create Contact with max length', async ({ applicationGeneric, loginPage, contacts }: any) => {
    const objContactData = await objReadData.readSingleRowtestdataFromExcel("CRM.xlsx", "Contacts", "TC-01");

    await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => {
      await loginPage.login(configprop.UserName, configprop.PassWord);
      await loginPage.verifyLoginIsSuccessful();
    });

    await test.step(`Create Contact`, async () => {
      await contacts.navigateToContacts();

      // Step 1 : Create Contact with First Name,Last Name, Middle Names Max lengths
      objContactData.First_name = contacts.generateString(applicationconstants.contactFirstNameMaxLength);
      objContactData.Middle_name = contacts.generateString(applicationconstants.contactMiddleNameMaxLength);
      objContactData.Last_name = contacts.generateString(applicationconstants.contactLastNameMaxLength);

      await contacts.createContact(objContactData);

      await contacts.navigateToContacts();

      let contactFullName = objContactData.First_name + " " + objContactData.Last_name;

      if (objContactData.Middle_name) {
        contactFullName = objContactData.First_name + " " + objContactData.Middle_name + " " + objContactData.Last_name;
      }

      await contacts.verifyCreatedContact(contactFullName);
    });

    await test.step(`delete and purge`, async () => {
      let contactFullName = objContactData.First_name + " " + objContactData.Last_name;

      if (objContactData.Middle_name) {
        contactFullName = objContactData.First_name + " " + objContactData.Middle_name + " " + objContactData.Last_name;
      }

      await contacts.deleteAndPurge(contactFullName);
    });
  });
});
