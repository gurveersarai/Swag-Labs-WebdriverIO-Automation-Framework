import {browser, expect} from '@wdio/globals'
import commonElements from '../pageobjects/commonElements';
import loginPage from '../pageobjects/login.page';

describe("Logout Functionality", () => {
    before(async () => {
        await commonElements.open();
        await loginPage.login("standard_user", "secret_sauce");

    })
    after(async () => {
        await browser.reloadSession();
    })
    it('should be able to see the Logout Link present', async() => {
        await commonElements.hamburgerMenu.click();
        expect (await commonElements.logoutLink).toBeDisplayed();
        const linkText = await commonElements.logoutLink.getText();
        expect (await linkText).toContain('Logout');
    }),

    it('should be able to logout successfully', async() => {
        await commonElements.logoutLink.click();
        const currentUrl = await browser.getUrl();
        await expect(currentUrl).not.toContain('/inventory.html');
    })
})