/// <reference types="cypress"/>

describe('Sign Up', () => {
    beforeEach(() => {
        cy.visit('/register');
    });
    it('Display all `register` elements', () => {
        // The academy logo
        cy
            .get('[data-testid="register-header-logo"]')
            .should('be.visible')
            .and('have.css', 'background-image', `url("${Cypress.config().baseUrl}/img/academy_logo.svg")`);

        // The Register Title
        cy
            .get('[data-testid="register-header-title"]')
            .should('be.visible')
            .and('have.text', 'Please fill in all the input fields below and then activate your account via the e-mail you will receive');

        // firstName, lastName and Email field
        cy
            .get('#firstname')
            .should('be.visible')
            .type('test first name');

        cy
            .get('#lastname')
            .should('be.visible')
            .type('test last name');

        cy
            .get('#email')
            .should('be.visible')
            .type('test@test.test');

        // `Terms of service` checkbox
        cy
            .get('.ant-checkbox-wrapper > :nth-child(2)')
            .should('be.visible')
            .and('have.text', "I agree to DevSecOps Academy's Terms of Service");

        cy
            .get('#policy')
            .should('have.length', '1')
            .check()
            .uncheck();

        // Register Button
        cy
            .get('[data-testid="register-submit-button"]')
            .should('be.visible')
            .and('have.text', 'Register');

        cy
            .scrollTo('bottom');

        // Login option
        cy
            .contains('p', 'Have an account already?')
            .should('be.visible');

        cy
            .get('[data-testid="login-button"]')
            .should('be.visible')
            .and('have.text', 'Login');
    });

    it('Visit on `policy` link', () => {
        cy
            .get(':nth-child(2) > a')
            .should('have.attr', 'href')
            .and('include', '/policy')
            .then(href => {
                cy
                    .visit(href);
                cy
                    .visit('/register');
            });
    });

    it('Should navigate to `login` form when click on `login`', () => {
        cy
            .scrollTo('bottom');

        cy
            .get('[data-testid="login-button"]')
            .click();

        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/login`);
    });

    it('Click on `register` with empty fields', () => {
        cy
            .get('[data-testid="register-submit-button"]')
            .click();

        cy
            .get('#firstname:invalid')
            .should('have.length', 1);

        cy
            .get('#firstname:invalid')
            .invoke('prop', 'validationMessage')
            .should('eq', 'Please fill in this field.');

        // fill first name field then click register
        cy
            .get('#firstname')
            .type('test name')
            .should('have.value', 'test name');

        cy
            .get('[data-testid="register-submit-button"]')
            .click();

        cy
            .get('#lastname:invalid')
            .should('have.length', 1);

        cy
            .get('#lastname:invalid')
            .invoke('prop', 'validationMessage')
            .should('eq', 'Please fill in this field.');

        // Then fill last name and click register again
        cy
            .get('#lastname')
            .type('test name')
            .should('have.value', 'test name');

        cy
            .get('[data-testid="register-submit-button"]')
            .click();

        cy
            .get('#email:invalid')
            .should('have.length', 1);

        cy
            .get('#email:invalid')
            .invoke('prop', 'validationMessage')
            .should('eq', 'Please fill in this field.');
    });

    it('Click on `register` without accepting and checking the academy policy', () => {
        cy
            .registerInvalid('firstName', 'lastName', 'test@test.test');

        cy
            .get('.ant-message-custom-content > span')
            .should('have.text', 'Please agree with the Terms of Service')
            .and('be.visible');
    });

    it('Click on `register` with an existing email', () => {
        const testEmail = 'ion@araido.io';

        cy
            .registerValid('firstName', 'lastName', testEmail);

        cy
            .get('.ant-message-custom-content > span')
            .should('have.text', `The user with email ${testEmail} already exists!`)
            .and('be.visible');
    });

    it('Click on `register` different invalid emails', () => {
        cy
            .get('#firstname')
            .type('firstName')
            .should('have.value', 'firstName');

        cy
            .get('#lastname')
            .type('lastName')
            .should('have.value', 'lastName');

        // With missing '@'
        const testEmail1 = 'test';
        cy
            .get('#email')
            .type(testEmail1)
            .should('have.value', testEmail1);

        cy
            .get('[data-testid="register-submit-button"]')
            .click();

        cy
            .get('#email:invalid')
            .should('have.length', 1);

        cy
            .get('#email:invalid')
            .invoke('prop', 'validationMessage')
            .should('eq', `Please include an '@' in the email address. '${testEmail1}' is missing an '@'.`);

        // With missing part after '@'
        const testEmail2 = 'test@';
        cy
            .get('#email')
            .clear()
            .type(testEmail2)
            .should('have.value', testEmail2);

        cy
            .get('[data-testid="register-submit-button"]')
            .click();

        cy
            .get('#email:invalid')
            .should('have.length', 1);

        cy
            .get('#email:invalid')
            .invoke('prop', 'validationMessage')
            .should('eq', `Please enter a part following '@'. '${testEmail2}' is incomplete.`);

        // With incorrect email ending
        const testEmail3 = 'test@gmail.';
        const testEmail3Array = testEmail3.split('@');
        cy
            .get('#email')
            .clear()
            .type(testEmail3)
            .should('have.value', testEmail3);
        cy
            .get('[data-testid="register-submit-button"]')
            .click();
        cy
            .get('#email:invalid')
            .should('have.length', 1);
        cy
            .get('#email:invalid')
            .invoke('prop', 'validationMessage')
            .should('eq', `'.' is used at a wrong position in '${testEmail3Array[1]}'.`);

        // clear data of input field
        cy
            .get('#email')
            .clear()
            .type(testEmail3)
            .should('have.value', testEmail3);
    });

    it('Click `Activate` with Invalid and Unmatched passwords ', () => {
        const newUserEmail = `test${Math.floor(Math.random() * 1000) + 1}@example.com`;

        cy
            .registerValid('firstName', 'lastName', newUserEmail);

        cy
            .task('queryDb', `SELECT firstname,lastname,email,atoken FROM users WHERE email='${newUserEmail}';`)
            .then(results => {
                cy
                    .visit(`/account-activation/${results[0].atoken}`);
            });

        cy
            .get('.ant-typography')
            .should('have.text', 'Account activation')
            .and('be.visible');

        // Invalid password and confirm password which less than 6 characters
        const shortPassword = 'test';
        const shortConfirmPassword = 'test';
        cy
            .get('#activate_account_password')
            .should('be.visible')
            .type(shortPassword)
            .should('have.value', shortPassword);

        cy
            .get('.ant-form-explain')
            .should('be.visible')
            .and('have.text', 'password must be at least 6 characters');

        cy
            .get('#activate_account_password')
            .clear();

        cy
            .get('#activate_account_confirm_password')
            .should('be.visible')
            .type(shortConfirmPassword)
            .should('have.value', shortConfirmPassword);

        cy
            .get(':nth-child(2) > .ant-col > .ant-form-item-control > .ant-form-explain')
            .should('be.visible')
            .and('have.text', 'confirm_password must be at least 6 characters');

        cy
            .get('#activate_account_confirm_password')
            .clear();

        // With not matched passwords
        const password = 'test123';
        const invalidConfirmPassword = 'test1234';
        cy
            .get('#activate_account_password')
            .should('be.visible')
            .type(password);

        cy
            .get('#activate_account_confirm_password')
            .should('be.visible')
            .type(invalidConfirmPassword)
            .should('have.value', invalidConfirmPassword);

        cy
            .get('.ant-btn')
            .should('be.visible')
            .and('have.text', 'Activate')
            .click();

        cy
            .get('.ant-message-custom-content > span')
            .should('be.visible');
    });

    it('Click on `register` with valid data, Activate the account then `login` with user data', () => {
        const newUserEmail = `test${Math.floor(Math.random() * 1000000) + 1}@example.com`;

        cy
            .registerValid('firstName', 'lastName', newUserEmail);

        cy
            .task('queryDb', `SELECT firstname,lastname,email,atoken FROM users WHERE email='${newUserEmail}';`)
            .then(results => {
                cy
                    .visit(`/account-activation/${results[0].atoken}`);
            });

        const password = 'test123';
        cy
            .get('.ant-typography')
            .should('have.text', 'Account activation')
            .and('be.visible');

        cy
            .get('#activate_account_password')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'New Password')
            .type(password)
            .should('have.value', password);

        cy
            .get('#activate_account_confirm_password')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'Confirm New Password')
            .type(password)
            .should('have.value', password);

        cy
            .get('.ant-btn')
            .should('be.visible')
            .and('have.text', 'Activate')
            .click();

        cy
            .contains('Account activated.')
            .should('have.length', '1')
            .and('be.visible')
            .and('have.text', 'Account activated.');

        cy
            .login(newUserEmail, password);

        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/platform`);

        cy
            .get('.my-courses-title')
            .should('have.text', 'My DevSecOps Learning Path');

        // log out
        cy.get('.logoutContainer > .anticon > svg').click();
    });
});
