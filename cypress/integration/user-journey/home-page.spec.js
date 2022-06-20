/// <reference types="cypress"/>

describe('Home Page', () => {
    beforeEach(() => {
        // Handle uncaught exceptions like stripe api and offline api requests
        // cy.on('uncaught:exception', (err, runnable) => {
        //     return false;
        //   });
        cy.visit('/');
    });

    it('Display the header navigation elements ', () => {
        cy
            .get('[data-testid="homepage-header-logo"]')
            .should('be.visible')
            .and('have.attr', 'src', '/img/images/DevSecOps-academy-wit.png')
            .get('#navbarNav > [href="/what-we-are"] > .nav-link > .menu-text')
            .should('have.length', 1)
            .and('have.text', 'Who we are')

            .get('#navbarNav > :nth-child(2) > .ant-dropdown-link')
            .should('have.length', 1)
            .and('have.text', 'Our Courses')

            .get('#navbarNav > [href="/fellowship"] > .nav-link > .menu-text')
            .should('have.length', 1)
            .and('have.text', 'Fellowship')

            .get('#navbarNav > [href="/for-business"] > .nav-link > .menu-text')
            .should('have.length', 1)
            .and('have.text', 'For Business')

            .get('[href="/news"] > .nav-link > .menu-text')
            .should('have.length', 1)
            .and('have.text', 'News')

            .get('#navbarNav > [target="_blank"] > .nav-link > .menu-text')
            .should('have.length', 1)
            .and('have.text', 'Careers');
    });

    it('Display `login` button and navigate to new route', () => {
        // Get Login Button then click it
        cy
            .get('#navbarNav > [href="/login"] > .fusion-textcolor-highlight > .menu-text')
            .should('be.visible')
            .and('have.text', 'Login')
            .click();

        // The new Route after `login` clicked
        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/login`);
    });

    it('Display `register now` button and navigate to new route', () => {
        // Get Register Button then click it
        cy
            .get('#navbarNav > [href="/register"] > .fusion-textcolor-highlight > .menu-text')
            .should('be.visible')
            .and('have.text', 'Register now')
            .click();

        // The new Route after `register` clicked
        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/register`);
    });
});
