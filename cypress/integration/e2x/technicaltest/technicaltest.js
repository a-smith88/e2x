import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const uuid = () => Cypress._.random(0, 1e6)
const id = uuid()
const randomemail = `email${id}`

Given('user is on the cornerstone website homepage', () => {
    cy.visit('https://cornerstone-light-demo.mybigcommerce.com/')
    cy.url().should('be.equal', 'https://cornerstone-light-demo.mybigcommerce.com/')
})

And('searches for a Shower Curtain', () => {
    cy.get('[data-search="quickSearch"]').click()
    cy.get('#nav-quick-search').should('be.visible')
    cy.get('#nav-quick-search').type('Shower Curtain{enter}')
    cy.get('.card-title > a').should('contain','Shower Curtain')  
})

When('user adds the item to the cart', () => {
    cy.get('[data-button-type="add-cart"]').click()
    cy.get('.cart-item-title').should('contain','Shower Curtain')
})

And('proceeds to checkout', () => {
    cy.contains("Check out").click()
    cy.url().should('include', '/checkout') 
})

Then('user can complete the purchase', () => {

    cy.get('#email')
    .should('be.visible')
    .type(randomemail)
    .type('@address.com')
    cy.get('#privacyPolicy')
    .should('be.visible')
    .check({force:true})
  cy.get('[data-test="customer-continue-as-guest-button"]').click()

  cy.get('[data-test="firstNameInput-text"]')
    .type('John')
    .should('have.value', 'John')
  cy.get('[data-test="lastNameInput-text"]')
    .type('Person')
    .should('have.value', 'Person')
  cy.get('[data-test="addressLine1Input-text"]')
    .type('22 Fake Street')
    .should('have.value', '22 Fake Street')
  cy.get('[data-test="cityInput-text"]')
    .type('Fakecity')
    .should('have.value', 'Fakecity')
  cy.get('[data-test="postCodeInput-text"]')
    .type('BN1 3FT')
    .should('have.value', 'BN1 3FT')
    cy.get('[data-test="phoneInput-text"]')
    .type('01818118181')
    .should('have.value', '01818118181')

  cy.contains("Continue",{ timeout: 15000 })
    .should('be.enabled')
    .click()

  cy.get('#ccNumber')
    .should('be.visible')
    .type('4111 1111 1111 1111')
    .should('have.value', '4111 1111 1111 1111')
  cy.get('#ccExpiry')
    .should('be.visible')
    .type('12 / 24')
    .should('have.value', '12 / 24')
  cy.get('#ccName')
    .should('be.visible')
    .type('John Person')
    .should('have.value', 'John Person')
  cy.get('#ccCvv')
    .should('be.visible')
    .type('123')
    .should('have.value', '123')

  cy.contains("Place Order")
    .should('be.enabled')
    .click()
})

And('see an order confirmation', () => {
    cy.url().should('include', '/order-confirmation')
    cy.get('[data-test="cart-item-product-title"]').should('contain','Shower Curtain')
    cy.get('[data-test="order-confirmation-heading"]').should('contain','Thank you')
})
