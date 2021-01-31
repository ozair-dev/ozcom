import React from 'react'
import {Link, Redirect} from "react-router-dom"
import axios from "axios"
export default class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			formData : {
			username: "",
			password: ""
			},
			warning: "",
			button: "Login"

		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange = (e)=>{
		let data = this.state.formData;
		data[e.target.name] = e.target.value;
		this.setState({formData: data})
	}
	handleSubmit = (e)=>{
		e.preventDefault();
		this.setState({button: "Logging in..."})
		axios({method: "post", url: 'https://ozcom-backend.herokuapp.com/user/', data: this.state.formData})
		.then(res=>{
			this.props.updateUser(res.data)
			this.props.history.push("/")
		
		})
		.catch(err=>this.setState({warning: "Invalid username or password", button: "Login"}))
	}

	render(){
		if(this.props.loggedIn){
			return (<Redirect to="/profile/" />)
		}
		else{
			return (
				<div>
					<pre><a id="google-login" href="https://ozcom-backend.herokuapp.com/user/auth/google" ><span className="iconify" data-icon="grommet-icons:google" data-inline="false"></span><span style = {{display: 'inlineBlock', verticalAlign: "middle"}} >Login With Google </span></a></pre>
					<pre><a id="facebook-login" href="https://ozcom-backend.herokuapp.com/user/auth/facebook" ><span className="iconify" data-icon="logos:facebook" data-inline="false"></span><span style = {{display: 'inlineBlock', verticalAlign: "middle"}} >Login With Facebook</span></a></pre>
					<p id="or-login">Or Login With Email address</p>
					<form onSubmit = {this.handleSubmit} >
						<input name="username" id="input-username" type = 'text' placeholder="Enter your username..." onChange= {this.handleChange} required />
						<input name="password" id="input-password" type = 'password' placeholder="Enter your password..." onChange= {this.handleChange} required />
						{this.state.warning && <p className="warning" >{this.state.warning}</p>}
						<button id = "input-button">{this.state.button}</button>
						<p className = "switch-auth">Don't have an account? <Link to="/profile/signup" >Signup</Link></p>
					</form>
				</div>
				)
		}
	}
}