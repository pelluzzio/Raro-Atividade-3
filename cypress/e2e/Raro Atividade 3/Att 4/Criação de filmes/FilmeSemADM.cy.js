describe ('Criação e atualização por filmes ADM', ()=>{
    var token;
   
    before('criar usuario', () => {
      cy.request({
        method: 'POST',
        url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users',
        body: {
          "name": "string",
          "email": "string@yahoo.com.br",
          "password": "string",
        }  
      })
    });//end of antes 
   
   
    before('Logar', () => {
      cy.request({
        method: 'POST',
        url:'/api/auth/login',
        body: {
          "email": "string@yahoo.com.br",
          "password": "string"
        }
      }).then((response)=>{
        token = response.body.accessToken}) ;
    })//end of antes
  
    after('Inativar',() => {
      cy.request({
        method: 'PATCH',
        url: '/api/users/inactivate',
        headers: {
          Authorization: "Bearer " + token}
  
      })
  
    })//end of dps

    it('Criar um filme', () => {
      cy.fixture('filme.json').then((dadosFilme) => {
        cy.request({
          method: 'POST',
          url: '/api/movies',
          body: dadosFilme,
          failOnStatusCode: false,
          headers: {
            Authorization: "Bearer " + token
          }
        }).then((response) => {
          expect(response.status).to.eq(403);
  
        })
  
      })
  
  
    });//end of creation
    
    it('Atualizar um Filme', () => {
      cy.fixture('filme.json').then((dadosFilme) => {
        cy.request({
          method: 'PUT',
          url: '/api/movies/1',
          body: dadosFilme,
          failOnStatusCode: false,
          headers: {
            Authorization: "Bearer " + token
          }
        }).then((response) => {
          expect(response.status).to.eq(403);
  
        })
  
      })
      
    });//end of att

})








