/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    checkAxeErrors(context?: any, options?: any): Chainable<void>
  }
}

Cypress.on('window:before:load', (win) => {
  cy.stub(win.console, 'error', (msg) => {
    cy.now('task', 'error', msg);
    throw new Error(msg); // all we needed to add!
  });

  cy.stub(win.console, 'warn', (msg) => {
    cy.now('task', 'warn', msg);
  });
});
