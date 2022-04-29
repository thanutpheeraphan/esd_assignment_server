const express = require("express");
const cors = require("cors");
const fs = require('fs')
const morgan = require('morgan');
const path = require('path')
const app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


//middleware
app.use(express.json())
app.use(cors())
// app.use(morgan('tiny'))
app.use(morgan('combined', { stream: accessLogStream }))


//routes 

app.use("/route", require("./routes/route"));



if (process.env.NODE_ENV === "production") {
	app.use(express.static("build"));
	app.get("*", (req, res) => {
	  res.sendFile(path.resolve(__dirname,  "build", "index.html"));
	});
  }


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
