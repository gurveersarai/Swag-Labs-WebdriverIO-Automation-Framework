import { $ } from '@wdio/globals'
import Page from './productOverview.page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export default class LoginPage {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    async login (username, password) {
        await this.inputUsername.addValue(username);
        await this.inputPassword.addValue(password);
        await this.btnSubmit.click();
    }

    async errorMessage() {
        const errorMessage = await $('h3[data-test="error"]').getText();
        return errorMessage;
    }
}


