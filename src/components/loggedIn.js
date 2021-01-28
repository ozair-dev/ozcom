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
		axios.get("https://ozcom-backend.herokuapp.com/user/logout")
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
				<Link to='/' id = 'go-home-button' >Go Home<span className="iconify" style={{marginLeft: 10}} data-icon="ant-design:home-filled" data-inline="false"></span></Link>
				<Link to={{pathname: "/my-ads", state: {type: 'My Ads', link: "/upload/myuploads"}}} id="my-ads" >My Ads<span className="iconify" style={{marginLeft: 10}} data-icon="jam:write-f" data-inline="false"></span></Link>
				<Link to={{pathname: "/my-favs", state: {type: 'My Favourites', link: "/upload/favs"}}} id="my-favourites">My Favourites<span className="iconify" style={{marginLeft: 10}} data-icon="bytesize:heart" data-inline="false"></span></Link>
				<button onClick = {this.handleLogout} id = "logout-button" >{this.state.logout}<span className="iconify" style={{marginLeft: 10}} data-icon="ri:logout-box-r-line" data-inline="false"></span></button>
			</div>
			)
		}
		return  (
			<Redirect to="/profile/login" /> 
			)
	}
}