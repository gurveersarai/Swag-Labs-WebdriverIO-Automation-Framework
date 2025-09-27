import commonElements from "../pageobjects/commonElements";
import productOverviewPage from "../pageobjects/productOverview.page";

describe("Logout Functionality", () => {
  beforeEach(async () => {
    try {
      // Open the site and log in
      await commonElements.openLoggedIn();

      // Wait for product page to fully load
      await productOverviewPage.productPagetitle.waitForDisplayed({
        timeout: 10000,
      });
    } catch (err) {
      console.error("Setup failed:", err.message);
      throw err;
    }
    const burgerMenuBtn = await commonElements.hamburgerMenu;
    await burgerMenuBtn.waitForClickable({ timeout: 10000 });
    await burgerMenuBtn.click();
  });

  it("should be able to see the Logout link present", async () => {
    try {
      // Wait for logout link to appear
      const logoutLink = await commonElements.logoutLink;
      await logoutLink.waitForDisplayed({ timeout: 10000 });

      expect(await logoutLink.isDisplayed()).toBe(true);
    } catch (err) {
      console.error("Logout link test failed:", err.message);
      throw err;
    }
    browser.pause(10000);
  });

  it("should successfully log out the user", async () => {
    browser.pause(5000);
    await commonElements.logoutLink.click();
    await browser.pause(5000);
    expect(await commonElements.getpageURL()).toBe(
      "https://www.saucedemo.com/"
    );
  });
});
