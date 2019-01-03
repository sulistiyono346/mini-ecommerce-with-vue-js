const Category = require("../models/categories")

module.exports = {
    create_category: (req, res) => {
        Category.create({ name: req.body.name })
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
    get_category: (req, res) => {
        Category.find()
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
    updated_category: (req, res) => {

        let updateData = {
            name: req.body.name
        }

        Category.updateOne({ _id: req.params.id }, updateData)
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
    delete_category: (req, res) => {
        Category.deleteOne({ _id: req.params.id })
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