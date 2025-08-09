declare global {
    namespace Cypress {
      interface Chainable {
        setupApp(): Chainable<void>;
        addIngredient(ingredientName: string, sectionName?: string): Chainable<void>;
        buildBasicBurger(): Chainable<void>;
        handleModal(
          action: 'open' | 'close',
          trigger?: string,
          closeMethod?: 'button' | 'overlay'
        ): Chainable<void>;
        checkConstructorState(options?: {
          isEmpty?: boolean;
          isComplete?: boolean;
          orderButtonVisible?: boolean;
        }): Chainable<void>;
        setupAuth(): Chainable<void>;
        createOrder(): Chainable<void>;
      }
    }
  }
  
  export {};