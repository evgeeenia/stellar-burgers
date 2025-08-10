describe('Конструктор бургера', () => {
  it('загружает ингредиенты и добавляет булку и начинку', () => {
    cy.setupApp();
    
    cy.contains('Флюоресцентная булка R2-D3').should('exist');
    cy.contains('Мясо бессмертных моллюсков Protostomia').should('exist');
    cy.contains('Соус фирменный Space Sauce').should('exist');
    
    cy.addIngredient('Флюоресцентная булка R2-D3');
    cy.get('[data-cy="constructor-bun-top"]').should('contain', 'Флюоресцентная булка R2-D3');
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', 'Флюоресцентная булка R2-D3');
    
    cy.addIngredient('Мясо бессмертных моллюсков Protostomia', 'Начинки');
    cy.get('[data-cy="constructor-filling"]').should('contain', 'Мясо бессмертных моллюсков Protostomia');
    
    cy.checkConstructorState({ isComplete: true, orderButtonVisible: true });
  });

  it('открывает и закрывает модалку ингредиента', () => {
    cy.setupApp();
    
    cy.handleModal('open', 'Флюоресцентная булка R2-D3');
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').should('exist');
    cy.contains('643').should('exist'); 
    cy.contains('44').should('exist'); 
    cy.contains('26').should('exist'); 
    cy.contains('85').should('exist'); 
    cy.contains('988').should('exist'); 
    cy.handleModal('close');

    cy.handleModal('open', 'Мясо бессмертных моллюсков Protostomia');
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Мясо бессмертных моллюсков Protostomia').should('exist');
    cy.contains('420').should('exist'); 
    cy.contains('433').should('exist'); 
    cy.contains('244').should('exist'); 
    cy.contains('33').should('exist'); 
    cy.contains('300').should('exist'); 
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