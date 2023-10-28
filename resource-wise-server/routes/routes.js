const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const { db } = require("../database/db")

app.use(cors())
app.use(bodyParser.json())

// users
app.post("/api/users", (req, res) => {
	let data = req.body
	db.addClient(res, data)
})

app.get("/auth/sessions/:id", (req, res) => {
	const id = req.params.id
	db.getSession(res, id)
})

app.post("/auth/users", (req, res) => {
	let data = req.body
	db.login(res, data)
})

app.put("/api/clienti/:id", (req, res) => {
	let { id } = req.params
	let data = req.body
	db.updateClient(res, id, data)
})
app.get("/api/clienti/:id", (req, res) => {
	let { id } = req.params
	db.getClient(res, id)
})
app.get("/api/clienti", (req, res) => {
	db.getClient(res)
})
app.delete("/api/clienti/:id", (req, res) => {
	let { id } = req.params
	db.deleteClient(res, id)
})
//restaurante
app.post("/api/restaurante", (req, res) => {
	let data = req.body
	db.addRestaurant(res, data)
})
app.post("/api/login_r", (req, res) => {
	let data = req.body
	db.loginRestaurant(res, data)
})

//rezervari
app.post("/api/rezervari/:clientId", (req, res) => {
	let data = req.body
	let { clientId } = req.params
	data.id_user = clientId
	db.addRezervare(res, data)
})
app.get("/api/rezervari/:clientId", (req, res) => {
	let { clientId } = req.params
	db.getRezervare(res, clientId)
})
app.put("/api/rezervari/:id", (req, res) => {
	let { id } = req.params
	let data = req.body
	db.updateRezervare(res, id, data)
})
app.delete("/api/rezervari/:id", (req, res) => {
	let { id } = req.params
	db.deleteRezervare(res, id)
})
exports.app = app