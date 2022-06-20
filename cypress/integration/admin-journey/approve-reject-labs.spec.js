describe('Approve / Reject active labs', () => {
    beforeEach(() => {
        // Handle uncaught exceptions like stripe api and offline api requests
        // cy.on('uncaught:exception', (err, runnable) => {
        //     return false;
        //   });

        cy
            .visit('/');

        // Get Login Button then click it
        cy
            .get('#navbarNav > [href="/login"] > .fusion-textcolor-highlight > .menu-text')
            .should('be.visible')
            .and('have.text', 'Login')
            .click();

        // run these tests as if in a desktop with viewport (1536, 960)
        // https://docs.cypress.io/api/commands/viewport#Arguments
        cy.viewport(1536, 960);

        // The new Route after `login` clicked
        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/login`);

        // Login as Admin
        const adminEmail = 'dominik@araido.io';
        const adminPassword = 'leukhoor';
        cy
            .login(adminEmail, adminPassword);

        cy
            .get('.rightContainer > :nth-child(1)')
            .should('be.visible')
            .and('have.text', 'Dominik de Smit');
    });

    it('Log-in as an admin and navigate to `admin` Dashboard', () => {
        // Admin DashBoard exist in the sidebar menu
        cy
            .get('.ant-menu-submenu-title')
            .should('be.visible')
            .and('have.text', 'Admin')
            .click();

        cy
            .get('h1.ant-typography')
            .should('be.visible')
            .and('have.text', 'Admin Dashboard');

        // Navigate to `Labs History` from `labs Adminstration` tab
        // Get `Labs Adminstration` tab and click on
        cy
            .contains('Labs Administration')
            .should('be.visible')
            .and('have.text', 'Labs Administration').click();

        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/platform/admin/active-labs`);

        cy
            .get('.ant-typography')
            .should('be.visible')
            .and('have.text', 'Active Labs');

        cy
            .get('.ant-menu-item-selected > .active')
            .should('be.visible')
            .and('have.text', 'Active Labs');

        cy
            .contains('Labs History')
            .should('be.visible')
            .and('have.text', 'Labs History');

        cy
            .contains('Jobs')
            .should('be.visible')
            .and('have.text', 'Jobs');

        // Click on `Labs History`
        cy
            .contains('Labs History')
            .should('be.visible')
            .click();

        cy
            .url()
            .should('eq', `${Cypress.config().baseUrl}/platform/admin/labs`);
        cy
            .get('.ant-typography')
            .should('be.visible')
            .and('have.text', 'Labs History');

        // Columns titles are visible
        cy
            .get(':nth-child(1) > .ant-table-header-column > div > .ant-table-column-title')
            .should('be.visible')
            .and('have.text', 'Name');

        cy
            .get(':nth-child(2) > .ant-table-header-column > div')
            .should('be.visible')
            .and('have.text', 'Platform');

        cy
            .get('.ant-input')
            .should('be.visible')
            .and('have.attr', 'placeholder', 'Search lab by user');

        cy
            .get(':nth-child(4) > .ant-table-header-column > div > .ant-table-column-title')
            .should('be.visible')
            .and('have.text', 'Start time');

        cy
            .get(':nth-child(5) > .ant-table-header-column > div > .ant-table-column-title')
            .should('be.visible')
            .and('have.text', 'End time');

        cy
            .get(':nth-child(6) > .ant-table-header-column > :nth-child(1) > .ant-table-column-title > .ant-select > .ant-select-selection')
            .should('be.visible');

        cy
            .get(':nth-child(7) > .ant-table-header-column > div > .ant-table-column-title')
            .should('be.visible')
            .and('have.text', 'Duration');

        cy
            .get(':nth-child(8) > .ant-table-header-column > div > .ant-table-column-title')
            .should('be.visible')
            .and('have.text', 'Actions');

        cy
            .get('.ant-table-row-cell-last > .ant-table-header-column > :nth-child(1) > .ant-table-column-title > .ant-select > .ant-select-selection')
            .should('be.visible');

        // Approve & Reject Button are presented
        cy
            .get('.approve-btn')
            .first()
            .should('be.visible')
            .and('have.text', 'Approve')
            .and('have.css', 'background-color', 'rgb(82, 196, 26)');
        cy
            .get('.reject-btn')
            .first()
            .should('be.visible')
            .and('have.text', 'Reject')
            .and('have.css', 'background-color', 'rgb(255, 77, 79)');
    });

    it('Admin can Approve a lab ', () => {
        // Get `Labs Adminstration` tab and click on
        cy
            .get('.ant-menu-submenu-title')
            .click();

        // Get `Labs Adminstration` tab and click on
        cy
            .contains('Labs Administration')
            .click();

        // Click on `Labs History`
        cy
            .contains('Labs History')
            .should('be.visible')
            .click();

        // Click on Approve Button
        cy
            .get('.approve-btn')
            .first()
            .should('be.visible')
            .click();

        // Confirmation Modal
        cy
            .get('.ant-modal-confirm-title')
            .should('be.visible')
            .and('have.text', 'Are you sure Change this lab status to Completed?');
        cy
            .get('.ant-modal-confirm-btns > :nth-child(1)')
            .should('be.visible')
            .and('have.text', 'No');
        cy
            .get('.ant-modal-confirm-btns > .ant-btn-primary')
            .should('be.visible')
            .and('have.text', 'Yes');

        // Click `No` Exit the modal
        cy
            .get('.ant-modal-confirm-btns > :nth-child(1)')
            .click();
        cy
            .get('.ant-typography')
            .should('be.visible')
            .and('have.text', 'Labs History');

        // Click `Yes` to Approve Lab
        cy
            .get('.approve-btn')
            .first()
            .should('be.visible')
            .click();
        cy
            .get('.ant-modal-confirm-btns > .ant-btn-primary')
            .click();
        cy
            .get('.ant-message-custom-content > span')
            .should('be.visible')
            .and('have.text', 'Complete Lab and generate Certificate');
        cy
            .get('.ant-message-custom-content > span', { timeout: 25000 })
            .should('be.visible')
            .and('have.text', 'Lab is Completed');
    });

    it('Admin can Reject a lab', () => {
        // Get `Labs Adminstration` tab and click on
        cy
            .get('.ant-menu-submenu-title')
            .click();

        // Get `Labs Adminstration` tab and click on
        cy
            .contains('Labs Administration')
            .click();

        // Click on `Labs History`
        cy
            .contains('Labs History')
            .should('be.visible')
            .click();

        // Click on Reject Button
        cy
            .get('.reject-btn')
            .first()
            .should('be.visible')
            .click();

        // Reject confirmation Modal
        cy
            .get('.ant-modal-confirm-title')
            .should('be.visible')
            .and('have.text', 'Are you sure you want to reject this lab?');
        cy
            .get('.ant-modal-confirm-btns > :nth-child(1)')
            .should('be.visible')
            .and('have.text', 'No');
        cy
            .get('.ant-modal-confirm-btns > .ant-btn-primary')
            .should('be.visible')
            .and('have.text', 'Yes');
        cy
            .get('.send-email-checkbox > :nth-child(2)')
            .should('be.visible')
            .and('have.text', 'Send an email');

        // Check and uncheck `Send an email`
        //   cy.get('.send-email-checkbox').uncheck().check()

        // Click `No` Exit the modal
        cy
            .get('.ant-modal-confirm-btns > :nth-child(1)')
            .click();
        cy
            .get('.ant-typography')
            .should('be.visible')
            .and('have.text', 'Labs History');

        // Click `Yes` to Approve Lab
        cy
            .get('.reject-btn')
            .first()
            .should('be.visible')
            .click();
        cy
            .get('.ant-modal-confirm-btns > .ant-btn-primary')
            .click();
        cy
            .get('.ant-message-custom-content > span')
            .should('be.visible')
            .and('have.text', 'Lab is rejected');
    });
});
