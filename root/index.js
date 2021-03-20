const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override')

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






app.get('/fuelQuoteForm.ejs', (req, res) => {
    res.render('fuelQuoteForm.ejs', { address, sugestP })
})

app.post('/fuelQuoteForm.ejs', (req, res) => {
    const { fullName, address1, address2, userCity, userState, ZipCode } = req.body;
    person.push([fullName, address1, address2, userCity, userState, ZipCode])
    res.redirect('fuelQuoteForm.ejs')
})



app.get('/fuelQuoteHistory.ejs', (req, res) => {
    res.render('fuelQuoteHistory.ejs', { hist })
})

app.post('/fuelQuoteHistory.ejs', (req, res) => {
    const { gallonsRequested, address, deliveryDate, price, total } = req.body;
    hist.push([gallonsRequested, address, deliveryDate, price, total])
    res.redirect('/fuelQuoteHistory.ejs')
})


app.listen(3000, () => {
    console.log("Listening on port 3000!")
})
