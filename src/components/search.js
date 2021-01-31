import React from 'react'
import Card from "./card"
import axios from 'axios'
export default class Search extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			advance: "none",
			formData : {
				title: "",
				catagory: "",
				condition: "",
				$lte: "",
				$gte: ""
			},
			searchTitle: "",
			searchResults: []
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleChange(e){
		let formData = this.state.formData;
		formData[e.target.name] = e.target.value;
		this.setState({formData: formData})
	}
	handleSubmit(e){
		e.preventDefault();
		let formData = this.state.formData;
		let data = {};
		data.title=formData.title
		data.catagory = formData.catagory;
		data.condition = formData.condition;
		data.price = {}
		for(let i in data){
			if(!data[i]) delete data[i];
		}
		if(formData["$lte"]) data.price['$lte']=formData["$lte"];
		if(formData["$gte"]) data.price['$gte']=formData["$gte"];
		if(Object.keys(data.price).length===0) delete data.price;
		axios.post("https://ozcom-backend.herokuapp.com/upload/search",data)
		.then(res=>{
			this.setState({advance: "none",
				formData : {
					title: "",
					catagory: "",
					condition: "",
					$lte: "",
					$gte: ""
				},
				searchResults: []
			})
			if(res.data[0]){
				let cards = res.data.map((doc, index)=><Card data = {doc} key={index} />)
				this.setState({searchResults: cards, searchTitle: "Search Results..."})
			}else{
				this.setState({searchTitle: "No data found..."})	
			}
		})
		.catch(err=>this.setState({searchTitle: "Connection Error..."})) 
	}
	render(){
		return (
			<div id='search-div'>
				<form id='search-form' onSubmit = {this.handleSubmit} >
					<div id="basic-search">
						<input name='title' id='search-title' value={this.state.formData.title} onChange={this.handleChange} type= "text" placeholder="search..." />
						<button id="search-submit">Search</button>
					</div>
					<div id="advance-search" style={{display: this.state.advance}}>
						<label htmlFor="search-catagory">Catagory:<br/>
							<select name="catagory" onChange = {this.handleChange} value={this.state.formData.catagory} id="search-catagory">
								<option value="">All</option>
								<option value="mobiles">Mobiles</option>
								<option value="vehicles">Vehicles</option>
								<option value="property">Property</option>
								<option value="electronics">Electornics</option>
								<option value="sports">Sports</option>
								<option value="fashion">Fashion</option>
								<option value="animals">Animals</option>
								<option value="tools">Tools</option>
								<option value="other">Other</option>
							</select>							
						</label>
						<br/>
						<label htmlFor="search-condition">Condition:<br/>
							<select name='condition' onChange={this.handleChange} value={this.state.formData.condition} id="search-condition">
								<option value="">Any</option>
								<option value="used" >Used</option>
								<option value='new'>New</option>
							</select>
						</label>
						<div id="search-minmax">
							<label htmlFor='search-min'>Min price:
								<input min="0" id="search-min" name="$gte" onChange={this.handleChange} value={this.state.formData["$gte"]} type='number' />
							</label>
							<label htmlFor="search-max">Max price:
								<input min="0" id='search-max' name="$lte" onChange={this.handleChange} value={this.state.formData['$lte']} type='number' />
							</label>
						</div>
					</div>
				</form>
				<button id='advance-search-button' onClick = {()=>this.setState({advance: this.state.advance==="none"?"initial":"none"})}>Advance Search</button>
				<div id="search-results">
					<h1 id='search-results-title' style = {{textAlign: "center"}} >{this.state.searchTitle}</h1>
					{this.state.searchResults[0]&&<div className="items-div">{this.state.searchResults}</div>}
				</div>
			</div>
			)
	}
}