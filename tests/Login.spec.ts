/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

// Global variables for use across tests
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

// Setup before each test
test.beforeEach(async ({ page }) => {
    // Navigate to application URL
    config = new TestConfig();
    await page.goto(config.appUrl);

    // Create page objects for use in tests
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
});

// Teardown after each test
test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.close();
});

// Test: Login with Valid Credentials
test('Login with Valid Credentials', async () => {

    // Navigate to Login page
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();

    //login with valid credentials

    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLoginButton();

    //alternative way to login
    //await loginPage.login(config.email, config.password);

    //verify successful login by checking presence of My Account page

    const isAtMyAccount =  await myAccountPage.isAtMyAccountPage();
    expect(isAtMyAccount).toBeTruthy();
});