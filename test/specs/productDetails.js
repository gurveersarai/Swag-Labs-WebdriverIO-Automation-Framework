import {browser, expect} from '@wdio/globals'
import commonElements from '../pageobjects/commonElements';
import productOverviewPage from '../pageobjects/productOverview.page';
import productDetailsPage from '../pageobjects/productDetails.page';

describe("Product Details Page", async() => {
    before(async()=> {
        await commonElements.openLoggedIn();
        await productOverviewPage.productPagetitle.waitForDisplayed();
    }),
    afterEach(async () => {
        await browser.reloadSession();
        await commonElements.openLoggedIn();
        await productOverviewPage.productPagetitle.waitForDisplayed();
    }),

    it('should be able to click onto item name and be navigated to the details page', async() => {
        await productOverviewPage.productItemLink[0].click();
        await browser.pause(5000);
        expect(await commonElements.getpageURL()).toContain('inventory-item.html?id');
    }),

    it('should be able to click onto the product image and be navigated to the details page', async() => {
        await productOverviewPage.productImg[0].click();
        await browser.pause(5000);
        expect(await commonElements.getpageURL()).toContain('inventory-item.html?id');
    }),

    it('should be able to retrieve product details on the details page', async() => {
        await productOverviewPage.productImg[0].click();
        await browser.waitUntil(async () => {
            await productDetailsPage.productImage.isDisplayed()
        }), {
            timeout: 5000,
            timeoutMsg: 'Product details page has not loaded properly'
        }
        const details = await productDetailsPage.productDetails();
        console.log(`Product Details: ${JSON.stringify(details)}`);
        await expect (details).to.have.all.keys('name', 'price', 'description')
    }),

    it('should be able to add a product to the cart from the details page', async() => {
        await productOverviewPage.productImg[0].click();
        const initialCartCount = await commonElements.numberofItemsInCart();
        await productDetailsPage.addToCartButton.click();
        const updatedCartCount = await commonElements.numberofItemsInCart();
        expect(updatedCartCount).toBe(initialCartCount + 1);
    }),

    it('should be able to navigate back to the overview page', async() => {
        await productOverviewPage.productImg[0].click();
        await productDetailsPage.backToProductsButton.click();
        expect(await commonElements.getpageURL()).toContain('/inventory.html');
        await expect(productOverviewPage.productPagetitle).toBeDisplayed();
    })

})