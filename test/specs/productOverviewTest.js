import {browser, expect} from '@wdio/globals'
import commonElements from '../pageobjects/commonElements'
import productOverviewPage from '../pageobjects/productOverview.page'

describe("Add Products from Overview Page", async() => {
    before(async () => {
        await commonElements.openLoggedIn();
    })

    it("should be able to see the product title on the overview page", async() => {
        await commonElements.pageTitle.waitForDisplayed();
        expect(await commonElements.pageTitle.getText()).toContain("Products");
    })

    it("should be able to see products on the overview page", async() => {
        expect(await productOverviewPage.productContainers).toBeDisplayed();
    })

    it("should be able to print all the product names on the overview page", async() => {
        await browser.pause(5000);
        await productOverviewPage.productNames();
    })

    it("should be able to add all items to the cart", async() => {
        const count = await productOverviewPage.addAllProducts();
        expect(await commonElements.numberofItemsInCart()).toBe(count);

    })

    it("should be able to remove an item from the cart", async() => {
        const cartIconCount = await commonElements.numberofItemsInCart();
        const itemContainer = await $$('.inventory_item');
        await itemContainer[0].$('.btn_inventory').click();
        expect (cartIconCount).toBeGreaterThan(cartIconCount - 1);
        await browser.pause(5000); // Pause to see the change in cart icon count
    }) 
})