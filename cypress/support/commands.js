// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Log in Command
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login');
    cy.get('#email').should('be.visible').type(email).and('have.value', email);
    cy.get('.login-password-toggle').click();
    cy.get('#password').should('be.visible').type(password).and('have.value', password);
    cy.get('.login-password-toggle').click();
    cy.contains('button', 'Log in').click();
});

// Register Command
Cypress.Commands.add('registerValid', (firstName, lastName, email) => {
    cy.get('#firstname').type(firstName).should('have.value', firstName);
    cy.get('#lastname').type(lastName).should('have.value', lastName);
    cy.get('#email').type(email).should('have.value', email);
    cy.get('#policy').should('have.length', '1').check();
    cy.get('[data-testid="register-submit-button"]').click();
});
Cypress.Commands.add('registerInvalid', (firstName, lastName, email) => {
    cy.get('#firstname').type(firstName).should('have.value', firstName);
    cy.get('#lastname').type(lastName).should('have.value', lastName);
    cy.get('#email').type(email).should('have.value', email);
    cy.get('[data-testid="register-submit-button"]').click();
});
