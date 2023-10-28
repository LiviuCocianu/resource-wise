const mongoose = require("mongoose")
const MONGO_URL = "mongodb+srv://david:david@cluster0.axzcq.mongodb.net/FunCoding"

const Rezervare = require("../models/Rezervare")
const User = require("../models/User")
const Session = require("../models/Session")

const { v4: uuidv4 } = require('uuid');

class Controller {
	constructor() {
		this.connect()
	}

	async connect() {
		try {
			await mongoose.connect(MONGO_URL, {
				useNewUrlParser: true,
			})
			console.info("Connect to DB")
		} catch (err) {
			console.error(err)
		}
	}

	addClient(res, data) {
		User.create(data, (err, newUser) => {
			if (err) throw err
			res.json({
				status: 200,
				user: newUser,
			})
		})
	}

	login(res, data) {
		User.findOne(
			{
				$and: [{ email: data.email }, { parola: data.password }],
			},
			(err, user) => {
				if (err) throw err

				if(!user) {
					res.json({
						status: 404
					})
					return
				}

				const sessionId = uuidv4()
				const now = new Date()

				Session.create({ sessionId, userId: user._id, expiresAt: new Date(now + 2 * 60 * 60 * 1000) }, (err, session) => {
					if (err) throw err
					res.json({
						status: 200,
						user: user,
						sessionId
					})
				})
			}
		)
	}

	updateClient(res, id, data) {
		User.updateOne(
			{
				_id: id,
			},
			data,
			(err, updateUser) => {
				if (err) throw err
				res.json({
					status: 200,
					message: "Updated",
					user: updateUser,
				})
			}
		)
	}

	getSession(res, id) {
		Session.findOne({ sessionId: id }, (err, session) => {
			if (err) throw err

			User.findOne({
				_id: session.userId,
			}, (err, user) => {
				if(err) throw err
				res.json({
					status: 200,
					user,
				})
			})
		})
	}

	deleteSession(res, sessionId) {
		Session.deleteOne({ sessionId },
			(err) => {
				if (err) throw err
				res.json({
					status: 200
				})
			}
		)
	}

	getClient(res, id) {
		User.findOne(
			{
				_id: id,
			},
			(err, user) => {
				if (err) throw err
				res.json({
					status: 200,
					message: "ok",
					user,
				})
			}
		)
	}

	getClienti(res) {
		User.find(
			(err, users) => {
				if (err) throw err
				res.json({
					status: 200,
					message: "ok",
					users,
				})
			}
		)
	}

	deleteClient(res, id) {
		User.deleteOne(
			{
				_id: id,
			},
			(err) => {
				if (err) throw err
				res.json({
					status: 200,
					message: "Deleted",
				})
			}
		)
	}
	
	addRezervare(res, data) {
		Rezervare.create(data, (err, newNote) => {
			if (err) throw err
			res.json({
				status: 200,
				note: newNote,
			})
		})
	}
	getRezervare(res, userId) {
		Rezervare.find(
			{
				id_user: userId,
			},
			(err, rezervare) => {
				if (err) throw err
				res.json({
					status: 200,
					rezervare,
				})
			}
		)
	}
	updateRezervare(res, id, data) {
		Rezervare.updateOne(
			{
				_id: id,
			},
			data,
			(err, updateRezervare) => {
				if (err) throw err
				res.json({
					status: 200,
					note: updateRezervare,
				})
			}
		)
	}
	deleteRezervare(res, id) {
		Rezervare.deleteOne(
			{
				_id: id,
			},
			(err) => {
				if (err) throw err
				res.json({
					status: 200,
				})
			}
		)
	}
}

exports.db = new Controller()
