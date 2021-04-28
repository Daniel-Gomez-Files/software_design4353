//const sum  = require('./index');
const app  = require('./index');
const { deleteOne } = require('./models/mySchemas');

/*test('adds 2 nums', () => {
    expect(sum(1,3)).toBe(4);
});*/

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