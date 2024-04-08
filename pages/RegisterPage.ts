import { type Locator, type Page } from "playwright";

export default class RegisterPage {
  readonly page: Page;
  readonly emailLocator: Locator;
  readonly lastNameLocator: Locator;
  readonly firstNameLocator: Locator;
  readonly whereDidYouHearAboutUsLocator: Locator;
  readonly servicesOfInterestLocator: Locator;
  readonly optionServiceContents: Locator;
  readonly typeOfAssociationLocator: Locator;
  readonly explanationLocator: Locator;
  readonly submitButtonLocator: Locator;
  readonly errorMessage: Locator;
  readonly submitSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLocator = page.locator("[id=form_item_email]");
    this.lastNameLocator = page.locator("[id=form_item_lastName]");
    this.firstNameLocator = page.locator("[id=form_item_firstName]");
    this.whereDidYouHearAboutUsLocator = page.locator("[class=ant-select-selection-item]");
    this.servicesOfInterestLocator = page.locator("[class*=ant-checkbox-group]");
    this.optionServiceContents = page.locator("[class=ant-select-item-option-content]");
    this.typeOfAssociationLocator = page.locator("[class*=ant-radio-group]");
    this.explanationLocator = page.locator("textarea[id=form_item_explanation]");
    this.submitButtonLocator = page.locator("button[type='submit']");
    this.errorMessage = page.locator("[class=ant-form-item-explain-error]");
    this.submitSuccessMessage = page.locator("[class*=ant-alert-success] [class=ant-alert-message]");
  }

  async open() {
    await this.page.goto("https://raksul.github.io/recruit-qa-engineer-work-sample/");
  }

  async enterEmail(email: string) {
    await this.emailLocator.fill(email);
  }

  async enterLastName(lastName: string) {
    await this.lastNameLocator.fill(lastName);
  }

  async enterFirstName(firstName: string) {
    await this.firstNameLocator.fill(firstName);
  }

  async selectWhereDidYouHearAboutUs(option: string) {
    await this.whereDidYouHearAboutUsLocator.click();
    const selectOption = this.optionServiceContents.getByText(option);
    await selectOption.click();
  }

  async selectServicesOfInterest(services: string[]) {
    for (const service of services) {
      await this.servicesOfInterestLocator.getByText(service).check();
    }
  }

  async selectTypeOfAssociation(type: string) {
    await this.typeOfAssociationLocator.getByText(type).click();
  }

  async enterExplanation(explanation: string) {
    await this.explanationLocator.fill(explanation);
  }

  async clickSubmit() {
    await this.submitButtonLocator.click();
  }

  async getSubmitSuccessMessage() {
    const successMessage = this.submitSuccessMessage.innerText();
    return successMessage;
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: "visible" });
    const errorMessage = await this.errorMessage.innerText();
    return errorMessage;
  }

  async getAllErrorMessage() {
    await this.page.waitForSelector("[class=ant-form-item-explain-error]", { state: "visible" });
    const allErrorMessage = await this.errorMessage.allTextContents();
    console.log(allErrorMessage);
    return allErrorMessage;
  }
}
