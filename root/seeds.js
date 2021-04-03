//this file is used to populate the database

const mongoose = require('mongoose')
const username = require('./models/product');

mongoose.connect('mongodb://localhost/fuelApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connections open")
    })
    .catch(err => {
        console.log("Mongo connection messing up ")
        console.log(err)
    })

    var seedUsers = [
        {fullname: "scarlett baeza",
        username: "sbaeza",
        password: '123abcT',
        userAddress1:'123 Hilltop',
        userAddress2:'',
        userCity:'Houston',
        userState:'Texas',
        userzipcode:'77093',
        hist: [{gallonsRequested: '09', price: '20', total: '180'}]},

        {fullname: "daniel gomez",
        username: "dgomez",
        password: '123abcQ',
        userAddress1:'456 ',
        userAddress2:'',
        userCity:'Dallas',
        userState:'Texas',
        userzipcode:'75204',
        hist: [{gallonsRequested: '20', price: '10', total: '200'}]},

        {fullname: "steve asika",
        username: "sasika", 
        password: '123abcW',    
        userAddress1:'844 Apple',
        userAddress2:'',
        userCity:'Austin',
        userState:'Texas',
        userzipcode:'78741',
        hist: [{gallonsRequested: '06', price: '15', total: '90'}]},

        {fullname: "raj singh",
        username: "rsingh",
        password: '123abcE',
        userAddress1:'789 CandyLane',
        userAddress2:'',
        userCity:'New York',
        userState:'New York',
        userzipcode:'10044',
        hist: [{gallonsRequested: '13', price: '10', total: '130'}]},

        {fullname: "tony stark",
        username: "tstark",
        password: '123abcA',
        userAddress1:'1500 Cougar Village Dr',
        userAddress2:'Apt 251',
        userCity:'Houston',
        userState:'Texas',
        userzipcode:'77009',
        hist: [{gallonsRequested: '23', price: '20', total: '460'}]},

        {fullname: "ben ten",
        username: "bten",
        password: '123abcS',
        userAddress1:'4925  Pretty View Lane',
        userAddress2:'',
        userCity:'Atlanta',
        userState:'Georgia',
        userzipcode:'30305',
        hist: [{gallonsRequested: '08', price: '15', total: '120'}]},

        {fullname: "danny phantom",
        username: "dphantom",
        password: '123abcD',
        userAddress1:'418B Temple Ave',
        userAddress2:'',
        userCity:'Dickson',
        userState:'Tennesee',
        userzipcode:'37055',
        hist: [{gallonsRequested: '11', price: '10', total: '110'}]},

        {fullname: "kanye west",
        username: "kwest",
        password: '123abcF',
        userAddress1:'24895 Long Valley Rd',
        userAddress2:'',
        userCity:'Hidden Hills',
        userState:'California',
        userzipcode:'91302',
        hist: [{gallonsRequested: '19', price: '05', total: '95'}]},
    ]

    User.insertMany(seedUsers)
        .then(res => { console.log(res)})
        .catch(err => { console.log(err)})

