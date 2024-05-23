import {changingColor, defaultColor, modifiedColor} from "./utils/constants/constants";
import {wait} from "@testing-library/user-event/dist/utils";
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('check string', function (){
    const inputValue = 'test';
    const containerSelector = '[data-cy="result"]';
    it('checks button disabled', function(){
        cy.visit('/recursion');
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })
    it('check correct algorithm', function(){
        cy.visit('/recursion');
        cy.get('input').type(inputValue);
        cy.get('#startAlgorithm').click();
        cy.get(containerSelector).children().should('have.length', inputValue.length);
        cy.get(containerSelector).children().each((item, index) => {
            cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
            cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue[index]);
        });
        wait(DELAY_IN_MS);
        cy.get(containerSelector).children().each((item, index) => {
            if(index === 0 || index === 3) {
                cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
            } else {
                cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
            }
        });
        cy.wait(DELAY_IN_MS);
        cy.get(containerSelector).children().each((item, index) => {
            if(index === 0 || index === 3) {
                cy.wrap(item.children()[1]).should("have.css", "border-color", modifiedColor);
            } else {
                cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
            }
        });
        cy.wait(DELAY_IN_MS);
        cy.get(containerSelector).children().each((item, index) => {
            console.log(item.children());
            cy.wrap(item.children()[1]).should("have.css", "border-color", modifiedColor);
            cy.wrap(item.children()[1]).should("have.a.property", "textContent", (inputValue[inputValue.length - 1 - index]));
        });
    })
    it('clear input and check button', function(){
        cy.visit('/recursion');
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })
});