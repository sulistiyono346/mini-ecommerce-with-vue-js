const User = require("../models/users")

module.exports = {
    add_to_cart(req, res) {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                req.body.sub_total = req.body.item.price * req.body.qty
                result.carts.push(req.body)
                result.total += req.body.item.price * req.body.qty
                result.total_item += 1
                User.updateOne({ _id: result._id }, result)
                    .then((result) => {
                        res.status(200).json({
                            result
                        })

                    }).catch((err) => {
                        res.status(400).json({
                            err
                        })
                    });
            }).catch((err) => {
                res.status(400).json({
                    err
                })

            });
    },
    get_cart(req, res) {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                let data = {
                    name: result.first_name + " " + result.last_name,
                    total: result.total,
                    total_item: result.total_item,
                    carts: result.carts,
                    transactions: result.transactions,
                    wallet: result.wallet,
                    point: result.point

                }
                res.status(200).json({
                    data
                })
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    delete_cart_item(req, res) {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                let index = -1
                for (let i = 0; i < result.carts.length; i++) {
                    if (String(result.carts[i].item._id) == String(req.params.id)) {
                        index = i
                    }
                }
                result.total -= result.carts[index].sub_total
                result.total_item -= 1
                result.carts.splice(index, 1)

                User.updateOne({ _id: result._id }, result)
                    .then((result) => {
                        res.status(200).json({
                            result
                        })
                    }).catch((err) => {
                        res.status(400).json({
                            err
                        })
                    });

            }).catch((err) => {
                res.status(400).json({
                    err
                })

            });
    },
    up_qty(req, res) {
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                let index = -1
                for (let i = 0; i < result.carts.length; i++) {
                    if (String(result.carts[i].item._id) == String(req.params.id)) {
                        index = i
                    }
                }

                result.carts[index].qty += 1
                result.carts[index].sub_total += result.carts[index].item.price
                result.total += result.carts[index].item.price
                if (result.carts[index].qty > result.carts[index].item.stock) {

                }
                else {
                    User.updateOne({ _id: result._id }, result)
                        .then((result) => {
                            res.status(200).json({
                                result
                            })
                        }).catch((err) => {
                            res.status(400).json({
                                err
                            })
                        });

                }

            }).catch((err) => {
                res.status(400).json({
                    err
                })

            });

    },
    down_qty(req, res) {
        User.findOne({ _id: req.decoded.id })
        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                let index = -1
                for (let i = 0; i < result.carts.length; i++) {
                    if (String(result.carts[i].item._id) == String(req.params.id)) {
                        index = i
                    }
                }
                result.carts[index].qty -= 1
                result.carts[index].sub_total -= result.carts[index].item.price
                result.total -= result.carts[index].item.price
                if (result.carts[index].qty <= 0) {
                }
                else {
                    User.updateOne({ _id: result._id }, result)
                        .then((result) => {
                            res.status(200).json({
                                result
                            })
                        }).catch((err) => {
                            res.status(400).json({
                                err
                            })
                        });
                }


            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });

    },
    checkout: (req, res) => {

        User.findOne({ _id: req.decoded.id })
            .then((result) => {
                console.log(result);

                let total_price = result.total + req.body.receiver.cost.value
                let point_shopping = Math.floor(result.total / 100000) * 100
                console.log(point_shopping);
                if (result.wallet > total_price) {
                    let transaction = {
                        total_price: total_price,
                        total_item: result.total_item,
                        carts: result.carts,
                        receiver: {
                            name: req.body.receiver.name,
                            province_id: req.body.receiver.province_id,
                            city_id: req.body.receiver.city_id,
                            address: req.body.receiver.address,
                        },
                        service: {
                            courier: req.body.receiver.courier,
                            cost: req.body.receiver.cost
                        }

                    }
                    result.wallet -= total_price
                    result.point += point_shopping
                    result.total = 0
                    result.total_item = 0
                    result.carts = []
                    result.transactions.push(transaction)

                    User.updateOne({ _id: result._id }, result)
                        .then((result) => {
                            res.status(200).json({
                                result
                            })
                        }).catch((err) => {
                            err
                        });
                }
                else {
                    res.status(400).json({
                        err
                    })
                }

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });




    }
}