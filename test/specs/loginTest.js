import { browser, expect } from '@wdio/globals'
import loginPage from '../pageobjects/login.page';
import commonElements from '../pageobjects/commonElements.js'


describe('Login Page', () => {
    beforeEach(async () => {
        await commonElements.open();
    },
    afterEach(async () => {
        await browser.reloadSession();
        
    })
    )
    it('should login with valid credentials', async () => {
        await expect(browser).toHaveTitle('Swag Labs');
        await loginPage.login("standard_user", "secret_sauce");
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/inventory.html')
    })

    it('should not be able to login with invalid credentials', async () => {
        await loginPage.login("invalid_user", "invalid password");
        const errorMessage = await loginPage.errorMessage()
        await expect(errorMessage).toContain("Epic sadface: Username and password do not match any user in this service")
        
    }),

    it('should not be able to login with a locked user', async () => {
        await loginPage.login("locked_user", "secret_sauce");
        const errorMessage = await loginPage.errorMessage();
        await expect (errorMessage).toContain("Epic sadface: Username and password do not match any user in this service");
        
    })

    it('should not be able to login with an empty username and password', async () => {
        await loginPage.login("", "");
        const errorMessage = await loginPage.errorMessage();
        await expect(errorMessage).toContain("Epic sadface: Username is required");
    })
    


})

