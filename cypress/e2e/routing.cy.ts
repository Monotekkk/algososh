describe('check routing', function () {
    it('check routing to string', function () {
        cy.visit('http://localhost:3000');
        cy.contains('МБОУ АЛГОСОШ');
        cy.get('#link_to_string').click();
        cy.get('button').contains('Развернуть');
        cy.contains('Строка');
    })
    it('check routing to fibonacci', function () {
        cy.visit('http://localhost:3000');
        cy.contains('МБОУ АЛГОСОШ');
        cy.get('#link_to_fibonacci').click();
        cy.get('button').contains('Рассчитать');
        cy.contains('Последовательность Фибоначчи');
    })
    it('check routing to sorting', function () {
        cy.visit('http://localhost:3000');
        cy.contains('МБОУ АЛГОСОШ');
        cy.get('#link_to_arr').click();
        cy.get('button').contains('Новый массив');
        cy.contains('Сортировка массива');
    })
    it('check routing to stack', function () {
        cy.visit('http://localhost:3000');
        cy.contains('МБОУ АЛГОСОШ');
        cy.get('#link_to_stack').click();
        cy.contains('Стек');
        cy.get('button').contains('Очистить');
        cy.get('button').contains('Удалить');
        cy.get('button').contains('Добавить');
    })
    it('check routing to queue', function () {
        cy.visit('http://localhost:3000');
        cy.contains('МБОУ АЛГОСОШ');
        cy.get('#link_to_queue').click();
        cy.contains('Очередь');
        cy.get('button').contains('Очистить');
        cy.get('button').contains('Удалить');
        cy.get('button').contains('Добавить');
    })
    it('check routing to list', function () {
        cy.visit('http://localhost:3000');
        cy.contains('МБОУ АЛГОСОШ');
        cy.get('#link_to_list').click();
        cy.contains('Связный список');
        cy.get('button').contains('Удалить по индексу');
        cy.get('button').contains('Добавить по индексу');
    })
})