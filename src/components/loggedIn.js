import React from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'
export default class LoggedIn extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			logout: "Logout"
		}
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
	render(){
		if(this.props.state.loggedIn){
			return (
			<div>
				<h1 id="loggedin-name" >Logged in as {this.props.state.user.name}</h1>
				<Link to='/' id = 'go-home-button' >Go Home</Link>
				<Link to={{pathname: "/view-ad", state: {id: "600c3933ccf01409bfd9088b"}}} id="my-ads" >My Ads</Link>
				<Link to="/favourites" id="my-favourites">My Favourites</Link>
				<button onClick = {this.handleLogout} id = "logout-button" >{this.state.logout}</button>
			</div>
			)
		}
		return  (
			<Redirect to="/profile/login" /> 
			)
	}
}