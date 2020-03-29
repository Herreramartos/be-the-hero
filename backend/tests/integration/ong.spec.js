const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach( async () =>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () =>{
        await connection.destroy();
    });

    it('shold be able to create a new ONG', async() => {
        const response = await request(app)
            .post('/ongs')
            //para testar o cabeçalho .set('Authorization','93496d18')
            .send({
                name : "ONG5",
                email : "ONG4@aaa.com",
                whatsapp :"00000000000",
                city : "Catanduva",
                uf : "SP"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});