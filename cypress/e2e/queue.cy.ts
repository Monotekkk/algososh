import {changingColor, defaultColor} from "./utils/constants/constants";
import {wait} from "@testing-library/user-event/dist/utils";
import {DELAY_IN_MS} from "../../src/constants/delays";

const containerSelector = '[data-cy="result"]';
describe('check queue', function () {
    it('checks button disabled', function () {
        cy.visit('/queue');
        cy.get('input').clear();
        cy.get('#buttonAdd').should('be.disabled');
    })
    it('check elements add', function () {
        cy.visit('/queue');
        cy.get('input').clear();
        cy.get('input').type('1');
        cy.get('#buttonAdd').click();
        cy.get(containerSelector).children().each((item, index) => {
            index === 0 && cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
        });
        wait(DELAY_IN_MS);
        cy.get(containerSelector).children().each((item, index) => {
            if (index === 0) {
                cy.wrap(item.children()[0]).should("have.a.property", "textContent", 'head');
                cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
                cy.wrap(item.children()[1]).should("have.a.property", "textContent", '1');
                cy.wrap(item.children()[3]).should("have.a.property", "textContent", 'tail');
            }
        });
        cy.get('input').clear();
        cy.get('input').type('2');
        cy.get('#buttonAdd').click();
        cy.get(containerSelector).children().each((item, index) => {
            index === 0 && cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
            index === 1 && cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
        });
        wait(DELAY_IN_MS);
        cy.get(containerSelector).children().each((item, index) => {
            if (index === 0) {
                cy.wrap(item.children()[0]).should("have.a.property", "textContent", 'head');
                cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
                cy.wrap(item.children()[1]).should("have.a.property", "textContent", '1');
            }
            if (index === 1) {
                cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
                cy.wrap(item.children()[1]).should("have.a.property", "textContent", '2');
                cy.wrap(item.children()[3]).should("have.a.property", "textContent", 'tail');
            }
        });
    })
    it('check clear ', function () {
        cy.visit('/queue');
        cy.get('input').clear();
        cy.get('input').type('1');
        cy.get('#buttonAdd').click();
        cy.get('input').type('2');
        cy.get('#buttonAdd').click();
        cy.get('input').type('3');
        cy.get('#buttonAdd').click();
        cy.get(containerSelector).children().each((item, index) => {
            index === 0 && cy.wrap(item.children()[1]).should("have.a.property", "textContent", '1');
            index === 1 && cy.wrap(item.children()[1]).should("have.a.property", "textContent", '2');
            index === 2 && cy.wrap(item.children()[1]).should("have.a.property", "textContent", '3');
            index > 2 && cy.wrap(item.children()[1]).should("have.a.property", "textContent", '');
        });
        cy.get('#buttonClear').click();
        cy.get(containerSelector).children().each((item, index) => {
            cy.wrap(item.children()[0]).should("have.a.property", "textContent", '');
            cy.wrap(item.children()[1]).should("have.a.property", "textContent", '');
            cy.wrap(item.children()[3]).should("have.a.property", "textContent", '');
        });
    });
})