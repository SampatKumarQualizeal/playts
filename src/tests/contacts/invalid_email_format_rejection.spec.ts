import test from "../../fixtures/fixture";
import Contacts from "../../pages/contacts";
import LoginPage from "../../pages/login_page";
import * as configprop from "../../utils/config_prop";
import invalidEmailData from "../../test_data/invalid_email_format_rejection.json";


test.describe('Contact Creation - Invalid Email Format Rejection', () => {
  test('should reject invalid email format and display appropriate error message [TC-N002]', async ({ page }) => {
    // Login is handled by fixture
    const contactsPage = new Contacts(page);

    // Navigate to Contacts section if not already there (precondition)
    // The fixture or test setup should ensure login and navigation as per repo pattern
    // If explicit navigation is needed, uncomment below:
    // await contactsPage.navigateToContacts();

    // Prepare test data mapping to Contacts PageObject expectations
    const contactData = {
      First_name: invalidEmailData.contactData.firstName,
      Last_name: invalidEmailData.contactData.lastName,
      Phone_Number: invalidEmailData.contactData.phoneNumber,
      Phone_Number_Type: "Mobile", // Defaulting as test data does not specify
      Company: invalidEmailData.contactData.company,
      Position: invalidEmailData.contactData.position,
      Email: invalidEmailData.contactData.email,
      EmailType: invalidEmailData.contactData.emailType,
      Category: invalidEmailData.contactData.category,
      expectedEmailError: invalidEmailData.expectedResult.errorMessage
    };

    // Use the workflow method for invalid email scenario
    await contactsPage.createContactWithInvalidEmailAndVerifyError(contactData);
  });
});
