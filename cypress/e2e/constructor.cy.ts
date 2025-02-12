//const API_URL = process.env.BURGER_API_URL;
const TEST_URL = 'http://localhost:4000';

describe('Интеграционные тесты для страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, {
      fixture: 'ingredients.json'
    });
    cy.intercept('GET', `api/auth/user`, {
      fixture: 'user.json'
    });
    cy.intercept('POST', `api/orders`, {
      fixture: 'order.json'
    }).as('newOrder');

    cy.setCookie('token', 'token');
    window.localStorage.setItem('token', 'token');
    cy.visit(TEST_URL);
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Тестирование конструктора', () => {
    it('Тест добавления ингредиентов из списка в конструктор', () => {
      cy.contains('li', 'Краторная булка N-200i').contains('Добавить').click();
      cy.contains('li', 'Флюоресцентная булка R2-D3')
        .contains('Добавить')
        .click();
      cy.contains('li', 'Соус традиционный галактический')
        .contains('Добавить')
        .click();
      cy.contains('li', 'Соус традиционный галактический')
        .contains('Добавить')
        .click();

      cy.get('[class=constructor-element__text]')
        .contains('Краторная булка N-200i')
        .should('not.exist');
      cy.get('[class=constructor-element__text]')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
      cy.get('[class=constructor-element__text]')
        .contains('Соус традиционный галактический')
        .should('exist');
      cy.contains('li', 'Соус традиционный галактический')
        .find('.counter__num')
        .contains('2');
    });
  });

  describe('Тестирование модальных окон', () => {
    it('Тест открытия модального окна ингредиента', () => {
      cy.contains('li', 'Краторная булка N-200i').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('#modals').contains('Краторная булка N-200i').should('exist');
    });
    it('Тест закрытия по клику на крестик', () => {
      cy.get('#modals').should('be.empty');
      cy.contains('li', 'Краторная булка N-200i').click();
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('be.empty');
    });
    it('Тест закрытия нажатием на оверлей', () => {
      cy.get('#modals').should('be.empty');
      cy.contains('li', 'Краторная булка N-200i').click();
      cy.get('body').click(0, 0);
      cy.get('#modals').should('be.empty');
    });
  });

  describe('Тестирование заказа', () => {
    it('Тест сборки бургера и оформления заказа', () => {
      cy.contains('li', 'Краторная булка N-200i').contains('Добавить').click();
      cy.contains('li', 'Соус традиционный галактический')
        .contains('Добавить')
        .click();
      cy.contains('li', 'Соус традиционный галактический')
        .contains('Добавить')
        .click();
      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@newOrder');
      cy.get('#modals').should('not.be.empty');
      cy.get('#modals').find('h2').contains('123').should('exist');
      cy.get('#modals').find('button').click();
      cy.get('#modals').should('be.empty');
      cy.get('div').contains('Выберите булки').should('exist');
      cy.get('div').contains('Выберите начинку').should('exist');
    });
  });
});
