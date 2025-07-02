import { browser } from '@wdio/globals'

class productPage {

    get productPagetitle() {
        return $('span.title');
    } 

    get productContainers() {
        return $$('.inventory_item');
    }

    get productItemLink() {
        return $$('.inventory_item_name');
    }
    
    get productImg() {
        return $$('.inventory_item_img');
    }
    // This method is used to return and print the names of all products on the product overview page.
    async productNames() {
        
        for (let i = 0; i < await this.productContainers.length; i++) {
            const itemName = await this.productContainers[i].$('.inventory_item_name').getText();
             console.log(`Product Name:  ${itemName}`);
        }
    }
    // This method is used to add all products to the cart and return the count of successfully added products.
    async addAllProducts() 
    {
        const itemContainer = await $$('.inventory_item');
        let count = 0;
        for (let i = 0; i < itemContainer.length; i++) {
            const addToCartButton = await itemContainer[i].$('.btn_inventory');
            
            if (await addToCartButton.isDisplayed()) {
                await addToCartButton.click();
                if (await addToCartButton.getText() === 'Remove') {
                    console.log(`Product at index ${i} added to cart.`);
                    count++;
                }
                else {
                    console.log(`Product at index ${i} is missing the Remove button.`)
                }
                
            } else {
                console.log(`Add to cart button not found for product at index ${i}.`);
            }
        }
        return count 
    }
}

export default new productPage();