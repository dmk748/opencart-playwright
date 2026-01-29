import {Page, Locator} from "@playwright/test";

import { RegisterationPage } from "./RegestrationPage";

export class LoginPage {
    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly clickOnRegister: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator("#input-email");
        this.passwordInput = page.locator("#input-password");
        this.loginButton = page.locator('input[value="Login"]');
        this.errorMessage = page.locator('.alert.alert-danger.alert-dismissible');
        this.clickOnRegister = page.getByRole('link', { name: 'Continue' });
    }

    //action methods

    //login page availability check
    async isLoginPageDisplayed(): Promise<boolean> {
       const title= await this.page.title();
         return title ? true : false;
    }

    //set email
    async setEmail(email:string):Promise<void>{
        try{
            await this.emailInput.clear();
            await this.emailInput.fill(email);
        }catch(error){
            console.error("Error setting email: ", error);
        }
    }

    //set password
    async setPassword(password:string):Promise<void>{
        try{
            await this.passwordInput.clear();
            await this.passwordInput.fill(password);
        }catch(error){
            console.error("Error setting password: ", error);
        }
    }

    //click login button
    async clickLoginButton():Promise<void>{
        try{
            await this.loginButton.click();
        }catch(error){
            console.error("Error clicking login button: ", error);
        }
    }

    //login action
    async login(email:string, password:string):Promise<void>{
        try{
            await this.setEmail(email);
            await this.setPassword(password);
            await this.clickLoginButton();
        }catch(error){
            console.error("Error during login: ", error);
        }  
    }

    //get error message
    async getErrorMessage():Promise<string>{
        try{
            return await this.errorMessage.textContent() || '';
        }catch(error){
            console.error("Error getting error message: ", error);
            return '';
        }
    }

    //navigate to registration page
    async navigateToRegistrationPage():Promise<RegisterationPage>{
        try{
            await this.clickOnRegister.click();
            return new RegisterationPage(this.page);
        }catch(error){
            console.error("Error navigating to registration page: ", error);
            throw error;
        }
    }

}