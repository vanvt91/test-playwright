import { test, expect } from "../pages/pageFixture";

test.describe("Register Form", () => {
  test.beforeEach(async ({ registerPage }) => {
    registerPage.open();
  });

  const testData = [
    { field: "email", message: "'email' is required" },
    { field: "lastName", message: "'lastName' is required" },
    { field: "firstName", message: "'firstName' is required" },
    { field: "whereDidYouHearAboutUs", message: "'infoSource' is required" },
    { field: "servicesOfInterest", message: "'servicesOfInterest' is required" },
    { field: "typeOfAssociation", message: "'typeOfAssociation' is required" },
  ];

  const formData = {
    email: "test@example.com",
    lastName: "Doe",
    firstName: "John",
    whereDidYouHearAboutUs: "Other",
    servicesOfInterest: ["Printing", "Logistics"],
    typeOfAssociation: "Reseller",
    explanation: "I am a tester.",
  };

  test("Submit form with valid data", async ({ registerPage }) => {
    await registerPage.fillFormRegister(formData);
    await registerPage.clickSubmit();
    const successMessage = await registerPage.getSubmitSuccessMessage();
    expect(successMessage).toEqual("Your inquiry has been submitted successfully!");
  });

  test("Submit form with invalid email", async ({ registerPage }) => {
    const testFormData = { ...formData };
    testFormData.email = "invalidEmail";
    await registerPage.fillFormRegister(testFormData);
    await registerPage.clickSubmit();
    const successMessage = await registerPage.getErrorMessage();
    expect(successMessage).toEqual("'email' is not a valid email");
  });

  test("Submit form with all empty fields", async ({ registerPage }) => {
    await registerPage.clickSubmit();
    const expectedErrorMessages = [
      "'email' is required",
      "'lastName' is required",
      "'firstName' is required",
      "'infoSource' is required",
      "'servicesOfInterest' is required",
      "'typeOfAssociation' is required",
    ];
    const errorMessage = await registerPage.getAllErrorMessage();
    expect(errorMessage).toEqual(expectedErrorMessages);
  });

  for (const data of testData) {
    const { field, message } = data;
    test(`Submit form with ${field} field empty`, async ({ registerPage }) => {
      const testFormData = { ...formData };
      delete testFormData[field];
      await registerPage.fillFormRegister(testFormData);
      await registerPage.clickSubmit();
      const expectedErrorMessages = message;
      const errorMessage = await registerPage.getErrorMessage();
      expect(errorMessage).toEqual(expectedErrorMessages);
    });
  }
});
