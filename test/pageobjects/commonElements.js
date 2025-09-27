import loginPage from "./login.page";
// This file contains common elements and methods used across multiple test cases in the application.
class commonElements {
  get hamburgerMenu() {
    return $("#react-burger-menu-btn");
  }

  get cartIcon() {
    return $("#shopping_cart_container");
  }

  get closeMenuIcon() {
    return $("#react-burger-cross-btn");
  }

  get logoutLink() {
    return $("#logout_sidebar_link");
  }

  get pageTitle() {
    return $(".title");
  }

  get cancelButton() {
    return $("#cancel");
  }
  // This method is used to obtain the amount of items in the cart.
  async numberofItemsInCart() {
    const cartIcon = await $('a[class="shopping_cart_link"]');
    if (!(await cartIcon.$("span").isDisplayed())) {
      console.log("No items in the cart");
      return 0;
    } else {
      let cartValue = await cartIcon.$("span").getText();
      return Number(cartValue);
    }
  }
  // This method is used to obtain the text of the header.
  async headerText() {
    return $(".app_logo").getText();
  }

  // This method is used to open the application.
  async open() {
    await browser.url("/");
  }
  // This method is used to open the application and log in with the standard user credentials.
  async openLoggedIn() {
    await browser.reloadSession();
    await browser.url("/");
    await loginPage.login("standard_user", "secret_sauce");
  }
  // This method is used to return the current URL of the page.
  async getpageURL() {
    const url = await browser.getUrl();
    return url;
  }

  async clearCart() {
    await browser.execute(() => localStorage.removeItem("cart-contents"));
  }
}

export default new commonElements();
