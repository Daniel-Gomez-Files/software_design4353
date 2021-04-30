const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override')
// const EventEmitter = require('events');
const mongoose = require('mongoose')

const User = require('./models/mySchemas');

mongoose.connect('mongodb://localhost/fuelApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((database) => {
        console.log("Mongo connections open")

    })
    .catch(err => {
        console.log("Mongo connection messing up ")
        console.log(err)
    })
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);
app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'img')))
app.use(express.static(path.join(__dirname, 'scripts')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//name, value
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))


app.get('/index.ejs', (req, res) => {
    res.render('index')
})

app.post('/index.ejs', async (req, res) => {
    const usr = req.body;
    await User.find({ username: usr.username, password: usr.password }, (err, usr) => {
        if (err) {
            console.log('something went wront with db find')
        }
        if (usr.length) {
            console.log('it worked');
            res.redirect(`/fuelQuoteForm.ejs/${usr[0]._id}`)
        } else {
            console.log('wrong credentials');
            res.render('index');
            // res.render('index')
        }
    })

})

////
//
///
///
app.get('/registerPage.ejs', (req, res) => {
    res.render('registerPage')
})

app.post('/registerPage.ejs', async (req, res) => {
    const usr = req.body;
    await User.find({ username: usr.username }, async (err, usr) => {
        if (err) {
            console.log('something went wront with db find')
        }
        if (usr.length) {
            console.log('this user already exist');
            res.render('registerPage')
        } else {
            const newUser = new User(req.body);
            await newUser.save();
            console.log(newUser);
            res.redirect(`/profMngment.ejs/${newUser._id}`);
            // res.render(`profMngment`, { newUser });
        }
    })
    // res.redirect(`/profMngment/${newUser._id}`);
})

////
//
app.get('/profMngment.ejs/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    console.log(user);
    res.render('profMngment', { user })
})
///
///
app.post('/profMngment.ejs/:id', (req, res) => {

})

app.patch('/profMngment.ejs/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    console.log(req.body);
    console.log("profM patch")
    res.redirect(`/fuelQuoteForm.ejs/${id}`)
})



app.get('/fuelQuoteForm.ejs/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    const ppFactor = 1.50;
    let lFactor = 0;
    let hFactor = 0;
    let gFactor = 0;
    const pFactor = 0.1;
    let total
    res.render('fuelQuoteForm', { user, ppFactor, lFactor, hFactor, gFactor, pFactor, total })
})


app.post('/fuelQuoteForm.ejs/:id', (req, res) => {

})

app.patch('/fuelQuoteForm.ejs/:id', async (req, res) => {
    const { id } = req.params;
    const { gallonsRequested, deliveryDate, price, total } = req.body;
    // const Hist = await User.findById(id);
    // const his = { gallonsRequested: gallonsRequested, deliveryDate: deliveryDate, price: price, total: total };
    // Hist.hist.push(his);
    // console.log(Hist);
    await User.findByIdAndUpdate(id, { '$push': { hist: { gallonsRequested: gallonsRequested, deliveryDate: deliveryDate, price: price, total: total } } }, { runValidators: true, new: true });
    console.log(req.body);
    console.log("fuelQ patch")
    res.redirect(`/fuelQuoteHistory.ejs/${id}`)
})


app.get('/fuelQuoteHistory.ejs/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    console.log(user)
    res.render('fuelQuoteHistory', { user })
})

app.post('/fuelQuoteHistory.ejs', (req, res) => {

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
    console.log(req.params);
    console.log('click added to db');
    res.sendStatus(201);
});

// get the click data from the database
app.get('/clicks', (req, res) => {
    db.collection('clicks').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});

//whenever the server starts this will print
app.listen(3000, () => {
    console.log("Listening on port 3000!")
})
