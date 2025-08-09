describe('Конструктор бургера', () => {
  it('загружает ингредиенты и добавляет булку и начинку', () => {
    cy.setupApp();
    cy.buildBasicBurger();
    cy.checkConstructorState({ isComplete: true, orderButtonVisible: true });
  });

  it('открывает и закрывает модалку ингредиента', () => {
    cy.setupApp();
    
    cy.handleModal('open', 'Флюоресцентная булка R2-D3');
    cy.contains('Детали ингредиента').should('exist');
    cy.handleModal('close');

    cy.handleModal('open', 'Флюоресцентная булка R2-D3');
    cy.handleModal('close', undefined, 'overlay');
  });

  it('создает заказ и очищает конструктор', () => {
    cy.setupAuth();
    cy.setupApp();
    cy.wait('@getUser');
    
    cy.buildBasicBurger();
    cy.createOrder();
    cy.handleModal('close');
    cy.checkConstructorState({ isEmpty: true });
  });
});