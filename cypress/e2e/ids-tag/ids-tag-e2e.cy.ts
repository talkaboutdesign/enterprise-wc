import IdsTag from '../../../src/components/ids-tag/ids-tag';

describe('IdsTag e2e tests', () => {
  const url = 'http://localhost:4444/ids-tag/example.html';

  beforeEach(() => {
    cy.visit(url);
  });

  describe('general page checks', () => {
    it('should not have errors', () => {
      cy.visit(url, {
        onBeforeLoad(win) {
          cy.spy(win.console, 'error').as('consoleLog');
        },
      });
      cy.get('@consoleLog').should('not.be.called');
      cy.title().should('eq', 'IDS Tag Component');
    });

    it('should pass Axe accessibility tests', () => {
      cy.checkAxeErrors(undefined, {
        rules: {
          'color-contrast': { enabled: false },
        },
      });
    });
  });

  describe('component appending tests', () => {
    it('should be able to set attributes before append', () => {
      cy.document().then((doc: Document) => {
        const elem = doc.createElement('ids-tag') as IdsTag;
        elem.color = 'red';
        elem.clickable = true;
        elem.dismissible = true;
        elem.id = 'test';
        doc.body.appendChild(elem);
      });

      cy.get('#test')
        .invoke('attr', 'color')
        .should('eq', 'red');

      cy.get('#test').invoke('remove');
    });

    it('should be able to set attributes after append', () => {
      cy.document().then((doc: Document) => {
        const elem:any = doc.createElement('ids-tag');
        doc.body.appendChild(elem);
        elem.color = 'orange';
        elem.clickable = true;
        elem.dismissible = true;
        elem.id = 'test2';
      });

      cy.get('#test2')
        .invoke('attr', 'color')
        .should('eq', 'orange');

      cy.get('#test2').invoke('remove');
    });
  });
});
