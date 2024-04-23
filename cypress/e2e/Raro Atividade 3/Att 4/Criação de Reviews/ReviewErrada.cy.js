describe('Reviews: busca e criação', () => {
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

    it('Criar uma review com ID 0', () => {
        cy.request({
            method: 'POST',
            url: '/api/users/review',
            body: {
                "movieId":0,
                "score": 5,
                "reviewText": "WOW WOW"
            },
            failOnStatusCode: false,
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.eq(404)
        })

    });//end da creation

      it('Criar uma review sem ID', () => {
        cy.request({
            method: 'POST',
            url: '/api/users/review',
            body: {
                "movieId":"",
                "score": 5,
                "reviewText": "WOW WOW"
            },
            failOnStatusCode: false,
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
        })

    });

    it('Criar uma review com a nota invalida', () => {
        cy.request({
            method: 'POST',
            url: '/api/users/review',
            body: {
                "movieId":1,
                "score": 0,
                "reviewText": "WOW WOW"
            },
            failOnStatusCode: false,
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
        })

    });

    it('Criar uma review com a nota vazia', () => {
        cy.request({
            method: 'POST',
            url: '/api/users/review',
            body: {
                "movieId":1,
                "score": "",
                "reviewText": "WOW WOW"
            },
            failOnStatusCode: false,
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
        })

    });


})