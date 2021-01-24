const bcrypt = require('bcrypt')
const passport = require('passport')
module.exports = (userDB)=>{
	const router = require('express').Router();

	router.get('/', (req, res)=>{
		if(req.user){
			delete req.user.password
			return res.json({user: req.user})
		}
		return res.json({user: null})
	})
	router.post('/',passport.authenticate('local'), (req, res)=>{
		res.send(req.user);
	})
	router.post('/signup', (req, res)=>{
		console.log('signup')
		let data = req.body;
		let hash = bcrypt.hashSync(data.password, 12);
		data.password = hash;
		userDB.findOne({
			username: data.username
		}, (err, doc)=>{
			if(doc) return res.status(400).send("Error");
			userDB.insertOne(data, (err, user)=>{
				res.send("done")
			})
		})
	})
	router.get("/logout", (req, res)=>{
		if(req.user){
			console.log('logging out')
			req.logout();
			return res.end();
		}
		console.log("already logged out")
	})

	router.get("/auth/facebook", passport.authenticate('facebook'))
	router.get("/auth/facebook/callback", passport.authenticate('facebook', {failureRedirect: 'http://localhost:3000'}), (req, res)=>{
		res.redirect("http://localhost:3000")
	})
	router.get("/auth/google", passport.authenticate("google", {scope: ['profile', 'email']}))
	router.get("/auth/google/redirect", passport.authenticate('google', {failureRedirect: 'http://localhost:3000'}), (req, res)=>{
		res.redirect("http://localhost:3000")
	})
	return router
}