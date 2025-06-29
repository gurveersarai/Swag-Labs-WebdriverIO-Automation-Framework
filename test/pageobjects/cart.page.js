class cartPage {

    get cartTitle() {
        return $('.title');
    }

    get continueShoppingButton() {
        return $('#continue-shopping');
    }

    get checkoutButton() {
        return $('#checkout');
    }
    
    async cartItems() {
        const items = await $$('.cart_item');
        let itemDetails = [];
        for (let item of items) {
            const name = await item.$('.inventory_item_name').getText();
            const price = await item.$('.inventory_item_price').getText();
            itemDetails.push({ name, price });
        }
        return itemDetails;

    }

    async removeItem(index) {
        let RemoveItemsButton = await $$('.cart_item button')
        await RemoveItemsButton[index].click()
    }


}

export default new cartPage();