const passport = require('passport')
const LocalStragtegy = require('passport-local').Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const ObjectID = require("mongodb").ObjectID
const bcrypt = require('bcrypt')
const FacebookStrategy = require("passport-facebook").Strategy
function main(userDB){

	passport.use(
		new FacebookStrategy(
			{
				clientID: "1108163072930015",
				clientSecret: "293d65ca8de913949d5367a43a666ffe",
				callbackURL: "http://localhost:5000/user/auth/facebook/callback",
				profileFields: ['email', 'name']
			},
			(accessToken, refreshToken, profile, done)=>{
				let profileData = profile._json;
				let name = `${profileData.first_name} ${profileData.last_name}` 
				userDB.findOneAndUpdate({username: profileData.id},
					{
						$setOnInsert: {
							username: profileData.id,
							name: name
						},
						$set: {
							last_login: new Date()
						}
					},
					{
						upsert: true,
						new: true
					}, (err, user)=>{
						if(err) return console.log(err);
						console.log(user.value)
						done(null,user.value)
					}
					)			}
			)
		)


	passport.use(new GoogleStrategy({
		clientID: "893366708424-av6c6mu5f11fru5r05lmnse3r9m5rs7h.apps.googleusercontent.com",
		clientSecret: "qf2UU1QBWW0GZ-EaatfNSlau",
		callbackURL: "http://localhost:5000/user/auth/google/redirect",
		userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
	}, (accessToken, refreshToken, profile, cb)=>{
		userDB.findOneAndUpdate({username: profile._json.email}, {
			$setOnInsert: {
				username: profile._json.email,
				name: profile._json.name
			},
			$set: {
				last_login: new Date()
			}
		}, {upsert: true, new: true}, (err, doc)=>{
			if(err) return cb(err);
			console.log(doc.value)
			cb(null, doc.value)
		})
			}))

	passport.use(new LocalStragtegy((username, password, done)=>{
		userDB.findOne({username: username}, (err, user)=>{
			if(!user){
				return done(null, false, {message: 'Invalid username'})
			}
			if(!bcrypt.compareSync(password, user.password)){
				return done(null, false, {message: "Invalid password"})
			}
			return done(null, user)
		})
	}))

	passport.serializeUser((user, done)=>{
		console.log('serializeUser called')
		console.log(user)
		done(null, user._id)
	})

	passport.deserializeUser((id, done)=>{
		console.log("deserializing user")
	    userDB.findOne({_id: new ObjectID(id)}, (err, doc)=>{
	    	console.log(doc)
	      done(null, doc)
	    })
	  })

}

module.exports = main