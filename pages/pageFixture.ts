import { test as base } from "@playwright/test";
import RegisterPage from "./RegisterPage";

export type PageObjects = {
  registerPage: RegisterPage;
};

export const test = base.extend<PageObjects>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});

export { expect, type Page, type Locator } from "@playwright/test";
