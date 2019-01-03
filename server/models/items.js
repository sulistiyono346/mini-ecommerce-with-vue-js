const mongoose = require("mongoose")
const Schema = mongoose.Schema

const item_schema = new Schema({
    title: {
        type: String,
        required: [true, " Title can't be blank"]
    },
    price: {
        type: Number,
        required: [true, "Price can't be blank"]
    },
    first_stock: {
        type: Number,
        required: [true, "Stock can't be blank"]
    },
    stock: {
        type: Number,
        required: [true, "Stock can't be blank"]
    },
    description: {
        type: String,
        required: [true, "Description can't be blank"]
    },
    category: {
        type: Schema.Types.ObjectId, ref: "Category"
    },
    img_item: {
        type: String,
        required: [true, "Description can't be blank"]
    }
})

const Item = mongoose.model("Item", item_schema);
module.exports = Item