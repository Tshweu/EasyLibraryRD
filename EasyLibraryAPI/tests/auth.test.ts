import request from 'supertest';
import app from '../src/app';
import createTables from '../init';
describe('Auth tests',()=>{

    describe('given a email and password',()=>{
        it('should return 200 status code',async()=>{
            const response = await request(app).post('/v1/auth').send({
                email: 'john@gmail.com',
                password: 'john'
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.token).toBeTruthy();
        })
    })

    describe('when email and password is missing',()=>{
        it('should return error',async ()=>{
            const response = await request(app).post('/v1/auth').send({
                email: '',
                password: ''
            });
            expect(response.statusCode).toBe(401);
        })
    })

    describe('when email and password are incorrect',()=>{
        it('should return error',async ()=>{
            const response = await request(app).post('/v1/auth').send({
                email: 'just@gmail.com',
                password: 'notThePassword'
            });
            expect(response.statusCode).toBe(401);
        })
    })

})