describe('Procurar filme no RaroMDB', () => {

  it('Achar Filmes', () => {
    cy.request({
      method: 'GET',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies',

    }).then ((renspose) => {
      expect(renspose.status).to.eq(200)
      })
  })

  it('Achar Filmes pelo nome', () => {
    cy.request({
      method: 'GET',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/search?title=.',

    }).then ((renspose) => {
      expect(renspose.status).to.eq(404)
      })
  })

  it('Achar Filmes', () => {
    cy.request({
      method: 'GET',
      url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/movies/3000',

    }).then ((renspose) => {
      expect(renspose.status).to.eq(404)
      })
  })

})
