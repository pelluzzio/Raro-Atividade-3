describe ('Criação e busca por filmes ADM fail', ()=>{
    var token;
   
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

    it ('Criar um filme sem title', ()=>{
    cy.request ({
      method:'POST',
      url:'/api/movies',
      body: {
        "title": "",
        "genre": "Terror",
        "description": "Uma nave espacial, ao retornar para Terra, recebe estranhos sinais vindos de um asteroide. Enquanto a equipe investiga o local, um dos tripulantes é atacado por um misterioso ser. O que parecia ser um ataque isolado se transforma em um terror constante, pois o tripulante atacado levou para dentro da nave o embrião de um alienígena, que não para de crescer e tem como meta matar toda a tripulação.",
        "durationInMinutes": 117,
        "releaseYear": 1979},
        failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token}
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  });//end of creation1
    
  it ('Criar um filme sem genero', ()=>{
    cy.request ({
      method:'POST',
      url:'/api/movies',
      failOnStatusCode: false,
      body: {
        "title": "Alien",
        "genre": "",
        "description": "Uma nave espacial, ao retornar para Terra, recebe estranhos sinais vindos de um asteroide. Enquanto a equipe investiga o local, um dos tripulantes é atacado por um misterioso ser. O que parecia ser um ataque isolado se transforma em um terror constante, pois o tripulante atacado levou para dentro da nave o embrião de um alienígena, que não para de crescer e tem como meta matar toda a tripulação.",
        "durationInMinutes": 117,
        "releaseYear": 1979},
      headers: {
        Authorization: "Bearer " + token}
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  });//end of creation1
  
  it ('Criar um filme sem descrição', ()=>{
    cy.request ({
      method:'POST',
      url:'/api/movies',
      failOnStatusCode: false,
      body: {
        "title": "Alien",
        "genre": "Terror",
        "description": "",
        "durationInMinutes": 117,
        "releaseYear": 1979},
      headers: {
        Authorization: "Bearer " + token}
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  });//end of creation1
  
  it ('Criar um filme com duração negativa', ()=>{
    cy.request ({
      method:'POST',
      url:'/api/movies',
      failOnStatusCode: false,
      body: {
        "title": "Alien",
        "genre": "Terror",
        "description": "Uma nave espacial, ao retornar para Terra, recebe estranhos sinais vindos de um asteroide. Enquanto a equipe investiga o local, um dos tripulantes é atacado por um misterioso ser. O que parecia ser um ataque isolado se transforma em um terror constante, pois o tripulante atacado levou para dentro da nave o embrião de um alienígena, que não para de crescer e tem como meta matar toda a tripulação.",
        "durationInMinutes":-12358,
        "releaseYear": 1979},
      headers: {
        Authorization: "Bearer " + token}
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  });//end of creation1

  it ('Criar um filme com ano negativo', ()=>{
    cy.request ({
      method:'POST',
      url:'/api/movies',
      failOnStatusCode: false,
      body: {
        "title": "Alien",
        "genre": "Terror",
        "description": "Uma nave espacial, ao retornar para Terra, recebe estranhos sinais vindos de um asteroide. Enquanto a equipe investiga o local, um dos tripulantes é atacado por um misterioso ser. O que parecia ser um ataque isolado se transforma em um terror constante, pois o tripulante atacado levou para dentro da nave o embrião de um alienígena, que não para de crescer e tem como meta matar toda a tripulação.",
        "durationInMinutes": 117,
        "releaseYear": -1979},
      headers: {
        Authorization: "Bearer " + token}
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  });//end of creation1


})








