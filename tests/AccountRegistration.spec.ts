import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { RegisterationPage } from '../pages/RegestrationPage';
import { LoginPage } from '../pages/LoginPage';
import { RandomDataGenerator } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

//making variables to be used across tests by declaring them globally
let config: TestConfig;
let homePage: HomePage;
let registerationPage: RegisterationPage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    //navigate to application url
    config = new TestConfig();
    await page.goto(config.appUrl);

    //create page objects to be used in before each test
    homePage = new HomePage(page);
    registerationPage = new RegisterationPage(page);
    loginPage = new LoginPage(page);
});

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.close();
});

test('Account Registration Test', async () => {

    //click on register link
    await homePage.clickOnMyAccount();
    await homePage.clickOnRegister();

    //fill registration form
    await registerationPage.setFirstName(RandomDataGenerator.getFirstName());
    await registerationPage.setLastName(RandomDataGenerator.getLastName());
    await registerationPage.setEmail(RandomDataGenerator.getEmail());
    await registerationPage.setTelephone(RandomDataGenerator.getPhoneNumber());
    const password = RandomDataGenerator.getRandomPassword(12);
    await registerationPage.setPassword(password);
    await registerationPage.setConfirmPassword(password);
    await registerationPage.agreeToPrivacyPolicy();
    await registerationPage.clickOnContinue();

    //assert confirmation message
    const confirmationMessage = await registerationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Your Account Has Been Created!');
});