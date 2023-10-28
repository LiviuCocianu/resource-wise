const mongoose = require("mongoose")

const SessionSchema = new mongoose.Schema({
    sessionId: String,
    userId: Object,
    expiresAt: Date
})

module.exports = mongoose.model("session", SessionSchema)