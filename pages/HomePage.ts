import {Page, Locator} from '@playwright/test';

export class HomePage {

    //defining variables
    private readonly page: Page;
    private readonly myAccountLink: Locator;
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;

    //constructor
    constructor(page: Page){
        this.page=page;
        this.myAccountLink=page.locator('span:has-text("My Account")');
        this.registerLink=page.locator('a:has-text("Register")');
        this.loginLink=page.locator('a:has-text("Login")');
        this.searchBox=page.locator('input[placeholder="Search"]');
        this.searchButton=page.locator('#search button[type="button"]');
    }

    //action methods

    //check home page available or not 
    async isHomePageDisplayed(){
        let title=await this.page.title();
        return title? true : false;
    }

    //click on My Account link
    async clickOnMyAccount(){
        try{
            await this.myAccountLink.click();
        }catch(error){
            console.error("Error clicking on My Account link: ", error);
        }
    }

    //click on Register link
    async clickOnRegister(){
        try{
            await this.registerLink.click();
        }catch(error){
            console.error("Error clicking on Register link: ", error);
        }
    }

    //click on Login link
    async clickOnLogin(){
        try{
            await this.loginLink.click();
        }catch(error){
            console.error("Error clicking on Login link: ", error);
        }
    }

    //search for a product
    async searchProduct(productName: string){
        try{
            await this.searchBox.clear();
            await this.searchBox.fill(productName);
            await this.searchButton.click();
        }catch(error){
            console.error("Error searching for product: ", error);
        }
    }


}