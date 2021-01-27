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
			res.send(data.value)
		})
	})

	router.get("/myuploads", (req, res)=>{
		let {_id} = req.user
		productsDB.find({uploaderId: String(_id)}).toArray((err, data)=>{
			if(err) return console.log(err);
			res.send(data)
		})
	})

	router.get("/favs", (req, res)=>{
		productsDB.find({favourites: {$in: [String(req.user._id)]}}).toArray((err, data)=>{
			if(err) return console.log(err);
			res.send(data)
		})
	})

	router.post("/remove", (req, res)=>{
		let id = req.body.id;
		productsDB.deleteOne({_id: new ObjectID(id)}, (err, data)=>{
			if(err) return console.log(err);
			res.status(200).send("done")
		})
	})

	router.get("/catagory/:catagory", (req, res)=>{
		console.log(req.params)
		productsDB.find({catagory: req.params.catagory}).toArray((err, data)=>{
			res.send(data)
		})
	})

	router.get("/showcase-data", (req, res)=>{
		let catagories= ["mobiles","vehicles","property","electronics","sports","fashion","animals","tools","other"]

		productsDB.aggregate([
		    { $match: { catagory: { $in: catagories } } }, 
		    {
		        $facet: {
		            "mobiles": [{ $match: { catagory: "mobiles" } }, { $limit: 6 }],
		        	"vehicles": [{ $match: { catagory: "vehicles" } }, { $limit: 6 }],
		            "property": [{ $match: { catagory: "property" } }, { $limit: 6 }],
		            "electronics": [{ $match: { catagory: "electronics" } }, { $limit: 6 }],
		            "sports": [{ $match: { catagory: "sports" } }, { $limit: 6 }],
		            "fashion": [{ $match: { catagory: "fashion" } }, { $limit: 6 }],
		            "animals": [{ $match: { catagory: "animals" } }, { $limit: 6 }],
		            "tools": [{ $match: { catagory: "tools" } }, { $limit: 6 }],
		            "other": [{ $match: { catagory: "other" } }, { $limit: 6 }],

		            
		        }
		    }]).toArray((err, data)=>{
		    	res.send(data[0])
		    })
	})

	return router
}