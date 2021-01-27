import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export default class Post extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			formData: {
				catagory: 'mobiles',
				condition: 'used',
				title: "",
				price: "",
				description: '',
				images:"",
				contact: ''
			},
			warning: '',
			disabled: false
		}
		this.handleFileChange = this.handleFileChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount(){
		if(this.props.location?.state){
			this.setState({formData: this.props.location.state})

		}
	}

	handleChange(e){
		let data = this.state.formData;
		data[e.target.id] = e.target.value;
		this.setState({formData: data})
	}

	handleFileChange(e){
		this.setState({warning: "Uploading images...", disabled: true})
		let files = Array.from(e.target.files)
		let formData = new FormData();
		files.forEach((file,i)=>{
			formData.append(i, file)
		})
		axios.post("/upload/imgs", formData)
		.then(res=>{
			let data = this.state.formData
			data.images = res.data
			this.setState({formData: data, warning: "", disabled: false})
		})
		.catch(err=>console.log(err))
	}

	handleSubmit(e){
		e.preventDefault()
		let data = this.state.formData;
		if(this.props.location?.state){
			return axios.post("/upload/update", this.state.formData)
			.then(res=>this.props.history.push({pathname: "/view-ad", state: {id: res.data._id}}))
			.catch(err=>console.log(err))		
		}
		else{
			data.uploaderName = this.props.state.user.name
			data.uploaderId = this.props.state.user._id
			for(let i in data){
				if(!data[i]){
					return this.setState({warning: "Please fill out all fields..."})
				}
			}

			this.setState({warning: ""})
			axios.post("/upload/", data)
			.then(res=>this.props.history.push({'pathname': '/view-ad', state: {id: res.data._id}}))
			.catch(err=>console.log(err))
		}
	}
	render(){
		if(this.props.state?.loggedIn){
			return (
				<div>
					<h2 style={{textAlign:'center'}} >Post Your AD</h2>
					<form onSubmit = {this.handleSubmit} >
						<label className="post-label"  htmlFor="catagory">Select A Catagory: <br/>
							<select id="catagory" onChange  = {this.handleChange} value= {this.state.formData.catagory} >
								<option value= "mobiles">Mobiles</option>
								<option value="vehicles">Vehicles</option>
								<option value="property">Property</option>
								<option value="electronics">Electornics</option>
								<option value="sports">Sports</option>
								<option value="fashion">Fashion</option>
								<option value="animals">Animals</option>
								<option value="tools">Tools</option>
								<option value="other">Other</option>
							</select>
							</label>
							<label className="post-label"  htmlFor="title">Title: <br/>
								<input maxlength='30' id='title' type='text' placeholder="Choose a title..." value={this.state.formData.title} onChange={this.handleChange} />
							</label>
							<label className="post-label"  htmlFor="condition">Condition: <br/>
								<select id='condition' onChange={this.handleChange} value={this.state.formData.condition} >
									<option value="used" >Used</option>
									<option value='new'>New</option>
								</select>
							</label>
							<label className="post-label"  htmlFor="price">Price: <br/>
								<input id='price' min="0" max="1000000000" type="number" placeholder="Enter the price($)..." onChange={this.handleChange} value={this.state.formData.price} />
							</label>
							<label className="post-label"  htmlFor="description" >Description: <br/>
								<input id="description" type="description" placeholder="Enter description..." value={this.state.formData.description} onChange={this.handleChange} />
							</label>
							<label className="post-label"  htmlFor="contact">Contact info: <br/>
								<input id='contact' type='text' onChange={this.handleChange} placeholder="Email or phone #..." value={this.state.formData.contact} />
							</label>
							<label className="post-label"  htmlFor="upload">Choose images to upload: <br/>
								<input id="imgs-upload" onChange = {this.handleFileChange} accept=".jpeg, .png, .jpg" multiple type = 'file' />
							</label>
						{this.state.warning&& <p style={{display: 'block', margin: "10px auto"}} >{this.state.warning}</p>}
						<br/>
						<button disabled={this.state.disabled} id = "upload-button" >Post</button>
					</form>
				</div>
				)
		}else{
			return (
				<div>
					<h1 style={{textAlign: 'center'}} >You are not logged in</h1>
					<Link to="/profile/login" id="goto-login" >Go To Login Page</Link>
				</div>
				)
		}
	}
}