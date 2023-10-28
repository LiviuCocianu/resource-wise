const mongoose = require("mongoose")
const Produs = require("./Produs")

const PostSchema = new mongoose.Schema({
    ownerId: Integer,
    products: [Produs],
    coords: [mongoose.Types.Decimal128],
    description: String
})

module.exports = mongoose.model("post", PostSchema)