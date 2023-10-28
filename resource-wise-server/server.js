const { app } = require("./routes/routes")

app.listen(8080, (req, res) => {
	console.log("The server is running on 8080")
})