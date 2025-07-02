import {browser, expect} from '@wdio/globals'
import commonElements from '../pageobjects/commonElements';
import productOverviewPage from '../pageobjects/productOverview.page';
import productDetailsPage from '../pageobjects/productDetails.page';

describe("Product Details Page", async() => {
    beforeEach(async()=> {
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
        await productDetailsPage.productImage.isDisplayed()

        const details = await productDetailsPage.productDetails();
        console.log(`Product Details: ${JSON.stringify(details)}`);
        expect(details).toHaveProperty('name');
        expect(details).toHaveProperty('price');
        expect(details).toHaveProperty('description');  
    })

    it('should be able to add a product to the cart from the details page', async() => {
        await productOverviewPage.productImg[0].click();
        const initialCartCount = await commonElements.numberofItemsInCart();
        await productDetailsPage.addToCart();
        const updatedCartCount = await commonElements.numberofItemsInCart();
        expect(updatedCartCount).toBe(initialCartCount + 1);
    })

    it('should be able to navigate back to the overview page', async() => {
        await productOverviewPage.productImg[0].click();
        await productDetailsPage.goBacktoProductOverview();
        expect(await commonElements.getpageURL()).toContain('/inventory.html');
        await expect(productOverviewPage.productPagetitle).toBeDisplayed();
    })

})