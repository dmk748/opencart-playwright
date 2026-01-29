import {Page, Locator} from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {

    private readonly page: Page;

    // declaring locators for elements on My Account page

    private readonly logoutLink: Locator;
    private readonly accountDashboardHeader: Locator;

    //constructor to initialize the page and locators
    constructor(page: Page) {
        this.page = page;
        this.logoutLink = page.locator('div.list-group a:last-child');
        this.accountDashboardHeader = page.locator('h2:has-text("My Account")');
        
    }

    //method to verify if user is on My Account page
    async isAtMyAccountPage(): Promise<boolean> {
        try{
            return await this.accountDashboardHeader.isVisible();
        }   
        catch(error){
            console.error('Error verifying My Account page:', error);
            return false;
        }
    }

    //method to click on logout link
    async clickOnLogout(): Promise<void> {
        try{
            await this.logoutLink.click();
            new LogoutPage(this.page);

        }catch(error){
            console.error('Error clicking on Logout link:', error);
            throw error;
        }
        
    }
}