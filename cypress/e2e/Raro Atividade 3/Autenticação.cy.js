describe('Login de Usuário', () => {
    var nome;
    var email;
    var senha;
    var token;
    var id;

    before('Criar Usuario',() => {
        cy.log('Criar Usuario')
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                nome: 'Sung Ji Woo',
                email: 'monarcadastrevas@gmail.com',
                senha: '123456'
            }
        }).then((resposta) => {
            id = resposta.body.id
            email = resposta.body.email
            nome = resposta.body.nome
            senha = resposta.body.senha
        });

        cy.log('Login de usuário')
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'monarcadastrevas@gmail.com',
                senha: '123456'
            }
        }).then((resposta) => {
            token = resposta.body.accessToken
            cy.log(token)
            cy.log('Permissão de admin')
            cy.request({
                method: 'PATCH',
                url: 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin',
                headers: {
                    Authorization: "Bearer " + token
                }
            })
        })
    });

    after('Apaga', () => {
        cy.log('Deletar usuário')
        cy.request({
            method: 'DELETE',
            url: '/api/users/' + id,
            headers: {
            Authorization: 'Bearer ' + token
            }
        })
    });

})
    it('Login sem email', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: '',
                senha: '123456'
            }, failOnStatusCode: false

        }).then((resposta)=>  {
            expect(resposta.status).to.eq(400)
             })
        })//ok
    

    it('Não deve logar com email incompleto', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'pedrogmail.com',
                senha: '123456'
            },
            failOnStatusCode: false
        }).then( (resposta) => {
            expect(resposta.status).to.eq(400)
        })
        })//ok
    
    //BUG
    it('Não deve logar com email não cadastrado', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'monarcadastrevas345@gmail.com',
                senha: '123456'
            },
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(401)
        })
    })

    it('Não logar com senha vazia', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'monarcadastrevas@gmail.com',
                senha: ''
            },
            failOnStatusCode: false
        }).then( (resposta) => {
            expect(resposta.status).to.eq(400)
        })
    })

    //bug
    it('Não deve logar com senha incorreta',() => {
        cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: {
                email: 'monarcadastrevas@gmail.com',
                senha: 'senhaincorreta'
            },
            failOnStatusCode: false
        }).then((resposta) => {
            expect(resposta.status).to.eq(401)
        })
    })

