import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
export default class LoggedIn extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			logout: "Logout"
		}
		this.handleGoHome = this.handleGoHome.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}
	handleLogout = ()=>{
		this.setState({logout: "Logging out..."})
		axios.get("/user/logout")
		.then(res=>{
			this.props.updateUser(null)
		})
		.catch(err=>this.setState({logout: "Logout"}))
	}
	handleGoHome=()=>{
		this.props.history.push("/")
	}
	render(){
		if(this.props.state.loggedIn){
			return (
			<div>
				<h1 id="loggedin-name" >Logged in as {this.props.state.user.name}</h1>
				<button onClick = {this.handleGoHome} id = 'go-home-button' >Go Home</button>
				<button onClick = {this.handleLogout} id = "logout-button" >{this.state.logout}</button>
			</div>
			)
		}
		return  (
			<Redirect to="/profile/login" /> 
			)
	}
}