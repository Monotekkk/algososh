describe('check string', function (){
    it('checks button disabled', function(done){
        cy.visit('http://localhost:3000/recursion');
        cy.get('input').clear();
        cy.get('button').should('be.disabled');

    })
})