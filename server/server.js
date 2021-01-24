const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const user = require('./routes/user')
const upload = require("./routes/upload")
const myDB = require('./connection')
const MongoStore = require("connect-mongo")(session)
const passport = require('passport')
const auth = require('./auth')
const cloudinary = require('cloudinary')
cloudinary.config({ 
  cloud_name: "ozcom", 
  api_key: "378179385259691", 
  api_secret: "YFNTkouuzemd1E_utvxZoNZGuqY"
})

const formData = require('express-form-data')
process.env.MONGO_URI="mongodb://ozair_ayaz:ozair_03235146562@cluster0-shard-00-00.hrntf.mongodb.net:27017,cluster0-shard-00-01.hrntf.mongodb.net:27017,cluster0-shard-00-02.hrntf.mongodb.net:27017/ozcom?ssl=true&replicaSet=atlas-66q731-shard-0&authSource=admin&retryWrites=true&w=majority"
const store = new MongoStore({url: process.env.MONGO_URI})
let port = 5000;
const app = express();
app.use(formData.parse())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(
	session({
		secret: 'psad',
		store: store,
		resave: true, 
		saveUninitialized: true
	})
)
app.use(passport.initialize());
app.use(passport.session());
myDB(async (client) => {
	const userDB = await client.db('ozcom').collection('users');
	let productsDB= await client.db("ozcom").collection("items")
	auth(userDB)
	app.route("/").get((req, res)=>{
		console.log(req.user)
		res.send("Working...\n Yay.....")
	})
	app.use("/upload", upload(cloudinary, productsDB))
	
	app.use('/user', user(userDB))

  }).catch((e)=>{
    app.route('/').get((req, res)=>{
    	res.send("Error loading the page")
    })
})

app.listen(process.env.PORT||port, ()=>{
		console.log(`Listening on port ${process.env.PORT||port}`)
	})