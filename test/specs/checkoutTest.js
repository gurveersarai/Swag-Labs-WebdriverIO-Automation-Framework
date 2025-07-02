import checkoutPage from "../pageobjects/checkout.page";
import commonElements from "../pageobjects/commonElements";
import cartForm from "../helpers/cartForm";
import fs from 'fs'
import path from "path"

describe("Checkout Page Functionality", async()=> {
    let personalDetails;
    const filePath = path.join(process.cwd(), 'test', 'testdata', 'personalDetails.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    personalDetails = JSON.parse(fileContent)[0];

    beforeEach(async function() {
        this.timeout(40000)
        await cartForm.goToCheckoutFormPage();
    });

    it('should have the page title displayed', async() => {
        const title = await commonElements.pageTitle.getText()
        expect (await title).toBe('Checkout: Your Information')
    })

    it('should have a form displayed', async() => {
        const formDisplayed = await checkoutPage.checkoutForm.isDisplayed()
        expect (await formDisplayed).toBe(true)
    }),

    it('should be able to enter details into the form fields and continue to the overview page', async() => {
        const {FirstName,LastName,PostalCode} = personalDetails
        browser.waitUntil (async () => {
            return await checkoutPage.checkoutForm.isDisplayed()
        },
        { 
        timeout: 5000,
        timeoutMsg: 'Checkout form did not appear in time'
        });
    
        await checkoutPage.enterFormDetails(FirstName,LastName,PostalCode)
        await checkoutPage.continueButton.click()
        await commonElements.pageTitle.waitForDisplayed();
        const pageTitle = await commonElements.pageTitle.getText()
        expect (await commonElements.pageTitle.getText()).toContain('Checkout: Overview')
        expect (await commonElements.getpageURL()).toContain('checkout-step-two.html');
    })

    it('should be able to see error messages when form is not compeleted', async() => {
        await checkoutPage.continueButton.click()
        await checkoutPage.errorModal.waitForDisplayed();
        const errorMessage = await checkoutPage.errorModal.getText()
        expect (await errorMessage).toContain('Error')
    }),

    it('should be able to navigate back to the cart', async() => {
        await commonElements.cancelButton.click()
        expect (await commonElements.getpageURL()).toContain('cart.html');
        expect (await commonElements.pageTitle.getText()).toBe('Your Cart')
    })

})