/// <reference types="cypress" />


describe('Donation Process', function(){
    describe('DONATION Details', function(){

      before(function(){
        cy.visit('/')
        cy.wait(1000)
        cy.get('#onetrust-accept-btn-handler').click()
        //access fixture data
        cy.fixture('env').then(function(regdata){
           this.regdata=regdata
        })
     })

      it('Positive flow of Donation process', function(){
        cy.visit('/' + '/support-us/your-donation')
        // add other amount
        cy.get('#otherAmount').type(this.regdata.amount)
        // select Donation type - Yes, this donation is my own money
        cy.get('[value="yes"]').check({force: true})
        // select Your motivation - In memory of someone
        cy.get('.sc-cxNHIi.boJMka').select('In memory of someone')
        // Continue
        cy.get('[type="submit"]').click()
        cy.wait(500)
        // verify redirection URL
        cy.url().should("to.contain", '/support-us/details')
          // Enter first name
          cy.get('#forename').type(this.regdata.firstname)
          // Enter last name
          cy.get('#surname').type(this.regdata.lastname)
          // Enter email address
          cy.get('#emailAddress').type(this.regdata.email)
          // Enter phone number
          cy.get('#phoneNumber').type(this.regdata.phone)
          
          // Verify Postal Code : Find Address
          cy.get('.styles__ButtonLink-sc-1hrmoav-2.jffpLW').click()
            // Select Address & 
          // Verify selected address against env variables 
          cy.get('[name="addressLine1"]').type(this.regdata.homeAddress.address1)
            // Verify selected address against env variables : TOWN
          cy.get('[name="city"]').type(this.regdata.homeAddress.town)
          // Enter postcode
          cy.get('[name="postalCode"]').type(this.regdata.homeAddress.postcode)
            // Verify selected address against env variables : COUNTRY
          cy.get('[value="United Kingdom"]').should('have.value',this.regdata.homeAddress.country)
            // Staying in touch with us : emailOptIn
          cy.get('[value="no"]').check({force: true})
          // Continue
          cy.get('[type="submit"]').click()
          cy.wait(500)
           // verify redirection URL
        cy.url().should("to.contain", '/support-us/payment')
        cy.wait(500)
          // Payment : by card
          cy.get('[value="bt"]').check({force: true})
          // Enter Cardholder name
          cy.get('#cardholderName').type(this.regdata.firstname)
          // Enter Card number
          cy.get('#card-number').type(this.regdata.cardNumber)
          // Enter card expiry date
          cy.get('#card-expiration-date').type(this.regdata.cardExpiry)
          // Enter Security code
          cy.get('#card-cvv').type(this.regdata.cvv)
          // Gift Aid : YES
          cy.get('[value="yes"]').check({force: true})
          // Complete My Donation
          cy.get('.sc-dlnjwi.fxphkK').first().click()
          cy.wait(1000)
          //  // validate reference number against transaction api's ID
        //  cy.intercept('POST', 'https://api.pws.int.cruk.org/transaction').as('transactionAPI')
        //  cy.wait('@transactionAPI').should('have.property', 'response.statusCode', 200)
          // Verify Acknowledgement of payment with URL
          cy.url().should("to.contain", '/support-us/thanks')
          // Verify Acknowledgement of payment with Reference Number
          cy.contains('Thank you '+ this.regdata.firstname + ' for your donation of £' + this.regdata.amount)
          
      })
    })  
})
