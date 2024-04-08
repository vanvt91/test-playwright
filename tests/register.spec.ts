import { test, expect } from "../pages/pageFixture";

test.describe("Register Form", () => {
  test.beforeEach(async ({ registerPage }) => {
    registerPage.open();
  });

  test("Submit form with valid data", async ({ registerPage }) => {
    await registerPage.enterEmail("test@example.com");
    await registerPage.enterLastName("Doe");
    await registerPage.enterFirstName("John");
    await registerPage.selectWhereDidYouHearAboutUs("Other");
    await registerPage.selectServicesOfInterest(["Printing", "Logistics"]);
    await registerPage.selectTypeOfAssociation("Reseller");
    await registerPage.enterExplanation("I am a tester.");
    await registerPage.clickSubmit();
    const successMessage = await registerPage.getSubmitSuccessMessage();
    expect(successMessage).toEqual("Your inquiry has been submitted successfully!");
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
});
