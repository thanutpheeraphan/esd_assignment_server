const router = require("express").Router();
const pool = require("../db");
const fs = require('fs')

const saveData = (data) =>{
	const finished = (error) =>{
		if(error){
			console.error(error)
			return;
		}
	}
	const jsonData = JSON.stringify(data)
	fs.appendFile('test.txt' , jsonData+",\n", finished)
}

router.get("/getdata", async (req, res) => {
	try {
	  const datafromdb = await pool.query(
		"SELECT * FROM data"
	  );
	 saveData(datafromdb.rows);
	  res.json(datafromdb.rows);
	 
	//   res.status(200).json((await datafromdb).rows);
	//   res.send(res.status);
	} catch (err) {;
	  console.error(err.message);
	  res.status(500).send("Server Error");
	}
  });


  router.post("/adduser", async (req, res) => {
	try {
	  const { name, id } = req.body;
  
	  let datafromdb = await pool.query(
		"INSERT INTO data (name,id) VALUES ($1, $2) RETURNING * ",
		[name,id]
	  );
	  res.json(datafromdb.rows[0]).status(200);

	//   return res.status(200).json(datafromdb.rows[0]);
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send("Server Error");
	}
  });

module.exports = router;