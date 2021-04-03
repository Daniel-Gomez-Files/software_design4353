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
        maxLength = 50
    },
    
    password: {
       type: String,
       required: true,
    },

    userAddress1: {
        type: String,
        required: true,
        maxLength = 100
    },

    userAddress2: {
       type: String,
       required: false,
       maxLength = 100
    },

    userCity: {
        type: String,
        required: true,
        maxLength = 100
    },

    userState: {
        type: String,
        required: true,
        enum: ['TX']
    },

    userzipcode: {
        type: Number,
        required: true,
        minLength = 5,
        maxLength = 9
    },

      hist: {
        type: [formSchema]
    }

})

const User = mongoose.model('User', userSchema);

module.exports = User;
