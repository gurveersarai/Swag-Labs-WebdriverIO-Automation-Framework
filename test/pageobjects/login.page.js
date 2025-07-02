import { $ } from '@wdio/globals'
import Page from './productOverview.page.js';


class loginPage {
    
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }
    // This method is used to open the login page.
    async login(username, password) {
        await this.inputUsername.addValue(username);
        await this.inputPassword.addValue(password);
        await this.btnSubmit.click();
    }
    // returns the error message when login fails
    async errorMessage() {
        const errorMessage = await $('h3[data-test="error"]').getText();
        return errorMessage;
    }
}

export default new loginPage();




