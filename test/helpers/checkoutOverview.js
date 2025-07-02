import commonElements from "../pageobjects/commonElements";
import productOverviewPage from "../pageobjects/productOverview.page";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";

async function goToCheckoutOverview() {
    await commonElements.openLoggedIn();
        await productOverviewPage.productPagetitle.waitForDisplayed();
        await productOverviewPage.addAllProducts();
        await commonElements.cartIcon.click();
        await cartPage.checkoutButton.click();
        await checkoutPage.enterFormDetails('John', 'Doe', '12345');
        await checkoutPage.continueButton.click();

}

export default {
    goToCheckoutOverview
}