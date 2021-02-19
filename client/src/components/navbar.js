import {Link} from "react-router-dom"
export default function Navbar(){
	return (
		<div id = "nav">
			<div id= "brand-div">
				<Link to="/" id="nav-brand" >OzCom</Link>
			</div>
			<div id= "ul-div">
				<ul id= "ul-items" >
					<li><Link to="/post" id ="post">Post</Link></li>
					<li><Link to="/search" id = "search"><span className="iconify" style={{margin: 0}} data-icon="fe:search" data-inline="false"></span></Link></li>
					<li><Link to="/profile/login" id = "profile"><span className="iconify" style={{margin: 0}} data-icon="vs:profile" data-inline="false"></span></Link></li>
				</ul>
			</div>
		</div>
		)
}