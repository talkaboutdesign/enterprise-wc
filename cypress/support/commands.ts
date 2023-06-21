/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('checkAxeErrors', (context: string | Node | undefined, options: any) => {
  const terminalLog = (violations: any) => {
    cy.task(
      'log',
      `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'
      } ${violations.length === 1 ? 'was' : 'were'} detected`
    );
    const violationData = violations.map(
      ({
        id,
        impact,
        description,
        nodes
      }: any) => ({
        id,
        impact,
        description,
        nodes: nodes.length
      })
    );
    cy.task('table', violationData);
  };

  // Not needed if running `npm run test:build`
  // cy.get('meta[http-equiv="Content-Security-Policy"]').invoke('remove');
  cy.injectAxe();
  cy.checkA11y(context || undefined, options || undefined, terminalLog);
});
