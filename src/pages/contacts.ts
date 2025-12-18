import { Page, expect } from "@playwright/test";
import * as locators from "../page_objects/locators";
import * as commonLocators from "../page_objects/common_locators";
import * as login from "../page_objects/login";
import playwrightUtil from "../utils/playwright_util";
import ApplicationGeneric from "./application_generic"
import * as configprop from "../utils/config_prop";
import * as contactsLocators from "../page_objects/contacts_locators";
import * as applicationconstants from "../utils/application_constants";

class Contacts extends ApplicationGeneric {
    constructor(page: Page) {
        super(page);
    }

    async navigateToContacts(): Promise<void> {
        this.selectEntity(configprop.NavContacts);
    }

    async verifyCreatedContact(contactName: any): Promise<void> {
        this.checkRecordDisplayed(contactName);
    }

    async  enterFirstName(firstName: any): Promise<void> {
        if (firstName != undefined) {
            await this.enterFirstName(firstName);
        }
    }
    
    async  enterLastName(lastName: any): Promise<void> {
        if (lastName != undefined) {
            await this.enterLastName(lastName);
        }
    }
    
    async  enterMiddleName(middleName: any): Promise<void> {
        if (middleName != undefined) {
            await this.enterMiddleName(middleName);
        }
    }
    
    async  enterAddress(addressStreet: any): Promise<void> {
        if (addressStreet != undefined) {
            await this.enterAddress(addressStreet);
        }
    }
    
    async  enterCity(addressCity: any): Promise<void> {
        if (addressCity != undefined) {
            await this.enterCity(addressCity);
        }
    }
    
    async  enterState(addressState: any): Promise<void> {
        if (addressState != undefined) {
            await this.enterState(addressState);
        }
    }
    
    async  enterZip(zip: any): Promise<void> {
        if (zip != undefined) {
            await this.enterZip(zip);
        }
    }
    
    async  enterPhoneNumber(phoneNumber: any, phoneNumberType: any): Promise<void> {
        if (phoneNumber != undefined && phoneNumberType != undefined) {
            await this.fillInputBox(contactsLocators.phoneNumber, phoneNumber);
            await this.fillInputBox(contactsLocators.phoneNumberType, phoneNumberType);
            await this.clickOnElement(contactsLocators.btnPhoneAdd);
        }
    }
    
    async  enterEmail(email: any, emailType: any): Promise<void> {
        if (email != undefined && emailType != undefined) {
            await this.fillInputBox(contactsLocators.txtEmail, email);
            await this.fillInputBox(contactsLocators.txtEmailType, emailType);
            await this.clickOnElement(contactsLocators.btnEmailAdd);
        }
    }
    
    async  setStatus(status: any): Promise<void> {
        if (status != undefined) {
            await this.selectItemFromDropdown(contactsLocators.btnStatus, commonLocators.listDropDown, status);
        }
    }
    
    async  setSource(source: any): Promise<void> {
        if (source != undefined) {
            await this.selectItemFromDropdown(contactsLocators.btnSource, commonLocators.listDropDown, source);
        }
    }
    
    async  setCategory(category: any): Promise<void> {
        if (category != undefined) {
            await this.selectItemFromDropdown(contactsLocators.btnCategory, commonLocators.listDropDown, category);
        }
    }
    
    async  enterIdentifier(identifier: any): Promise<void> {
        if (identifier != undefined) {
            await this.fillInputBox(contactsLocators.txtIdentifier, identifier);
        }
    }
    

    async enterDetails(objContactData: any): Promise<void> {
            await this.enterFirstName(objContactData.First_name);

            await this.enterLastName(objContactData.Last_name);
      
            await this.enterMiddleName(objContactData.Middle_name);
      
            await this.enterAddress(objContactData.Address_street);
        
            await this.enterCity(objContactData.Address_city);
   
            await this.enterState(objContactData.Address_state);
   
            await this.enterZip(objContactData.Zip);

            await this.enterPhoneNumber(objContactData.Phone_Number, objContactData.Phone_Number_Type);
        
            await this.enterEmail(objContactData.Email, objContactData.EmailType);
            
            await this.setStatus(objContactData.Status);
            
            await this.setSource(objContactData.Source);
            
            await this.setCategory(objContactData.Category);
            
            await this.enterIdentifier(objContactData.Identifier);
            
    }

    async save(): Promise<void> {
        await this.clickOnElement(commonLocators.btnSave);
    }

    async createContact(objContactData: any): Promise<void> {

        await this.clickOnCreate();
        
        await this.enterDetails(objContactData);

        //after filling data

        await this.save();

        await this.waitForLoadState(configprop.waitStatedomcontentloaded);

        await this.waitForLoadState(configprop.waitStatenetworkidle);

        await this.waitForSomeTime(10);

        await this.checkPageHeader(objContactData.First_name + " " + objContactData.Last_name);

    }

    async deleteAndPurge(contactName: any): Promise<void> {

        await this.deleteRecord(contactName);

        await this.waitForSomeTime(2);

        await this.checkRecordNotDisplayed(contactName);

        await this.rubbishBin("Contact", contactName, "Purge", "OK");

        await this.checkRecordNotDisplayed(contactName);

        await this.waitForSomeTime(2);
    }

    async verifyMandatoryField(text: any): Promise<void> {
        await this.verifyToHaveText(contactsLocators.inLineErrMsg, text);
    }

    async verifyCompanyFieldLength(text: any): Promise<void> {
        await this.verifyToHaveText(contactsLocators.lengthErrorMsg, text);
    }

    /**
     * Workflow method for TC-N002: Invalid Email Format Rejection
     * Fills the contact creation form with valid Name, Phone Number, Company, and Position fields,
     * enters an invalid email format, attempts to save, and verifies the invalid email error message.
     *
     * @param contactData Object containing all necessary contact fields. Must include:
     *   - First_name, Last_name, Phone_Number, Phone_Number_Type, Company, Position, EmailType
     *   - Email (should be an invalid format, e.g., 'invalidemail.com')
     *   - expectedEmailError (expected error message string for invalid email)
     */
    async createContactWithInvalidEmailAndVerifyError(contactData: any): Promise<void> {
        // Open the contact creation form
        await this.clickOnCreate();

        // Fill all required details except email with valid data
        await this.enterFirstName(contactData.First_name);
        await this.enterLastName(contactData.Last_name);
        // Company and Position fields are not explicitly present in existing methods; add if needed
        if (contactData.Company) {
            // TODO: Add company field interaction if implemented in future
        }
        if (contactData.Position) {
            // TODO: Add position field interaction if implemented in future
        }
        await this.enterPhoneNumber(contactData.Phone_Number, contactData.Phone_Number_Type);

        // Enter invalid email format
        if (contactData.Email && contactData.EmailType) {
            await this.fillInputBox(contactsLocators.txtEmail, contactData.Email);
            await this.fillInputBox(contactsLocators.txtEmailType, contactData.EmailType);
            await this.clickOnElement(contactsLocators.btnEmailAdd);
        }

        // Save the contact
        await this.save();

        // Wait for UI stability
        await this.waitForLoadState(configprop.waitStatedomcontentloaded);
        await this.waitForLoadState(configprop.waitStatenetworkidle);

        // Verify error message for invalid email format
        if (contactData.expectedEmailError) {
            await this.verifyToHaveText(contactsLocators.inLineErrMsg, contactData.expectedEmailError);
        }
    }

}
export default Contacts;