import React from 'react'
import {Link} from "react-router-dom"
export default class Navbar extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div id = "nav">
				<div id= "brand-div">
					<Link to="/" id="nav-brand" >OzCom</Link>
				</div>
				<div id= "ul-div">
					<ul id= "ul-items" >
						<li><Link to="/post" id ="post">Post</Link></li>
						<li><Link to="/search" id = "search">Search</Link></li>
						<li><Link to="/profile/login" id = "profile">Profile</Link></li>
					</ul>
				</div>
			</div>
			)
	}
}