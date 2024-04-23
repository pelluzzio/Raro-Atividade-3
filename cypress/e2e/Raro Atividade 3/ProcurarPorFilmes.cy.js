describe('Procurar filme no RaroMDB', () => {
  var idFilme;

  it('Achar Filmes', () => {
    cy.request({
      method: 'GET',
      url: '/api/movies',

    }).then((response) => {
      idFilme = response.body[0].id;
      expect(response.status).to.eq(200);
      response.body.forEach(notaDosFilmes => {
        expect(notaDosFilmes).to.have.property('totalRating')
      });
    })
  })

  it('Achar Filmes pelo nome', () => {
    cy.request({
      method: 'GET',
      url: '/api/movies/search?title=Alien',

    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.forEach(notaDosFilmes => {
        expect(notaDosFilmes).to.have.property('totalRating')
      });
    })
  })

  it('Achar Filmes', () => {
    cy.request({
      method: 'GET',
      url: '/api/movies/' + idFilme,

    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body.reviews.forEach(reviewDosFilmes => {
        expect(reviewDosFilmes).to.have.property('score');
        expect(reviewDosFilmes).to.have.property('id');
        expect(reviewDosFilmes).to.have.property('reviewText');
        expect(reviewDosFilmes).to.have.property('reviewType');
        expect(reviewDosFilmes).to.have.property('updatedAt');
        expect(reviewDosFilmes.user).to.have.property('id');
        expect(reviewDosFilmes.user).to.have.property('name');
        expect(reviewDosFilmes.user).to.have.property('type');

      });
      
    })
  })

})
