import React from 'react';
import Card from './card'
const adsHome = (props) => {
	let cards = this.props.data.map(doc=><Card data={doc}/>)
  return (
    <div>
    	<p className="">{this.props.data.catagory}</p>
    	<div className="">
    		{cards}
    		<div className="card"></div>
    	</div>
    </div>
  )
}

export default adsHome;