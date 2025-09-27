import commonElements from "../pageobjects/commonElements";
import productOverviewPage from "../pageobjects/productOverview.page";
import cartPage from "../pageobjects/cart.page";
import checkoutPage from "../pageobjects/checkout.page";

describe("Cart Page", () => {
  before(async () => {
    try {
      // Open the site and log in
      await commonElements.openLoggedIn();

      // Wait for product page to load
      await browser.waitUntil(
        async () => await productOverviewPage.productPagetitle.isDisplayed(),
        {
          timeout: 15000,
          timeoutMsg: "Product page title not displayed after 15s",
        }
      );

      // Add all products to cart
      await productOverviewPage.addAllProducts();

      // Click on the cart icon
      await browser.waitUntil(
        async () => await commonElements.cartIcon.isClickable(),
        {
          timeout: 10000,
          timeoutMsg: "Cart icon not clickable after 10s",
        }
      );
      await commonElements.cartIcon.click();

      // Wait for cart page to load
      await browser.waitUntil(
        async () => await cartPage.cartTitle.isDisplayed(),
        {
          timeout: 15000,
          timeoutMsg: "Cart title not displayed after 15s",
        }
      );
    } catch (err) {
      console.error("Setup failed:", err.message);
      throw err; // Fail the test if setup fails
    }
  });

  it("should navigate to the cart page", async () => {
    const url = await commonElements.getpageURL();
    expect(url).toContain("/cart.html");
  });

  it("should have a page title 'Your Cart'", async () => {
    await browser.waitUntil(
      async () => await cartPage.cartTitle.isDisplayed(),
      {
        timeout: 10000,
        timeoutMsg: "Cart title not displayed before getting text",
      }
    );
    const pageTitle = await cartPage.cartTitle.getText();
    expect(pageTitle).toBe("Your Cart");
  });

  it("should display all items in the cart", async () => {
    await browser.waitUntil(
      async () => (await cartPage.cartItems()).length > 0,
      {
        timeout: 10000,
        timeoutMsg: "No items found in the cart after 10s",
      }
    );

    const items = await cartPage.cartItems();
    expect(items.length).toEqual(await commonElements.numberofItemsInCart());

    items.forEach((item) => {
      console.log(`Item: ${item.name}, Price: ${item.price}`);
    });
  });

  it("should remove an item from the cart", async () => {
    await cartPage.removeItem(0);

    await browser.waitUntil(
      async () =>
        (await cartPage.cartItems()).length ===
        (await commonElements.numberofItemsInCart()),
      {
        timeout: 10000,
        timeoutMsg: "Cart items not updated after removing item",
      }
    );

    const items = await cartPage.cartItems();
    expect(items.length).toEqual(await commonElements.numberofItemsInCart());
  });

  it("should click the Continue Shopping button", async () => {
    await browser.waitUntil(
      async () => await cartPage.continueShoppingButton.isClickable(),
      {
        timeout: 10000,
        timeoutMsg: "Continue Shopping button not clickable",
      }
    );
    await cartPage.continueShoppingButton.click();
    const url = await commonElements.getpageURL();
    expect(url).toContain("/inventory.html");
  });

  it("should proceed to the checkout page", async () => {
    await commonElements.cartIcon.click();
    await browser.waitUntil(
      async () => await cartPage.checkoutButton.isClickable(),
      {
        timeout: 10000,
        timeoutMsg: "Checkout button not clickable",
      }
    );
    await cartPage.checkoutButton.click();

    await browser.waitUntil(
      async () => await checkoutPage.checkoutPageTitle.isDisplayed(),
      {
        timeout: 15000,
        timeoutMsg: "Checkout page title not displayed after 15s",
      }
    );

    expect(await checkoutPage.checkoutPageTitle.isDisplayed()).toBe(true);
  });
});
