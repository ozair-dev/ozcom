import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import axios from 'axios'
export default class ViewAd extends React.Component{
	constructor(props){
		super(props)
		this.state={
			data: {

			},
			img: '',
			total: '',
			imgIndex: "",
			favourite: false,
			favouriteBorder: "black",
			favouriteBackground: 'white',
			favouriteColor: "black"
		}
		this.handleFav = this.handleFav.bind(this)
		this.handleImgNav = this.handleImgNav.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}


	handleFav(){
		let favourites = this.state.data.favourites;
		let data = this.state.data;
		if(this.state.favourite){
			let index = favourites.indexOf(this.props.state.user._id)
			let 	tempFavourites = favourites.slice(0, index)
			tempFavourites = tempFavourites.concat(favourites.slice(index+1))
			data.favourites = tempFavourites;
			axios.post("https://ozcom-backend.herokuapp.com/upload/update", data)
			.then(res=>{
				this.setState({favourite: false, data: data, favouriteBackground: 'white', favouriteBorder: 'black', favouriteColor: 'black'})
			})
			.catch(err=>console.log(err))
		}
		else if(!this.state.favourite){
			data.favourites.push(this.props.state.user._id)
			axios.post("https://ozcom-backend.herokuapp.com/upload/update", data)
			.then(res=>{
				this.setState({favourite: true, data: data, favouriteBorder: 'red', favouriteBackground: 'red', favouriteColor: 'white'})
			})
			.catch(err=>console.log(err))
		}

	}
	handleImgNav(sym){
		let imgInd;
		if(sym==="+"){
			if(this.state.imgIndex+1 < this.state.total){
				imgInd = this.state.imgIndex+1
				this.setState({img: this.state.data.images[imgInd], imgIndex: imgInd})
			}else{
				this.setState({imgIndex: 0, img: this.state.data.images[0]})
			}
		}
		else if(sym==="-"){
			if(this.state.imgIndex===0){
				imgInd = this.state.data.images.length-1
				return this.setState({imgIndex: imgInd, img: this.state.data.images[imgInd]})
			}
			imgInd=this.state.imgIndex-1
			return this.setState({imgIndex: imgInd, img: this.state.data.images[imgInd]})
		}
	}
	handleDelete(id){
		if(window.confirm("Do you really want to delete this ad?")){
			axios.post("https://ozcom-backend.herokuapp.com/upload/remove", {id: id})
			.then(res=>this.props.history.goBack())
			.catch(err=>console.log(err))
		}
	}

	componentDidMount(){
		if(this.props.location.state){
			let id = this.props.location.state.id
			axios.post("https://ozcom-backend.herokuapp.com/upload/ad", {_id: id})
			.then(res=>{
				let isFav = res.data.favourites.indexOf(this.props.state.user._id)!==(-1);
				this.setState({data: res.data, img: res.data.images[0], total: res.data.images.length, imgIndex: 0, favourite: isFav, favouriteBorder: isFav?'red':'black', favouriteBackground: isFav?"red":'white', favouriteColor: isFav? 'white':'black'})

			})
			.catch(err=>console.log(err))

		}

	}


	render(){
		if(this.props.location.state){
			if(!this.state.data.title) return (<h1 style = {{color: 'gray',textAlign: "center"}}>Loading...</h1>);
			return (
				<div id="view-ad-div">
					<div id='view-ad-img-div'>
						<img id = "view-ad-img" alt="ad" src={this.state.img}/>
					</div>
					<div id= "view-ad-img-navigation">
						<button className='img-nav-button' onClick={()=>this.handleImgNav("-")}>&#60;</button>
						<p style = {{textAlign:"center" ,color: 'gray', fontSize: "20px", margin: 0}} >Showing pic {Number(this.state.imgIndex)+1}/{this.state.total}</p>
						<button className='img-nav-button' onClick={()=>this.handleImgNav('+') } >&#62;</button>
					</div>
					<div id="view-ad-controls">
						{this.props.state.user._id===this.state.data.uploaderId&&<Link to={{pathname: "/edit", state: this.state.data}} id="edit-button">Edit</Link>}
						{this.props.state.loggedIn &&<button id="view-ad-fav-button" onClick={this.handleFav} style={{color: this.state.favouriteColor ,padding: 5, border: `2px solid  ${this.state.favouriteBorder}`, borderRadius: 10, backgroundColor: this.state.favouriteBackground}} ><span style={{marginRight: 0}} className="iconify" data-icon="bytesize:heart" data-inline="false"></span></button>}
						{this.props.state.user._id===this.state.data.uploaderId&&<button id='delete-ad' onClick={()=>this.handleDelete(this.state.data._id) }>Delete</button>}
					</div>
					<div id='view-ad-detail'>
						<div id='view-ad-title'>
							<h3>Title:</h3>
							<p className="view-ad-detail-para">{this.state.data.title}</p>
						</div>
						<div id="view-ad-condition">
							<h3>Condition:</h3>
							<p className="view-ad-detail-para">{this.state.data.condition}</p>
						</div>
						<div id="view-ad-price">
							<h3>Price:</h3>
							<p className="view-ad-detail-para">${this.state.data.price}</p>
						</div>
						<div id='view-ad-description'>
							<h3>Description:</h3>
							<p className="view-ad-detail-para">{this.state.data.description}</p>
						</div>
						<div id="view-ad-owner">
							<h3>Owner</h3>
							<p className="view-ad-detail-para">{this.state.data.uploaderName}</p>
						</div>
						<div id='view-ad-contact'>
							<h3>Contact info:</h3>
							<p className="view-ad-detail-para">{this.state.data.contact}</p>
						</div>
						<div id="view-ad-uploadDate">
							<h3 >Upload Date</h3>
							<p className="view-ad-detail-para">{new Date(String(this.state.data.uplaodDate)).toDateString()}</p>
						</div>
						<div id="view-ad-lastUpdated">
							<h3>Last Updated</h3>
							<p className="view-ad-detail-para">{new Date(String(this.state.data.lastUpdated)).toDateString()}</p>
						</div>
					</div>
					
				</div>
				)
		}else{
			return (
				<Redirect to='/' />
				)
		}
	}

}