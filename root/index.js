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


// User.find({}).then(data => console.log(data))
// // User.updateOne({/*what we want to find*/ }, {/*what we want to update in it*/ */})
// User.save()
//     .then(data => {
//         console.log("user data saved")
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("user data not saved")
//         console.log(err)
//     })

// const User = mongoose.model('User', userSchema);
// const danny = new User({ userName: "lepoo", password: "password", name: "Daniel Gomez" })

app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'img')))
app.use(express.static(path.join(__dirname, 'scripts')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//name, value
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
//when we get an incoming request this respondes
// app.get('/', (req, res) => {
//     const hist = [123, "123 address st", "12/12/2022", 20, 2460]
//     res.render('home', { hist })
// })
const hist = [[]]
let username = 'username'
let password = 'password'
let address = "123 address st"
let sugestP = 2.34

///
///
//
//

app.get('/index.ejs', (req, res) => {
    res.render('index')
})

app.post('/index.ejs', (req, res) => {
    const { uname, pass } = req.body;
    if (uname === username && pass === password) {
        res.render('fuelQuoteForm')
    } else {
        res.render('index')
        console.log('wrong credentials')
    }
})

////
//
///
///


app.get('/registerPage.ejs', (req, res) => {
    res.render('registerPage')
})

app.post('/registerPage.ejs', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    console.log(newUser)
    res.redirect(`/profMngment.ejs`);
    // res.redirect(`/profMngment/${newUser._id}`);
})

////
//
///
///
app.post('/profMngment.ejs', (req, res) => {
    // const { uname, pass } = req.body;
    // username = uname
    // password = pass
    console.log("profM post")
    res.redirect('/fuelQuoteForm.ejs')
})

app.patch('/profMngment.ejs', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    console.log(req.body);
    console.log("profM patch")
    res.redirect('/fuelQuoteForm.ejs')
})

app.get('/profMngment.ejs', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    console.log("profM get")
    res.render('profMngment', { user })
})





app.get('/fuelQuoteForm.ejs', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    res.render('fuelQuoteForm', { user })
})

app.post('/fuelQuoteForm.ejs', (req, res) => {
    const { fullName, address1, address2, userCity, userState, ZipCode } = req.body;
    person.push([fullName, address1, address2, userCity, userState, ZipCode])
    res.redirect('/fuelQuoteForm.ejs')
})



app.get('/fuelQuoteHistory.ejs', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    res.render('fuelQuoteHistory', { user })
})

app.post('/fuelQuoteHistory.ejs', (req, res) => {
    const { gallonsRequested, address, deliveryDate, price, total } = req.body;
    hist.push([gallonsRequested, address, deliveryDate, price, total])
    res.redirect('/fuelQuoteHistory.ejs')
})








// app.get('/userForm/name/edit', (req,res) => {
//     const { name } = req.params;
//     const adr = array.find( x => x.name === name);
//     res.render('userForm/name', { adr })
// })
// app.patch('/userProfile/:name', (req, res) => {
//     const { name } = req.params;
//     const newAddress = req.body.address;
//     const foundPerson = array.find( x => x.name === name);
//     foundPerson.address = newAddress;
//     res.redirect('/')
// })


//whenever the server starts this will print
app.listen(3000, () => {
    console.log("Listening on port 3000!")
})


const functions = {
    add: (num1, num2) => num1 + num2

}
module.exports = functions;
