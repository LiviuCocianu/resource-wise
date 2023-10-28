const mongoose = require("mongoose")

const RezervareSchema = new mongoose.Schema({
	coords: [mongoose.Types.Decimal128],
	details: String,
	requesterId: Number
})

module.exports = mongoose.model("reservation", RezervareSchema)