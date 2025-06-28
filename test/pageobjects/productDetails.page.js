class productDetails {

    async productDetails() {
        await browser.waitUntil(async () => {
            return await this.productPrice.isDisplayed() &&
                     await this.productName.isDisplayed() &&
                     await this.productDescription.isDisplayed();
        }, {
            timeout: 5000,
            timeoutMsg: 'Product details are not displayed within 5 seconds'
        });

        const name = await this.productName.getText();
        const price = await this.productPrice.getText();
        const description = await this.productDescription.getText();
        return {name, price, description}
    }
        
    get productPrice() {
        return $('.inventory_details_price');
    }
    get productName() {
        return $('.inventory_details_name');
    }
    get productDescription() {
        return $('/inventory_details_name')
    }

    get productImage() {
        return $('.inventory_details_img');
    }

    async goBacktoProductOverview() {
        const backButton = $(".inventory_details_back_button");
        if (await backButton.isDisplayed()) {
            await backButton.click();
        }
        else {
            console.log ("Back Button is not displayed")
        }
    }

    async addToCart() {
        if(await this.addToCartButton.isDisplayed()) {
            await this.addToCartButton.click();
            
        }
        else{
            console.log("Add to Cart Button is not displayed, we will try remove the item from the cart instead");
            if(await this.removeFromCartButton.isDisplayed()) {
                await this.removeFromCartButton.click();
            }
            else{
                console.log("No Remove Cart CTA is displayed also");
            }
        }
    
    }


}
export default new productDetails();