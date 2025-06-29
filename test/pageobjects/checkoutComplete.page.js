class checkComplete {

    get pageHeaderText() {
        return $('.complete-header');
    }

    get completeText() {
        return $('.complete-text');
    }

    get backHomeButton() {
        return $('#back-to-products');
    } 
}

export default new checkComplete();