class checkoutOverview {

    async checkoutPaymentDetails() {
        if (await $('.summary_info').isDisplayed()) {
            const details = () => Promise.all([
                $('.summary_value_label').getText(),
                $('[data-test="shipping-info-value"]').getText(),
                $('summary_subtotal_label').getText(),
                $('.summary_tax_label').getText(),
                $('.summary_total_label').getText()
            ])
            return details
        }
        else{
            console.log("Checkout Overview is not displayed")
            return null;
        }   
        }

    get finishButton() {
        return $('#finish');
    }
    }




export default new checkoutOverview();  