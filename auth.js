require('dotenv').config()
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
				clientID: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
				callbackURL: process.env.FACEBOOK_CALLBACK_URL,
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
						done(null,user.value)
					}
					)			}
			)
		)


	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URL,
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
			cb(null, doc.value)
		})
			}))

	passport.use(new LocalStragtegy((username, password, done)=>{
		console.log("username", username)
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
		done(null, user._id)
	})

	passport.deserializeUser((id, done)=>{
		console.log("deserializing user")
	    userDB.findOne({_id: new ObjectID(id)}, (err, doc)=>{
	      done(null, doc)
	    })
	  })

}

module.exports = main