const SELECTORS = {
  modal: '[data-cy="modal"]',
  modalClose: '[data-cy="modal-close"]',
  modalOverlay: '[data-cy="modal-overlay"]'
} as const;

const TEXT = {
  fluorBun: 'Флюоресцентная булка R2-D3',
  molluskMeat: 'Мясо бессмертных моллюсков Protostomia',
  fillings: 'Начинки',
  addButton: 'Добавить',
  orderButton: 'Оформить заказ',
  chooseBuns: 'Выберите булки',
  chooseFillings: 'Выберите начинку',
  ingredientDetails: 'Детали ингредиента'
} as const;

Cypress.Commands.add('setupApp', () => {
  cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  cy.visit('/');
  cy.wait('@getIngredients');
});

Cypress.Commands.add('addIngredient', (ingredientName: string, sectionName?: string) => {
  if (sectionName) {
    cy.contains(sectionName).click({ force: true });
  }
  cy.contains(ingredientName).parents('li').within(() => {
    cy.contains(TEXT.addButton).click({ force: true });
  });
});

Cypress.Commands.add('buildBasicBurger', () => {
  cy.addIngredient(TEXT.fluorBun);
  cy.addIngredient(TEXT.molluskMeat, TEXT.fillings);
});

Cypress.Commands.add('handleModal', (
  action: 'open' | 'close',
  trigger?: string,
  closeMethod: 'button' | 'overlay' = 'button'
) => {
  switch (action) {
    case 'open':
      cy.contains(trigger!).click({ force: true });
      cy.get('#modals').find(SELECTORS.modal).should('exist');
      break;
    case 'close':
      if (closeMethod === 'overlay') {
        cy.get('#modals').find(SELECTORS.modalOverlay).click('center', { force: true });
      } else {
        cy.get('#modals').find(SELECTORS.modalClose).click({ force: true });
        cy.wait(100); 
      }
      cy.wait(500);
      cy.get('#modals').should('not.have.descendants', SELECTORS.modal);
      break;
  }
});

Cypress.Commands.add('checkConstructorState', (options: {
  isEmpty?: boolean;
  isComplete?: boolean;
  orderButtonVisible?: boolean;
} = {}) => {
  if (options.isEmpty) {
    cy.contains(TEXT.chooseBuns).should('be.visible');
    cy.contains(TEXT.chooseFillings).should('be.visible');
  }
  if (options.isComplete) {
    cy.contains(TEXT.chooseBuns).should('not.exist');
    cy.contains(TEXT.chooseFillings).should('not.exist');
  }
  if (options.orderButtonVisible) {
    cy.contains(TEXT.orderButton).should('be.visible');
  }
});

Cypress.Commands.add('setupAuth', () => {
  cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');
  cy.setCookie('accessToken', 'Bearer test.access.token');
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'test-refresh-token');
  });
});

Cypress.Commands.add('createOrder', () => {
  cy.contains(TEXT.orderButton).click({ force: true });
  cy.get('#modals').find(SELECTORS.modal).should('exist');
  cy.get('#modals').contains('идентификатор заказа').should('exist');
  cy.get('#modals').contains('424242').should('exist');
});
