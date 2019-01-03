
const Items = require("../models/items")

module.exports = {

    get_item: (req, res) => {
        Items.find()
            .populate('category')
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

    add_item: (req, res) => {
        let new_item = {
            title: req.body.title,
            price: Number(req.body.price),
            first_stock: Number(req.body.stock),
            stock: Number(req.body.stock),
            description: req.body.description,
            category: req.body.category,
            img_item: req.file.cloudStoragePublicUrl,
        }

        Items.create(new_item)
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
    updates_item: (req, res) => {

        let update_item = {
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            category: req.body.category,
            img_item: req.body.img
        }
        Items.findOneAndUpdate({ _id: req.params.id }, { $set: update_item }, { new: true })
            .then((result) => {
                res.status(200).json({
                    result

                })
            }).catch((err) => {
                res.status(200).json({
                    err
                })
            });
    },

    delete_item: (req, res) => {
        Items.deleteOne({ _id: req.params.id })
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
    detail_item: (req, res) => {
        Items.findOne({ _id: req.params.id })
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
}
