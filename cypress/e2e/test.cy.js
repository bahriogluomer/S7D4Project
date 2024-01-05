/* eslint-disable no-undef */

describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); 
  });

  it('should display the login form', () => {
    cy.get('h1').should('contain', 'Login');
    cy.get('form').should('exist');
  });

  it('should show an error for invalid email', () => {
    cy.get('#email').type('invalid-email');
    cy.get('#password').type('validpassword');
    cy.get('#terms').check();

    cy.get('[data-cy=login-submit]').should('be.disabled');
    cy.get('#email').should('have.class', 'is-invalid');
    cy.get('.invalid-feedback').should('contain', 'invalid email');
  });

  it('should show an error for invalid password', () => {
    cy.get('#email').type('validemail@example.com');
    cy.get('#password').type('123'); 
    cy.get('#terms').check();

    cy.get('[data-cy=login-submit]').should('be.disabled');
    cy.get('#password').should('have.class', 'is-invalid');
    cy.get('.invalid-feedback').should('contain', 'invalid password');
  });

  it('should submit the form when all fields are valid', () => {
    cy.get('#email').type('validemail@example.com');
    cy.get('#password').type('validpassword');
    cy.get('#terms').check();

    cy.get('[data-cy=login-submit]').should('not.be.disabled').click();

    
  });
});