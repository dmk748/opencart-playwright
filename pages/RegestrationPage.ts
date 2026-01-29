import { Page, Locator } from "@playwright/test";

import { LoginPage } from "./LoginPage";

export class RegisterationPage {
    //defining variables
    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly confirmMessage: Locator;
    private readonly loginlink: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator("#input-firstname");
        this.lastNameInput = page.locator("#input-lastname");
        this.emailInput = page.locator("#input-email");
        this.telephoneInput = page.locator("#input-telephone");
        this.passwordInput = page.locator("#input-password");
        this.confirmPasswordInput = page.locator("#input-confirm");
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.locator('input[value="Continue"]');
        this.confirmMessage = page.locator(
            'h1:has-text("Your Account Has Been Created!")'
        );
        this.loginlink=page.getByRole('link', { name: 'login page' });
    }

    //action methods

    /*fill registration form
    async fillRegistrationForm(userDetails: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        await this.firstNameInput.fill(userDetails.firstName);
        await this.lastNameInput.fill(userDetails.lastName);
        await this.emailInput.fill(userDetails.email);
        await this.telephoneInput.fill(userDetails.telephone);
        await this.passwordInput.fill(userDetails.password);
        await this.confirmPasswordInput.fill(userDetails.password);
    }
    */

    //or 

    //firstname
    async setFirstName(firstName: string): Promise<void> {
        try{
            await this.firstNameInput.fill(firstName);
        }catch(error){
            console.error("Error setting first name: ", error);
        }
    }

    //lastname
    async setLastName(lastName: string): Promise<void> {
        try{
            await this.lastNameInput.fill(lastName);
        }catch(error){
            console.error("Error setting last name: ", error);
        }   
    }
    //email
    async setEmail(email: string): Promise<void> {
        try{
            await this.emailInput.fill(email);
        }catch(error){
            console.error("Error setting email: ", error);
        }
    }

    //telephone
    async setTelephone(telephone: string): Promise<void> {
        try{
            await this.telephoneInput.fill(telephone);
        }catch(error){
            console.error("Error setting telephone: ", error);
        }
    }

    //password
    async setPassword(password: string): Promise<void> {
        try{
            await this.passwordInput.fill(password);
        }catch(error){
            console.error("Error setting password: ", error);
        }
    }

    //confirm password
    async setConfirmPassword(confirmPassword: string): Promise<void> {
        try{
            await this.confirmPasswordInput.fill(confirmPassword);
        }catch(error){
            console.error("Error setting confirm password: ", error);
        }
    }

    //agree to privacy policy
    async agreeToPrivacyPolicy(): Promise<void> {
        try{
            await this.privacyPolicyCheckbox.check();
        }catch(error){
            console.error("Error agreeing to privacy policy: ", error);
        }
    }

    //click on continue button
    async clickOnContinue(): Promise<void> {
        try{
            await this.continueButton.click();
        }catch(error){
            console.error("Error clicking on continue button: ", error);
        }
    }

    //get confirmation message
    async getConfirmationMessage(): Promise<string> {
        try{
            return await this.confirmMessage.textContent() || "";
        }catch(error){
            console.error("Error getting confirmation message: ", error);
            return "";
        }
    }

    //complete registration
    async completeRegistration(userDetails: {
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
    }): Promise<void> {
        await this.setFirstName(userDetails.firstName);
        await this.setLastName(userDetails.lastName);
        await this.setEmail(userDetails.email);
        await this.setTelephone(userDetails.telephone);
        await this.setPassword(userDetails.password);
        await this.setConfirmPassword(userDetails.password);
        await this.agreeToPrivacyPolicy();
        await this.clickOnContinue();
        await this.getConfirmationMessage();
    }

    //navigate to login page
    async navigateToLoginPage(): Promise<LoginPage> {
        try{
            await this.loginlink.click();
            return new LoginPage(this.page);
        }catch(error){
            console.error("Error navigating to login page: ", error);
            throw error;
        }
    }   
}