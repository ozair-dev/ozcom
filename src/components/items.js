import React from 'react'
import axios from 'axios'
import Card from './card'
export default class Items extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: [

			],
			warning: ''
		}
	}

	componentDidMount(){
		if(!this.props.location.state){
			this.props.history.push("/profile")
		}
		else{
			axios.get("https://ozcom-backend.herokuapp.com"+this.props.location.state.link)
			.then(res=>{
				if(res.data[0]){
					this.setState({data: res.data})
				}
				else{
					this.setState({warning: "No Data Found!"})
				}
			})
			.catch(err=>console.log(err))
			}
	}

	render(){
		if(!this.state.data[0]){
			return (<h1 style={{textAlign: 'center', color: 'gray'}}>{this.state.warning?this.state.warning:"Loading..."}</h1>)
		}
		else if(this.state.data[0]){
			let toRender = this.state.data.map((doc, index)=>(<div><Card data={doc} key={index} /><br/></div>) )
			return (
				<div>
					<h1 style={{textAlign: 'center'}}>{this.props.location.state.type}</h1>
					<div id="items-div">
						{toRender}
					</div>
				</div>
				)
		}
	}
}