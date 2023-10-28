const mongoose = require("mongoose")

const ProdusSchema = new mongoose.Schema({
	name: String,
	quantity: Integer,
	expiresAt: String,
})

module.exports = mongoose.model("product", ProdusSchema)