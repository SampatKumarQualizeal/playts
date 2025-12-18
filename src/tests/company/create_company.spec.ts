// @ts-check
import test from '../../fixtures/fixture';
import * as locators from '../../page_objects/locators';
import * as companiesLocators from '../../page_objects/companies_locators';
import * as commonLocators from '../../page_objects/common_locators';
import * as configprop from '../../utils/config_prop';
import dataHandling from '../../utils/data_handling';
import { chromium } from '@playwright/test';

let objReadData = new dataHandling();

test.describe('@smoke Create Company', () => {
  test('Create Company', async ({ loginPage, companies }) => {
    const objCompanyData = await objReadData.readSingleRowtestdataFromExcel(
      'CRM.xlsx',
      'Companies',
      'TC1'
    );
    //const objCompanyData = objReadData.getData("Company");
    await test.step(`Open the URL and Enter Username and Password & Verify the user is logged in`, async () => {

      await loginPage.login(configprop.UserName, configprop.PassWord);

      await loginPage.verifyLoginIsSuccessful();
    });

    await test.step(`Create Company`, async () => {

      await companies.navigateToCompanies();

      console.log('Navigated to Companies');

      await companies.createCompany(objCompanyData);

      console.log('Created a Company');

      await companies.checkPageHeader(objCompanyData.Name);

      await companies.navigateToCompanies();

      await companies.verifyCreatedCompany(objCompanyData.Name);

      console.log('Navigated to Companies page to verify the created company' + objCompanyData.Name);
    });

    await test.step(`delete and purge`, async () => {

      await companies.deleteAndPurge(objCompanyData.Name);

      console.log('Deleted and purged the created company' + objCompanyData.Name);
    });
  });
});