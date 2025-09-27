import { browser, expect } from "@wdio/globals";
import commonElements from "../pageobjects/commonElements";
import productOverviewPage from "../pageobjects/productOverview.page";

describe("Add Products from Overview Page", () => {
  beforeEach(async () => {
    await commonElements.openLoggedIn();
  });

  it("should be able to see the product title on the overview page", async () => {
    await commonElements.pageTitle.waitForDisplayed();
    expect(await commonElements.pageTitle.getText()).toContain("Products");
  });

  it("should be able to see products on the overview page", async () => {
    const products = await $$(".inventory_item");
    await browser.waitUntil(async () => (await products.length) > 0, {
      timeout: 5000,
      timeoutMsg: "No products found on overview page",
    });
    expect(products.length).toBeGreaterThan(0);
  });

  it("should be able to print all the product names on the overview page", async () => {
    await productOverviewPage.productNames();
  });

  it("should be able to add all items to the cart", async () => {
    const count = await productOverviewPage.addAllProducts();
    const cartCount = await commonElements.numberofItemsInCart();
    expect(cartCount).toBe(count);
  });

  it("should be able to remove an item from the cart", async () => {
    const initialCount = await commonElements.numberofItemsInCart();
    const itemContainer = await $$(".inventory_item");
    await itemContainer[0].$(".btn_inventory").click();
    const newCount = await commonElements.numberofItemsInCart();
    expect(newCount).toBe(initialCount - 1);
  });
});
