import commonElements from "../pageobjects/commonElements";
import productOverviewPage from "../pageobjects/productOverview.page";
import cartPage from "../pageobjects/cart.page";

async function goToCheckoutFormPage() {
    await commonElements.openLoggedIn();
    await productOverviewPage.productPagetitle.waitForDisplayed();
    await productOverviewPage.addAllProducts();
    await commonElements.cartIcon.click();
    await cartPage.checkoutButton.click();

}

export default {
    goToCheckoutFormPage
}