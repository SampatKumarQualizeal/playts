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
      const firstName = objContactData.First_name;
      const lastName = objContactData.Middle_name;

      await contacts.navigateToContacts();

      // Step 1 :  Try to Create Contact with First Name more than max length
      objContactData.First_name = contacts.generateString(applicationconstants.contactFirstNameMaxLength + 1);

      await applicationGeneric.clickOnCreate();

      await contacts.enterDetails(objContactData);

      await contacts.save();

      await contacts.verifyCompanyFieldLength(applicationconstants.errorMessageForContactFirstName);

      // Step 2 :  Try to Create Contact with Last Name more than max length
      await contacts.reload();

      objContactData.First_name = firstName;

      objContactData.Last_name = contacts.generateString(applicationconstants.contactLastNameMaxLength + 1);

      await contacts.enterDetails(objContactData);

      await contacts.save();

      await contacts.verifyCompanyFieldLength(applicationconstants.errorMessageForContactLastName);

      // Step 3 :  Try to Create Contact with Middle Name more than max length
      await contacts.reload();

      objContactData.First_name = firstName;

      objContactData.Last_name = lastName;

      objContactData.Middle_name = contacts.generateString(applicationconstants.contactMiddleNameMaxLength + 1);

      await contacts.enterDetails(objContactData);

      await contacts.save();

      await contacts.verifyCompanyFieldLength(applicationconstants.errorMessageForContactMiddleName);
    });
  });
});
