import loginPage from "./login.page"

class commonElements extends loginPage   {

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

    async numberofItemsInCart() {
        const cartValue = await $('[class="shopping_cart_link"] span').getText()
        return Number(cartValue);
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
        await this.login("standard_user", "secret_sauce")
}
    async getpageURL() {
        const url = await browser.getUrl();
        return url;
    }
}

export default new commonElements();