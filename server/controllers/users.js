const User = require("../models/users")
const dcrypt = require("bcryptjs")
const { token } = require("../helpers/token")


module.exports = {
    register: (req, res) => {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })
            .then((result) => {
                res.status(200).json({
                    result
                })
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    login: (req, res) => {

        User.findOne({ email: req.body.email })
            .then((result) => {

                if (result) {
                    let dcryptPass = dcrypt.compareSync(req.body.password, result.password)
                    if (dcryptPass) {
                        let data = {
                            _id: result._id,
                            email: result.email,
                            cart: result.cart,
                            transaction: result.transactions,
                            role: result.role
                        }
                        let data_token = token(data)
                        res.status(200).json({
                            data_token: data_token
                        })

                    }
                    else {
                        res.status(400).json({
                            message: "wrong password please try again "
                        })
                    }

                }
                else {
                    res.status(400).json({
                        message: "wrong email please try again "
                    })
                }

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },


    isLogin: (req, res) => {

        res.status(200).json({
            user: req.decoded
        })
    }

}