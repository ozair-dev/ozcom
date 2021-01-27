import React from 'react'

export default class Search extends React.Component{


	render(){
		return (
			<div>
				<form id='search-form'>
					<input id='search-title' placeholder="search..." />
					<button id="search-submit">Search</button>
				</form>
			</div>
			)
	}
}