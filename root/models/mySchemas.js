const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    gallonsRequested: {
        type: Number,
        required: true
    },
    deliveryDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
    },
    total: {
        type: Number,
    }
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 50
    },
    
    password: {
       type: String,
       required: true,
    },

    userAddress1: {
        type: String,
        required: true,
        max: 100
    },

    userAddress2: {
       type: String,
       required: false,
       max: 100
    },

    userCity: {
        type: String,
        required: true,
        max: 100
    },

    userState: {
        type: String,
        required: true,
        enum: ['TX']
    },

    userzipcode: {
        type: Number,
        required: true,
        min: 5,
        max: 9
    },

      hist: {
        type: [formSchema]
    }

})

const User = mongoose.model('User', userSchema);

module.exports = User;