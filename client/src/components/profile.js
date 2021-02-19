import Login from "./login"
import Register from "./register"
import {Route, Switch} from 'react-router-dom'
import LoggedIn from "./loggedIn"
export default function Profile(props){
	return (
		<div>
			<Switch>
				<Route path="/profile/" exact render = {()=><LoggedIn history={props.history} updateUser = {props.updateUser} state= {props.state} /> } />
				<Route path="/profile/login"  render= {()=><Login history = {props.history} loggedIn={props.state.loggedIn} updateUser = {props.updateUser} /> }/>
				<Route path="/profile/signup" render={()=><Register history = {props.history} user = {props.user} updateUser = {props.updateUser} /> }/>
			</Switch>
		</div>
		)
}