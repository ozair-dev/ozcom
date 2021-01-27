import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default class Register extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			formData: {
				name: "",
				username: "",
				password: ""
			},
			warning: "",
			button: "Signup"
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit= this.handleSubmit.bind(this);
	}
	handleChange = (e)=>{
		let formData = this.state.formData;
		formData[e.target.name]= e.target.value;
		this.setState({formData: formData})
	}
	handleSubmit = (e)=>{
		e.preventDefault();
		this.setState({button: "Signing up..."})
		axios.post('https://ozcom-backend.herokuapp.com/user/signup', this.state.formData)
		.then(res=>{
			this.props.history.push("/profile/login")
		})
		.catch(err=>{
			this.setState({button: 'Signup', "warning": "Username aleady Taken"})
		})
	}
	render(){
		return (
			<div>
				<form onSubmit = {this.handleSubmit} >
					<input name="name" id ="signup-name" type = "text" placeholder="Enter your name..." onChange={this.handleChange} required />
					<input name="username" id = "signup-username" type = "text" placeholder="Choose a username..." onChange={this.handleChange} required />
					<input name="password" id="signup-password" type = "password" placeholder="Choose a password..." onChange={this.handleChange} required />
					{this.state.warning && <p className="warning">{this.state.warning}</p>}
					<button id="signup-button" >{this.state.button}</button>
					<p className="switch-auth">Already have an account? <Link to="/profile/login">Login</Link></p>
				</form>
			</div>
			)
	}
}