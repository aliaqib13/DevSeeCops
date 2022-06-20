/// <reference types="cypress"/>

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('Display all `login` elements', () => {
        // The academy logo
        cy
            .get('.login-card-header')
            .should('be.visible')
            .and('have.css', 'background-image', `url("${Cypress.config().baseUrl}/img/academy_logo.svg")`);

        // The login Title
        cy
            .get('.login-card-title')
            .should('be.visible')
            .and('have.text', 'Sign in to the DevSecOps Academy');

        // Email and password input field
        cy
            .get('.login-email')
            .should('be.visible');
        cy
            .get('.login-password')
            .should('be.visible')
            .type('test');
        cy
            .get('.login-password-toggle')
            .click();
        cy
            .get('.login-password')
            .type('test');
        cy
            .get('.login-password-toggle')
            .click();

        // Reset password text
        cy
            .get('.top-space')
            .should('be.visible')
            .and('have.text', 'Forgot your password?Reset password');

        cy
            .get('.request-reset-email')
            .should('be.visible')
            .and('have.text', 'Reset password');

        // Login Button
        cy
            .contains('button', 'Log in')
            .should('be.visible');

        // line between login form and register button
        cy
            .get('.login-card-hr')
            .should('be.visible');

        // Register option
        cy
            .get('.login-forgot-password')
            .should('be.visible');
        cy
            .contains('button', 'Register')
            .should('be.visible');
    });

    it('Login with invalid email ', () => {
        // Enter invalid email
        cy
            .get('.login-email')
            .should('be.visible')
            .type('test@test.test');

        cy
            .get('.login-password-toggle')
            .click();

        // Enter invalid password
        cy
            .get('.login-password')
            .should('be.visible')
            .type('admin123');

        // Click on `login`
        cy
            .contains('button', 'Log in')
            .click();

        // The end results
        cy
            .get('.ant-message-notice-content')
            .should('be.visible');
    });

    it('Login with valid email and password ', () => {
        // Enter email and password that exist using `login` Command
        cy
            .login('ion@araido.io', 'admin123');

        // The results
        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/platform`);
        cy
            .get('.my-courses-title')
            .should('have.text', 'My DevSecOps Learning Path');

        // log out
        cy.get('.logoutContainer > .anticon > svg').click();
    });

    it('Reset password shows error message if email is empty', () => {
        cy
            .get('.request-reset-email')
            .click();
        cy
            .get('.ant-message-custom-content > span')
            .should('have.text', 'Please fill in your email!');
    });

    it('Reset password with user email', () => {
        cy
            .get('.login-email')
            .should('be.visible')
            .type('ion@araido.io');

        cy
            .get('.request-reset-email')
            .click();

        cy
            .get('.ant-modal-confirm-title')
            .should('be.visible');

        cy
            .get('.ant-btn-danger')
            .should('be.visible')
            .and('have.text', 'Yes');

        cy
            .get('.ant-modal-confirm-btns > :nth-child(1)')
            .should('be.visible')
            .and('have.text', 'No');

        cy
            .get('[style="width: 304px; height: 78px;"] > div > iframe')
            .should('be.visible');

        // mock reCAPTCHA
    });

    it('Click on register button', () => {
        cy
            .contains('button', 'Register')
            .should('be.visible')
            .click();

        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/register`);
    });
});
