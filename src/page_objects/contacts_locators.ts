export const lengthErrorMsg: string = "//div[@class='ui error floating icon message']";
export const txtFirstName: string = "//input[@name='first_name']";
export const txtLastName: string = "//input[@name='last_name']";
export const txtMiddleName: string = "//input[@name='middle_name']";
export const optAddCompany: string = "//div[@name='company'][@role='combobox']//div[@class='selected item addition']";
export const txtCompany: string = "//div[@name='company']/input";
export const txtEmail: string = "//input[@placeholder='Email address']";
export const txtEmailType: string = "//input[@placeholder='Personal email, Business, Alt...']";
export const btnEmailAdd: string = "//label[text()='Email']/following-sibling::div//button";
export const address: string = "//input[@name='address']";
export const city: string = "//input[@name='city']";
export const state: string = "//input[@name='state']";
export const zip: string = "//input[@name='state']";
export const txtTags: string = "//div[@class='ui fluid multiple search selection dropdown']";
export const phoneNumber: string = "//input[@placeholder='Number']";
export const phoneNumberType: string = "//input[@placeholder='Home, Work, Mobile...']";
export const btnPhoneAdd: string = "//div[@class='four fields']//button[@class='ui tiny basic icon button']";
export const lblPageHeader: string = "//div[contains(@class,'ui header']";
export const lblInlineErrMsgFirstName: string = "//label[text( ='First Name']/span[@class='inline-error-msg']";
export const lblInlineErrMsgLastName: string = "//label[text( ='Last Name']/span[@class='inline-error-msg']";
export const txtIdentifier: string = "//input[@name='identifier']";
export const btnCategory: string = "//div[@name='category']//div[@role='alert'][normalize-space()='Select']";
export const btnSource: string = "//label[text()='Source']/following-sibling::div[@role='listbox']";
export const btnStatus: string = "//label[text()='Status']/following-sibling::div[@role='listbox']";

export const inLineErrMsg: string = "//span[@class='inline-error-msg']";

// NEW LOCATORS ADDED BELOW (per requirements, no duplicates, preserving all existing code)

export const txtFirstNameCss: string = "input[name='first_name']";
export const txtLastNameCss: string = "input[name='last_name']";
export const txtEmailValue: string = "input[name='value']"; // Email Address Input
export const txtEmailTypeName: string = "input[name='name']"; // Email Type Input
export const btnAddEmail: string = "button.ui.tiny.basic.icon.button";
export const drpCategory: string = "div[role='listbox'][name='category']";
export const btnSave: string = "//button[contains(@class, 'linkedin button') and contains(., 'Save')]";
export const btnCreateContact: string = "//button[contains(@class, 'linkedin button') and contains(., 'Create')]";
export const lnkContacts: string = "a[href='/contacts']";
export const lblSuccessMessage: string = "//div[contains(@class, 'ui positive message')]"; // TODO: Replace with actual locator for success message