import {defaultColor} from "./utils/constants/constants";

describe('check stack', function (){
    const containerSelector = '[data-cy="result"]';
    it('checks button disabled', function(){
        cy.visit('/stack');
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })
    it('checks elements add correct', function(){
        cy.visit('/stack');
        cy.get('input').clear();
        cy.get('input').type('1');
        cy.get('#buttonAdd').click();
        cy.get(containerSelector).children().each((item) => {
            cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
            cy.wrap(item.children()[1]).should("have.a.property", "textContent", '1');
        })
    })
})