import {Page, Locator} from "@playwright/test";

export class LogoutPage {
    private readonly page: Page;
    private readonly logoutConfirmationMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutConfirmationMessage = page.locator('div.alert.alert-success');
    }

    async isLogoutSuccessful(): Promise<boolean> {
        try {
            return await this.logoutConfirmationMessage.isVisible();
        } catch (error) {
            console.error('Error verifying logout confirmation:', error);
            return false;
        }
    }
}