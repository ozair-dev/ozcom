import React from 'react'
import axios from 'axios'
export default class Post extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		}
		this.handleFileChange = this.handleFileChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleFileChange(e){
		let files = Array.from(e.target.files)
		let formData = new FormData();
		files.forEach((file,i)=>{
			formData.append(i, file)
		})
		axios.post("/upload", formData)
		.then(res=>console.log(res.data))
		.catch(err=>console.log(err))
	}
	handleSubmit(e){
		e.preventDefault()
	}
	render(){
		return (
			<div>
				<form onSubmit = {this.handleSubmit} >
					<input onChange = {this.handleFileChange} accept=".jpeg, .png, .jpg" multiple type = 'file' />
					<button>Submit</button>
				</form>
			</div>
			)
	}
}