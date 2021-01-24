module.exports = (cloudinary, productsDB) =>{
	let router = require('express').Router();
	let ObjectID = require('mongodb').ObjectID
	router.post("/", (req, res)=>{
		let data = req.body
		data.favourites = []
		data.uplaodDate= new Date();
		data.lastUpdated = new Date()
		productsDB.insertOne(data, (err, saved)=>{
			if(err) return res.status(400);
			console.log(saved)
			res.send(saved.ops[0])
		})
	})

	router.post("/imgs", (req, res)=>{
		let values = Object.values(req.files)
			 const promises = values.map(image => cloudinary.uploader.upload(image.path))
			  Promise
			    .all(promises)
			    .then(results => {
			    	let arr = results.map(item=>item.url)
			    	res.send(arr)
			    })
	})

	router.post("/ad", (req, res)=>{
		let id = req.body._id
		productsDB.findOne({_id: new ObjectID(id)}, (err, data)=>{
			if(err) return console.log(err);
			console.log(data)
			res.send(data)
		})
	})
	router.post("/update", (req, res)=>{
		let data = req.body;
		let _id = data._id;
		delete data._id;
		data.lastUpdated = new Date()
		productsDB.findOneAndUpdate({_id: new ObjectID(_id)}, {$set: data}, {returnOrigina: false, upsert: false}, (err, data)=>{
			if(err) return console.log(err);
			console.log(data)
			res.send(data.value)
		})
	})

	return router
}