describe('Criação de Usuario', () => {
  var token;

  after('entrar', () => {
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

  after('ianativar',() => {
    cy.request({
      method: 'PATCH',
      url: '/api/users/inactivate',
      headers: {
        Authorization: "Bearer " + token}

    })

  })//end of dps

;

it('criar usuario repetido', () => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      "name": "string",
      "email": "string@gamil.com",
      "password": "string",
    }, failOnStatusCode: false

  }).then(function (resposta) {
    expect(resposta.status).to.equal(409)
  })
});

it('criar usuario com email invalido', () => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      "name": "string",
      "email": "string",
      "password": "string",
    }, failOnStatusCode: false

  }).then(function (resposta) {
    expect(resposta.status).to.equal(400)
  })
});

it('criar usuario sem email', () => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      "name": "string",
      "email": "",
      "password": "string",
    }, failOnStatusCode: false

  }).then(function (resposta) {
    expect(resposta.status).to.equal(400)
  })
});

it('criar usuario funcional', () => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      "name": "string",
      "email": "string@yahoo.com.br",
      "password": "string",
    },

  }).then(function (resposta) {
    expect(resposta.status).to.equal(201)
  })
});

it('criar usuario com a senha de 5 digitos', () => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      "name": "string",
      "email": "string@gmaiil.com",
      "password": "12345",
    }, failOnStatusCode: false

  }).then(function (resposta) {
    expect(resposta.status).to.equal(400)
  })
});

it('criar usuario com a senha de 13 digitos', () => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      "name": "string",
      "email": "string@gamil.com",
      "password": "string1234567",
    }, failOnStatusCode: false

  }).then(function (resposta) {
    expect(resposta.status).to.equal(400)
  })
});

it('criar usuario sem senha', () => {
  cy.request({
    method: 'POST',
    url: '/api/users',
    body: {
      "name": "string",
      "email": "string@gamil.com",
      "password": "",
    }, failOnStatusCode: false

  }).then(function (resposta) {
    expect(resposta.status).to.equal(400)
  })
});

})