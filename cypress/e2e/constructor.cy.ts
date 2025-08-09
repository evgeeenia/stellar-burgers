/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  });

  it('загружает ингредиенты и добавляет булку и начинку', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    // Добавляем булку
    cy.contains('Булки').should('exist');
    cy.contains('Флюоресцентная булка R2-D3').parents('li').within(() => {
      cy.contains('Добавить').click();
    });

    // Добавляем начинку 
    cy.contains('Начинки').click();
    cy.contains('Мясо бессмертных моллюсков Protostomia').parents('li').within(() => {
      cy.contains('Добавить').click();
    });

    // Проверяем, что в конструкторе появились элементы и кнопка доступна
    cy.contains('Выберите булки').should('not.exist');
    cy.contains('Выберите начинку').should('not.exist');
    cy.contains('Оформить заказ').should('be.visible');
  });

  it('открывает и закрывает модалку ингредиента', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    // Открываем модалку ингредиента кликнув по карточке
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('Детали ингредиента').should('exist');

    // Закрытие по крестику
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Открываем снова и закрываем кликом по оверлею
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal-overlay"]').click('center', { force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('создает заказ и очищает конструктор', () => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    // Подставляем токены авторизации
    cy.setCookie('accessToken', 'Bearer test.access.token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');

    // Дождаться проверки авторизации
    cy.wait('@getUser');

    // Собираем бургер
    cy.contains('Флюоресцентная булка R2-D3').parents('li').within(() => {
      cy.contains('Добавить').click();
    });
    cy.contains('Начинки').click();
    cy.contains('Мясо бессмертных моллюсков Protostomia').parents('li').within(() => {
      cy.contains('Добавить').click();
    });

    // Оформляем заказ
    cy.contains('Оформить заказ').click();

    // Проверяем модалку с номером заказа
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('идентификатор заказа').should('exist');
    cy.contains('424242').should('exist');

    // Закрываем модалку
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверяем, что конструктор пуст
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});

