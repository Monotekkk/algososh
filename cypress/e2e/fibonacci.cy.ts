import {wait} from "@testing-library/user-event/dist/utils";
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('check fibonacci', function () {
    const inputValue = 3;
    const containerSelector = '[data-cy="result"]';
    const resultArr = ['1','1','2','3'];
    it('checks button disabled', function () {
        cy.visit('/fibonacci');
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })
    it('check correct', function () {
        cy.visit('/fibonacci');
        cy.get('input').type(`${inputValue}`);
        cy.get('#startAlgorithm').click();
        wait(inputValue * DELAY_IN_MS);
        cy.get(containerSelector).children().should('have.length', inputValue + 1);
        cy.get(containerSelector).children().each((item, index) => {
             cy.wrap(item.children()[1]).should("have.a.property", "textContent", resultArr[index]);
        });
    })
})