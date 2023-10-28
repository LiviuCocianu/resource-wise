const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	name: String,
	userType: String,
	email: String,
	phone: String,
	password: String,
	donations: Number
})

module.exports = mongoose.model("user", UserSchema)