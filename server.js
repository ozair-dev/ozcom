process.env.MONGO_URI="mongodb://ozair_ayaz:ozair_03235146562@cluster0-shard-00-00.hrntf.mongodb.net:27017,cluster0-shard-00-01.hrntf.mongodb.net:27017,cluster0-shard-00-02.hrntf.mongodb.net:27017/ozcom?ssl=true&replicaSet=atlas-66q731-shard-0&authSource=admin&retryWrites=true&w=majority"
process.env.CLOUDINARY_CLOUD_NAME="ozcom";
process.env.CLOUDINARY_API_KEY="378179385259691";
process.env.CLOUDINARY_API_SECRET="YFNTkouuzemd1E_utvxZoNZGuqY";
process.env.FACEBOOK_CLIENT_ID="414334022965656";
process.env.FACEBOOK_CLIENT_SECRET="0837032f107fa57988a261d71db71fef";
process.env.FACEBOOK_CALLBACK_URL="https://ozcom-backend.herokuapp.com/user/auth/facebook/callback";
process.env.GOOGLE_CLIENT_ID="893366708424-uj5hpq1e5fr9mle7tj0pbj7cd1ttmtnc.apps.googleusercontent.com";
process.env.GOOGLE_CLIENT_SECRET="ztN561AQQUoPad3LQgXbaPK1";
process.env.GOOGLE_CALLBACK_URL="https://ozcom-backend.herokuapp.com/user/auth/google/callback";


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
var cookieSession = require ("cookie-session");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const formData = require('express-form-data')
const store = new MongoStore({url: process.env.MONGO_URI})
let port = 5000;
const app = express();
app.use(cors({
	  credentials: true,
      origin: ["https://ozcom.herokuapp.com","http://localhost:3000"],		
      methods: ["GET","POST","PUT","OPTIONS","DELETE","PATCH"]
}));

app.use(formData.parse())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(
	session({
		secret: 'ozcom',
		store: store,
		resave: true, 
		saveUninitialized: true,
		})
)

app.use(passport.initialize());
app.use(passport.session());
myDB(async (client) => {
	const userDB = await client.db('ozcom').collection('users');
	let productsDB= await client.db("ozcom").collection("items")
	auth(userDB)
	app.use("/upload", upload(cloudinary, productsDB))

	app.use('/user', user(userDB))
	if (process.env.NODE_ENV === 'production') {
	    app.use(express.static('client/build'));
	}
  }).catch((e)=>{
    app.route('/').get((req, res)=>{
    	res.send("Error loading the page")
    })
})

app.listen(process.env.PORT||port, ()=>{
		console.log(`Listening on port ${process.env.PORT||port}`)
	})