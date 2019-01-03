const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "category can't be blank"],
        validate: [{
            isAsync: true,
            validator: function (value, cb) {
                Category.findOne({
                    name: value
                }, function (err, res) {
                    cb(!res)
                })
            },
            message: 'Category already exist'
        }]
    }
})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category