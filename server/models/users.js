const mongoose = require('mongoose')
const Schema = mongoose.Schema
const encrypt = require('../helpers/encrypt')

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "First name can't be blank"]
    },
    last_name: {
        type: String,
        required: [true, "last name can't be blank"]
    },
    email: {
        type: String,
        required: [true, "email cant be null"],
        validate: [{
            isAsync: true,
            validator: function (value, cb) {
                User.findOne({
                    email: value
                }, function (err, res) {
                    cb(!res)
                })
            },
            message: 'User already exist'
        }]
    },
    wallet: {
        type: Number,
        default: 1000000
    },
    point: {
        type: Number,
        default: 0
    },

    carts: {
        type: Array, "default": []
    },
    transactions: {
        type: Array, "default": []
    },
    total: {
        type: Number,
        default: 0
    },
    total_item: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        require: [true, "not null"],
        minlength: [5, "minimum length 5"]
    },
    role: {
        type: String,
        default: "customer"
    }
})

userSchema.pre("save", function () {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model("User", userSchema);
module.exports = User