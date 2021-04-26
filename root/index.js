const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const User = require('./models/mySchemas');

mongoose.connect('mongodb://localhost/fuelApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connections open")
    })
    .catch(err => {
        console.log("Mongo connection messing up ")
        console.log(err)
    })
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
            res.redirect(`/fuelQuoteForm.ejs/${usr._id}`)
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
    const usr = await User.findById(id)
    console.log(usr);
    res.render('profMngment', { usr })
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
    res.render('fuelQuoteForm', { user })
})

// CHANGE THIS!!!!!!!
// CHANGE THIS!!!!!!!
// CHANGE THIS!!!!!!!
// CHANGE THIS!!!!!!!
app.post('/fuelQuoteForm.ejs/:id', (req, res) => {
    // const { gallonsRequested, deliveryDate, price, total } = req.body;
    const quote = req.body;
    person.push([fullName, address1, address2, userCity, userState, ZipCode])
    res.redirect('/fuelQuoteForm.ejs')
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
    res.render('fuelQuoteHistory', { user })
})

app.post('/fuelQuoteHistory.ejs', (req, res) => {

})

//whenever the server starts this will print
app.listen(3000, () => {
    console.log("Listening on port 3000!")
})
