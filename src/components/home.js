import React from 'react'
import axios from 'axios'
export default class Home extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		axios.get("/user/")
		.then(res=> {
			this.props.updateUser(res.data.user)
		})
	}
	render(){
		return (
			<div>
				{this.props.state.loggedIn? ("Welcome "+this.props.state.user.name):"Not Logged in"}
			</div>
			)
	}
}