export const invalidEmailFormatContactData = {
  firstName: "TestFirstName",
  lastName: "TestLastName",
  phoneNumber: "9876543210",
  company: "Test Company",
  position: "Manager",
  email: "invalidemail.com", // Invalid format (missing @)
  expectedErrorMessage: "Please enter a valid email address."
};