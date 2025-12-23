import test from "../../fixtures/fixture";
import Contacts from "../../pages/contacts";
import { invalidEmailFormatContactData } from "../../test_data/invalid_email_format_rejection";


test.describe('Contact Creation - Invalid Email Format', () => {
  test('should reject invalid email format and display error message', async ({ page }) => {
    // Initialize Contacts Page Object
    const contactsPage = new Contacts(page);

    // Navigate to Contacts module (assumes login is handled by fixture)
    await contactsPage.navigateToContacts();
    await contactsPage.clickOnCreate();

    // Prepare contact data in expected PageObject format
    const contactData = {
      First_name: invalidEmailFormatContactData.firstName,
      Last_name: invalidEmailFormatContactData.lastName,
      Company: invalidEmailFormatContactData.company,
      Position: invalidEmailFormatContactData.position,
      Phone_Number: invalidEmailFormatContactData.phoneNumber,
      Phone_Number_Type: undefined, // Not provided in test data
      Email: invalidEmailFormatContactData.email,
      EmailType: undefined, // Not provided in test data
      Status: undefined,
      Source: undefined,
      Category: undefined,
      Identifier: undefined
    };

    // Use the workflow method to fill form with invalid email and verify error
    await contactsPage.createContactWithInvalidEmailAndVerifyError(
      contactData,
      invalidEmailFormatContactData.expectedErrorMessage
    );
  });
});
