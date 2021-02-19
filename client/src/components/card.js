import React from 'react'
import {Link} from "react-router-dom"
export default class Card extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data: {

			}
		}
	}

	componentDidMount(){
		this.setState({data: this.props.data})
	}

	render(){
		if(this.state.data.title){
			let title = this.state.data.title.slice(0,13)
			if(this.state.data.title!==title){
				title +="..."
			}
			return (
				<div className="card">
					<img src={this.state.data.images[0]} alt={this.state.data.title} className="card-image"/>
					<div className='card-detail'>
						<p className="card-title">{title}</p>
						<p className='card-description'>{this.state.data.description.slice(0,12)+"..."}</p>
						<p className='card-price' ><b>{"$"+this.state.data.price}</b></p>
					</div>
					<Link to={{pathname: "/view-ad", state: {id: this.state.data._id}}} className='card-info'>More Info &#8594;</Link>
				</div>
				)
		}else{
			return (
				<h1>Loading</h1>
				)
		}
	}
}