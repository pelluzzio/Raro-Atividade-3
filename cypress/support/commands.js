import {faker} from "@faker-js/faker";

Cypress.Commands.add("criarUmUsuario",()=>{
    return{
        name: faker.perso.fullName(),
        email: faker.internet.email(),
        password: "123456"

    }
});