class productDetails {
  get productPrice() {
    return $(".inventory_details_price");
  }
  get productName() {
    return $(".inventory_details_name");
  }
  get productDescription() {
    return $(".inventory_details_name");
  }

  get productImage() {
    return $(".inventory_details_img");
  }

  get addToCartButton() {
    return $("#add-to-cart");
  }
  get removeFromCartButton() {
    return $("#remove-from-cart");
  }
  // returns the product details from the product details page
  async productDetails() {
    await browser.waitUntil(
      async () => {
        return (
          (await this.productPrice.isDisplayed()) &&
          (await this.productName.isDisplayed()) &&
          (await this.productDescription.isDisplayed())
        );
      },
      {
        timeout: 10000,
        timeoutMsg: "Product details are not displayed within 5 seconds",
      }
    );

    const name = await this.productName.getText();
    const price = await this.productPrice.getText();
    const description = await this.productDescription.getText();
    return { name, price, description };
  }
  // returns the product image URL from the product details page
  async goBacktoProductOverview() {
    const backButton = $(".inventory_details_back_button");
    if (await backButton.isDisplayed()) {
      await backButton.click();
    } else {
      console.log("Back Button is not displayed");
    }
  }
  //adds the item to the cart from the product details page
  async addToCart() {
    if (await this.addToCartButton.isDisplayed()) {
      await this.addToCartButton.click();
      console.log("Item added to the cart via the Product Page");
    } else {
      console.log(
        "Add to Cart Button is not displayed, we will try remove the item from the cart instead"
      );
      if (await this.removeFromCartButton.isDisplayed()) {
        await this.removeFromCartButton.click();
      } else {
        console.log("No Remove Cart CTA is displayed also");
      }
    }
  }
}
export default new productDetails();
