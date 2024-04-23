describe ('busca por usuarios como adm', ()=>{
  var token;
  var userId;
 
  before('criar usuario', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: {
        "name": "string",
        "email": "string@yahoo.com.br",
        "password": "string",
      }  
    }).then((response) => {
      userId = response.body.id
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

  it ('Busca geral', ()=>{
  cy.request ({
    method:'GET',
    url:'/api/users',
    headers: {
      Authorization: "Bearer " + token}
  }).then((response) => {
    expect(response.status).to.eq(200)
  })

});//end da geral

it('buscar via id',() =>{
  cy.request({
    method:'GET',
    url:'/api/users/' + userId,
    headers:{
      Authorization: "Bearer " + token}

  }).then((response) => {
    expect(response.status).to.eq(200)
  })

})//end of id


})