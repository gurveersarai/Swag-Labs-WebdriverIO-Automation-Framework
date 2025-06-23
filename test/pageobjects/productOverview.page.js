import { browser } from '@wdio/globals'

class ProductPage {

    get productPagetitle() {
        return $('span.title');
    } 

    get productContainers() {
        return $$('.inventory_item');
    }
    async productNames() {
        
        for (let i = 0; i < this.productContainers.length; i++) {
            const itemName = await this.productContainers[i].$('.inventory_item_name').getText();
            console.log(`Product Name: ${itemName}`);
        }
    }

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

export default new ProductPage();