describe ('Reviews: busca e criação', ()=>{
  var token;
  var idFilme;
  
  
  
  before('Achar Filmes', () => {
    cy.request({
      method: 'GET',
      url: '/api/movies',

    }).then((response) => {
      idFilme = response.body[0].id;
      });
    })
 
  before('criar usuario', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
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
      token = response.body.accessToken 
      cy.request({
        method: 'PATCH',
        url: '/api/users/admin',
        headers: {
          Authorization: "Bearer " + token
      }

      })
    })
  })//end of antes

  after('Inativar',() => {
    cy.request({
      method: 'PATCH',
      url: '/api/users/inactivate',
      headers: {
        Authorization: "Bearer " + token}

    })

  })//end of dps

  it ('Criar uma review', ()=>{
  cy.request ({
    method:'POST',
    url:'/api/users/review',
    body: {
      "movieId": idFilme,
      "score": 5,
      "reviewText": "WOW WOW"},
    headers: {
      Authorization: "Bearer " + token}
  }).then((response) => {
    expect(response.status).to.eq(201)
  })

});//end da creation

it('buscar por meus reviews',() =>{
  cy.request({
    method:'GET',
    url:'/api/users/review/all',
    headers:{
      Authorization: "Bearer " + token}

  }).then((response) => {
    expect(response.status).to.eq(200)
  })

})//end of lista 


})