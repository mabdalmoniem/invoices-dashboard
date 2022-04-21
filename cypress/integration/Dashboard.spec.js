describe('Dashboard Suite', () => {
  it('renders "empty results" message when account number is wrong', () => {
    cy.visit('/')
    cy.contains("Enter some input to get started 🏃")
    cy.get("[data-test=account-number-test]").type("this is a test", {delay: 0})
    cy.contains("The input you have entered doesn't match any usage records 😔")
  })

  it('renders "success" message when account number is correct', () => {
    cy.visit('/')
    cy.contains("Enter some input to get started 🏃")
    cy.get("[data-test=account-number-test]").type("AC977a3102fe6a45dd7dd2b70895049f7f", {delay: 0})
    cy.contains("Here is the results 👀")
  })

  it('clears the form after clicking on reset button', () => {
    cy.visit('/')
    cy.contains("Enter some input to get started 🏃")
    cy.get("[data-test=account-number-test]").type("this is a test", {delay: 0})
    cy.get("[data-test=reset-btn]").click()
    cy.get("[data-test=account-number-test]").should('be.empty')
  })

  it('forces fee fields to have positive values', () => {
    cy.visit('/')
    cy.contains("Enter some input to get started 🏃")
    cy.get("[data-test=calls-inbound-fee]").type("-1", {delay: 0})
    cy.get("[data-test=sms-inbound-longcode-fee]").clear().type("-1", {delay: 0})
    cy.get("[data-test=calls-inbound-fee]").should('have.value', 0)
    cy.get("[data-test=sms-inbound-longcode-fee]").should('have.value', 0)
  })

  it('accepts positive fee values', () => {
    cy.visit('/')
    cy.contains("Enter some input to get started 🏃")
    cy.get("[data-test=calls-inbound-fee]").clear().type("1", {delay: 0})
    cy.get("[data-test=sms-inbound-longcode-fee]").clear().type("1", {delay: 0})
    cy.contains("Here is the results 👀")
    cy.get("[data-test=calls-inbound-fee]").should('have.value', 1)
    cy.get("[data-test=sms-inbound-longcode-fee]").should('have.value', 1)
  })
})
