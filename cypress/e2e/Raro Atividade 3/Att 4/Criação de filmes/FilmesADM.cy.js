describe('Criação e atualização por filmes ADM', () => {
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
      url: '/api/auth/login',
      body: {
        "email": "string@yahoo.com.br",
        "password": "string"
      }
    }).then((response) => {
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

  after('Inativar', () => {
    cy.request({
      method: 'PATCH',
      url: '/api/users/inactivate',
      headers: {
        Authorization: "Bearer " + token
      }

    })

  })//end of dps

  it('Criar um filme', () => {
    cy.fixture('filme.json').then((dadosFilme) => {
      cy.request({
        method: 'POST',
        url: '/api/movies',
        body: dadosFilme,
        headers: {
          Authorization: "Bearer " + token
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('genre');
        expect(response.body).to.have.property('description');
        expect(response.body).to.have.property('durationInMinutes');
        expect(response.body).to.have.property('releaseYear');

      })

    })


  });//end of creation

  it('Atualizar um Filme', () => {
    cy.fixture('filme.json').then((dadosFilme) => {
      cy.request({
        method: 'PUT',
        url: '/api/movies/' + idFilme,
        body: dadosFilme,
        headers: {
          Authorization: "Bearer " + token
        }
      }).then((response) => {
        expect(response.status).to.eq(204);

      })

    });//end of att




  })

})







