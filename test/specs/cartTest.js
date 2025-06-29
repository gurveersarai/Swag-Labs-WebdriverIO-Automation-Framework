import commonElements from "../pageobjects/commonElements";
import productOverviewPage from "../pageobjects/productOverview.page";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";

describe('Cart Page', ()=> {
    before(async () => {
        await commonElements.openLoggedIn();
        await productOverviewPage.productPagetitle.waitForDisplayed();
        await productOverviewPage.addAllProducts();
        await commonElements.cartIcon.click();
    })

    afterEach(async () => {
        await browser.reloadSession();
        await commonElements.openLoggedIn();
        await productOverviewPage.productPagetitle.waitForDisplayed();
        await productOverviewPage.addAllProducts();
        await commonElements.cartIcon.click();
    })

    it('should be able to navigate to the cart page', async () => {
        expect(await commonElements.getpageURL()).toContain('/cart.html');
    }),

    it('should have a page title called Your Cart', async () => {
        const pageTitle = await cartPage.cartTitle.getText();
        expect (await pageTitle).toBe('Your Cart');
    })


    it('should be able to see items present in the cart', async () => {
        const items = await cartPage.cartItems();
        for (let item of items) {
            console.log(`Item: ${item.name}, Price: ${item.price}`);
        }
        expect(items.length).toEqual(await commonElements.numberofItemsInCart());
    })

    it('should be able to remove an item in the cart', async() => {
        await cartPage.removeItem(0)
        const items = await cartPage.cartItems();
        expect(items.length).toEqual(await commonElements.numberofItemsInCart());
    }),

     it('should be able to click onto the Continue Shopping button', async() => {
         await cartPage.continueShoppingButton.click()
         expect(await commonElements.getpageURL()).toContain('/inventory.html');
     })

     it('should be able to proceed to the first page of the checkout', async() => {
         await cartPage.checkoutButton.click()
         expect (checkoutPage.checkoutPageTitle).toBeDisplayed()
     })

    

})