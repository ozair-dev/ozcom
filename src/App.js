import React from 'react'
import './App.css'
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
import Navbar from "./components/navbar"
import Home from "./components/home"
import Post from "./components/post"
import Profile from "./components/profile"
import ViewAd from './components/viewAd'
import axios from 'axios'
export default withRouter(
	class App extends React.Component{
		constructor(props){
			super(props)
			this.state= {
				loggedIn : false,
				user: {}
			}
			this.updateUser = this.updateUser.bind(this)
		}

		componentDidMount(){
			axios.get("/user/")
			.then(res=>{
				this.updateUser(res.data.user)
			})
			.catch(err=>console.log(err))
		}

		updateUser = (userObject)=>{
			if(userObject){
				this.setState({loggedIn: true, user: userObject})
			}else{
				this.setState({loggedIn: false, user: {}})
			}
		}

		render(){
			return (
					<div className="App">
							<Navbar />
						 	<br />
						 	<br />
						 	<br />
						 	<Switch>
						 		<Route path = "/" exact render = {()=><Home state={this.state} updateUser = {this.updateUser} />} />
						 		<Route path="/post" render = {()=><Post  history = {this.props.history} state={this.state} /> } />
						 		<Route path = "/profile" render = {()=><Profile  history = {this.props.history} state={this.state} updateUser = {this.updateUser} /> } />
						 		<Route path="/view-ad" render = {()=><ViewAd  state={this.state} location = {this.props.location}/> } /> 
						 		<Route path="/edit" render={()=><Post history={this.props.history} location={this.props.location} state={this.state} /> } />
						 	</Switch>
					</div>
				  );
		}
	}
	)