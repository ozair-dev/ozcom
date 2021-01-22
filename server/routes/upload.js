module.exports = (cloudinary) =>{
	let router = require('express').Router();

	router.post("/", (req, res)=>{
		let values = Object.values(req.files)
			 const promises = values.map(image => cloudinary.uploader.upload(image.path))
	  
			  Promise
			    .all(promises)
			    .then(results => {
			    	let arr = results.map(item=>item.url)
			    	res.send(arr)
			    })
	})

	return router
}