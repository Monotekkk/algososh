import {changingColor, defaultColor} from "./utils/constants/constants";
import {wait} from "@testing-library/user-event/dist/utils";
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('check stack', function () {
    const containerSelector = '[data-cy="result"]';
    it('checks button disabled', function () {
        cy.visit('/stack');
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })
    it('checks elements add correct', function () {
        cy.visit('/stack');
        cy.get('input').clear();
        cy.get('input').type('1');
        cy.get('#buttonAdd').click();
        cy.get(containerSelector).children().each((item) => {
            cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
        });

        wait(DELAY_IN_MS);

        cy.get(containerSelector).children().each((item) => {
            cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
            cy.wrap(item.children()[1]).should("have.a.property", "textContent", '1');
        });
        cy.get('input').type('2');
        cy.get('#buttonAdd').click();
        cy.get(containerSelector).children().each((item, index) => {
           index === 1 &&  cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
        });

        wait(DELAY_IN_MS);

        cy.get(containerSelector).children().each((item, index) => {
            index === 1 && cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
            index === 1 && cy.wrap(item.children()[1]).should("have.a.property", "textContent", '2');
        });
    })
    it('checks elements remove correct', function () {
        cy.visit('/stack');
        cy.get('input').clear();
        cy.get('input').type('1');
        cy.get('#buttonAdd').click();
        cy.wait(DELAY_IN_MS);
        cy.get('input').type('2');
        cy.get('#buttonAdd').click();
        cy.get(containerSelector).children().should('have.length', 2);
        cy.get('#buttonRemove').click();
        cy.get(containerSelector).children().should('have.length', 1);
        cy.get('#buttonRemove').click();
        cy.get(containerSelector).children().should('have.length', 0);
    })
    it('checks elements clear correct', function () {
        cy.visit('/stack');
        cy.get('input').clear();
        cy.get('input').type('1');
        cy.get('#buttonAdd').click();
        cy.wait(DELAY_IN_MS);
        cy.get('input').type('2');
        cy.get('#buttonAdd').click();
        cy.get(containerSelector).children().should('have.length', 2);
        cy.get('#buttonClear').click();
        cy.get(containerSelector).children().should('have.length', 0);
        cy.get('#buttonClear').should('be.disabled');
    })
})