import {changingColor, defaultColor} from "./utils/constants/constants";
import {DELAY_IN_MS} from "../../src/constants/delays";

describe('check list', function () {
    const containerSelector = '[data-cy="result"]';
    it('checks button disabled', function () {
        cy.visit('/list');
        cy.get('#inputIndex').clear();
        cy.get('#inputValue').clear();
        cy.get('#addToHead').should('be.disabled');
        cy.get('#addToTail').should('be.disabled');
        cy.get('#removebyIndex').should('be.disabled');
        cy.get('#addbyIndex').should('be.disabled');
    })
    it('checks list', function () {
        cy.visit('/list');
        cy.get(containerSelector).children().each((item, index, list) => {
            cy.wrap(item.children().children()[1]).should('have.css', 'border-color', defaultColor);
            index === 0 && cy.wrap(item.children().children()[0]).should('have.a.property', 'textContent', 'head')
            && cy.wrap(item.children().children()[3]).should('have.a.property', 'textContent', '');
            index === list.length - 1 && cy.wrap(item.children().children()[3]).should('have.a.property', 'textContent', 'tail')
            && cy.wrap(item.children().children()[0]).should('have.a.property', 'textContent', '')
        })
    })
    it('check add to head', function () {
        cy.visit('/list');
        cy.get('#inputValue').type('12');
        cy.get('#addToHead').click();
        cy.wait(DELAY_IN_MS);
        cy.get(containerSelector).children().each((item, index) => {
            index === 0 && cy.wrap(item.children().children()[1]).should('have.a.property', 'textContent', '12')
        })
    })
    it('check add to tail', function () {
        cy.visit('/list');
        cy.get('#inputValue').type('12');
        cy.get('#addToTail').click();
        cy.wait(DELAY_IN_MS);
        cy.get(containerSelector).children().each((item, index, list) => {
            index === list.length - 1 && cy.wrap(item.children().children()[1]).should('have.a.property', 'textContent', '12')
        })
    })
    it('check add by index', function () {
        cy.visit('/list');
        cy.get('#inputIndex').type('1');
        cy.get('#inputValue').type('12');
        cy.get('#addbyIndex').click();
        cy.wait(DELAY_IN_MS * 2);
        cy.get(containerSelector).children().each((item, index) => {
            index === 1 && cy.wrap(item.children().children()[1]).should('have.a.property', 'textContent', '12')
        })
    })
    let resultArray;
    it('check delete from head', function () {
        cy.visit('/list');
        cy.get(containerSelector).children().then((elements) => {
            resultArray = Array.from(elements, item => item.children[0].children[1].textContent)
        })
        cy.get('#removeFromHead').click();
        cy.wait(DELAY_IN_MS)
        cy.get(containerSelector).children().then((elements) => {
            const newResultArray = Array.from(elements, item => item.children[0].children[1].textContent);
            cy.wrap(resultArray[0]).should('not.equal', newResultArray[0]);
        })
    });
    it('check delete from tail', function () {
        cy.visit('/list');
        cy.get(containerSelector).children().then((elements) => {
            resultArray = Array.from(elements, item => item.children[0].children[1].textContent)
        })
        cy.get('#removeFromTail').click();
        cy.wait(DELAY_IN_MS)
        cy.get(containerSelector).children().then((elements) => {
            const newResultArray = Array.from(elements, item => item.children[0].children[1].textContent);
            cy.wrap(resultArray[resultArray.length - 1]).should('not.equal', newResultArray[newResultArray.length - 1]);
        })
    });
    it('check delete by index', function () {
        cy.visit('/list');
        const index = String(Math.floor((resultArray.length/2) - 1))
        cy.get(containerSelector).children().then((elements) => {
            resultArray = Array.from(elements, item => item.children[0].children[1].textContent)
        })
        cy.get('#inputIndex').type(index);
        cy.get('#removebyIndex').click();
        cy.wait(DELAY_IN_MS)
        cy.get(containerSelector).children().then((elements) => {
            const newResultArray = Array.from(elements, item => item.children[0].children[1].textContent);
            cy.wrap(resultArray[Number(index)]).should('not.equal', newResultArray[Number(index)]);
        })
    });

})