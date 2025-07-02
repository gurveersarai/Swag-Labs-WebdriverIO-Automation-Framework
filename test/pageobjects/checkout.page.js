class checkoutPage {

    get checkoutPageTitle() {
        return $('.title')
    }

    get checkoutForm() {
        return $('.checkout_info')
    }

    get firstNameInput() {
        return $('#first-name')
    }

    get lastNameInput() {
        return $('#last-name')
    }

    get postalCodeInput() {
        return $('#postal-code')
    }

    get continueButton() {
        return $('#continue')
    }

    get errorModal() {
        return $('[data-test="error"]')
    }
    
    async enterFormDetails(FirstName,LastName,PostalCode) {
        await this.firstNameInput.setValue(FirstName)
        await this.lastNameInput.setValue(LastName)
        await this.postalCodeInput.setValue(PostalCode)
    }
}

export default new checkoutPage()