import checkoutCompletePage from "../pageobjects/checkoutComplete.page";
import checkoutOverviewPage from "../pageobjects/checkoutOverview.page";
import commonElements from "../pageobjects/commonElements";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";
import productOverviewPage from "../pageobjects/productOverview.page";
import checkoutOverview from "../helpers/checkoutOverview";

describe('Checkout Overview Page Functionality', async () => {
    beforeEach(async function () {
        this.timeout(40000);
        await checkoutOverview.goToCheckoutOverview();
        console.log('Navigated to Checkout Overview Page'); 
    });

    // afterEach(async () => {
    //     await browser.reloadSession();
    // });

    it('should be able to see the page title', async() => {
        const pageTitle = await commonElements.pageTitle.getText();
        expect(pageTitle).toBe('Checkout: Overview');
    }),

    it('should be able to see the payment information', async() => {
        const paymentInfo = await checkoutOverviewPage.checkoutPaymentDetails();
        console.log(`Payment Information: ${JSON.stringify(paymentInfo)}`);
    }),

    it('should be able to proceed to the confirmation page', async() => {
        await checkoutOverviewPage.finishButton.click();
        await checkoutCompletePage.pageHeaderText.waitForDisplayed();
        console.log(await checkoutCompletePage.pageHeaderText.getText());
        console.log(await checkoutCompletePage.completeText.getText());
        expect(await commonElements.getpageURL()).toContain('checkout-complete.html');
        expect(await commonElements.pageTitle.getText()).toBe('Checkout: Complete!');
    }),

    it('should be able to navigate back to the homepage after purchasing', async() => {
        await checkoutOverviewPage.finishButton.click();
        await checkoutCompletePage.backHomeButton.click();
        await productOverviewPage.productContainers[0].waitForDisplayed();
        expect(await commonElements.getpageURL()).toContain('inventory.html');
        expect(await productOverviewPage.productPagetitle.isDisplayed()).toBe(true);
    })
})