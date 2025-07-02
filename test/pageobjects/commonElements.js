import loginPage from './login.page';

class commonElements{

    get hamburgerMenu() {
        return $('#react-burger-menu-btn')
    }

    get cartIcon() {
         return $('#shopping_cart_container')
    }

    get closeMenuIcon() {
        return $('#react-burger-cross-btn')
    }

    get logoutLink() {
        return $('#logout_sidebar_link')
    }

    get pageTitle() {
        return $('.title')
    }

    get cancelButton() {
        return $('#cancel')
    }

    async numberofItemsInCart() {
        const cartIcon = await $('a[class="shopping_cart_link"]')
        if (!(await cartIcon.$('span').isDisplayed())) {
            console.log("No items in the cart");
            return 0;
        }
        else {
            let cartValue = await cartIcon.$('span').getText();
            return Number(cartValue);
        }
        
    }

    async headerText() {
        return $('.app_logo').getText()
    }

    async getSocialLink(platform) {
        return $(`li [data-test="social-"+${platform}]`);
    }

    async open() {
        await browser.url('/');
    }

    async openLoggedIn() {
        await browser.url('/');
        await loginPage.login("standard_user", "secret_sauce")
        
}
    async getpageURL() {
        const url = await browser.getUrl();
        return url;
    }
}

export default new commonElements();