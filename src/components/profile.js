import React from 'react'
import Login from "./login"
import Register from "./register"
import {Route, Switch, Link} from 'react-router-dom'
import LoggedIn from "./loggedIn"
export default class Profile extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){

	}
	render(){
		return (
			<div>
				<Switch>
					<Route path="/profile/" exact render = {()=><LoggedIn history={this.props.history} updateUser = {this.props.updateUser} state= {this.props.state} /> } />
					<Route path="/profile/login"  render= {()=><Login history = {this.props.history} loggedIn={this.props.state.loggedIn} updateUser = {this.props.updateUser} /> }/>
					<Route path="/profile/signup" render={()=><Register history = {this.props.history} user = {this.props.user} updateUser = {this.props.updateUser} /> }/>
				</Switch>
			</div>
			)
	}
}