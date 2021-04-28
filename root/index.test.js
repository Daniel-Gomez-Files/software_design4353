const UserModel = require('./models/mySchemas');
const path = require('path');
const app  = require('./index');
const mongoose = require('mongoose');
const request = require("supertest");

test('get index page', async () => {
    try{
        const count = await Service.count();
        await request(app).get('/index.ejs')
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);
    }catch(err){
        console.log('Error')
    }
})

test('posting of index', async () => {
    const data = {
        uname: 'scarlett',
        pass: 'abcd2'
    };
    try{
        const count = await Service.count();
        await request(app).post('/index.ejs').send(service)
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);
    }catch(err){
        console.log('Error')
    }
});

test('get register page', async () => {
    try{
        const count = await Service.count();
        await request(app).get('/registerPage.ejs')
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);
    }catch(err){
        console.log('Error')
    }
})

test('posting of register page', async () => {
    const data = {
        newUser: 'scarlett'
    };
    try{
        const count = await Service.count();
        await request(app).post('/registerPage.ejs').send(service)
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);
    }catch(err){
        console.log('Error')
    }
});

test('get profile management page', async () => {
    try{
        const count = await Service.count();
        await request(app).get('/profMngment.ejs')
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);
    }catch(err){
        console.log('Error')
    }
})

test('posting of profile management', async () => {
    try{
        const count = await Service.count();
        await request(app).post('/profMngment.ejs').send(service)
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);


    }catch(err){
        console.log('Error')
    
    }
});

test('patch of profile management', async () => {
    const data = {
        id: 'sbaeza'
    };
    try{
        const count = await Service.count();
        await request(app).patch('/profMngment.ejs').send(service)
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);


    }catch(err){
        console.log('Error')
    
    }
});

test('get fuel quote form', async () => {
    try{
        const count = await Service.count();
        await request(app).get('/fuelQuoteForm.ejs')
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);
    }catch(err){
        console.log('Error')
    }
})

test('posting of fuel quote form', async () => {
    try{
        const count = await Service.count();
        await request(app).post('/fuelQuoteForm.ejs').send(service)
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);


    }catch(err){
        console.log('Error')
    
    }
});

test('patch of fuel quote form', async () => {
    const data = {
        id: 'sbaeza',
        gallonsRequested: '25'
    };
    try{
        const count = await Service.count();
        await request(app).patch('/fuelQuoteForm.ejs').send(service)
        const newCount = await Service.count()
        expect(newCount).toBe(count + 1);


    }catch(err){
        console.log('Error')
    
    }
});

const userData = { username: 'TekLoon', password: 'Male', userAddress1: "Calhoun", userCity: 'H', userState: 'TX', userzipcode: 78777};

describe('User Model Test', () => {
    beforeAll(() => {
         mongoose.connect('mongodb://localhost/fuelApp' , { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });
    
    afterAll(() => {
    mongoose.connection.close();
    });

    it('create & save user successfully', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.userAddress1).toBe(userData.userAddress1);
        expect(savedUser.userCity).toBe(userData.userCity);
        expect(savedUser.userState).toBe(userData.userState);
        expect(savedUser.userzipcode).toBe(userData.userzipcode);
    });

    
     it('insert user successfully, if undefined fields throw an error', async () => {
        const userWithInvalidField = new UserModel({ username: 'TekLoon', password: 'Male', userAddress1: "Calhoun", userCity: 'H', userState: 'TX', userzipcode: 78777});
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.nickkname).toBeUndefined();
    }); 

    
    describe("Test the root path", () => {
        const req = {
        };

        const res = {
            render: jest.fn()
        };

        test("It should response the GET method", async () => {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(404);
        });
    });
    


});

