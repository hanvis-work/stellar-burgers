describe('Интеграционные тесты для страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'newOrder'
    );

    cy.setCookie('token', 'token');
    window.localStorage.setItem('token', 'token');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const addIngredient = (name: string) => {
    cy.contains('li', name).contains('Добавить').click();
  };

  const checkIngredientInConstructor = (name: string, exists = true) => {
    cy.get('[class=constructor-element__text]')
      .contains(name)
      .should(exists ? 'exist' : 'not.exist');
  };

  const modal = () => cy.get('#modals');

  describe('Тестирование конструктора', () => {
    it('Тест добавления ингредиентов из списка в конструктор', () => {
      addIngredient('Краторная булка N-200i');
      addIngredient('Флюоресцентная булка R2-D3');
      addIngredient('Соус традиционный галактический');
      addIngredient('Соус традиционный галактический');

      checkIngredientInConstructor('Краторная булка N-200i', false);
      checkIngredientInConstructor('Флюоресцентная булка R2-D3');
      checkIngredientInConstructor('Соус традиционный галактический');

      cy.contains('li', 'Соус традиционный галактический')
        .find('.counter__num')
        .contains('2');
    });
  });

  describe('Тестирование модальных окон', () => {
    const openIngredientModal = (name: string) => {
      cy.contains('li', name).click();
    };

    it('Тест открытия модального окна ингредиента', () => {
      openIngredientModal('Краторная булка N-200i');
      cy.contains('Детали ингредиента').should('exist');
      modal().contains('Краторная булка N-200i').should('exist');
    });

    it('Тест закрытия по клику на крестик', () => {
      modal().should('be.empty');
      openIngredientModal('Краторная булка N-200i');
      modal().find('button').click();
      modal().should('be.empty');
    });

    it('Тест закрытия нажатием на оверлей', () => {
      modal().should('be.empty');
      openIngredientModal('Краторная булка N-200i');
      cy.get('body').click(0, 0);
      modal().should('be.empty');
    });
  });

  describe('Тестирование заказа', () => {
    it('Тест сборки бургера и оформления заказа', () => {
      addIngredient('Краторная булка N-200i');
      addIngredient('Соус традиционный галактический');
      addIngredient('Соус традиционный галактический');

      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@newOrder');

      modal().should('not.be.empty');
      modal().find('h2').contains('123').should('exist');
      modal().find('button').click();
      modal().should('be.empty');

      cy.get('div').contains('Выберите булки').should('exist');
      cy.get('div').contains('Выберите начинку').should('exist');
    });
  });
});
