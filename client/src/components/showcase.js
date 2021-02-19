import Card from './card'
import {Link} from 'react-router-dom'
const showcase = (props) => {
  let cards = props.data.map((data,index)=><Card key={index} data ={data}/>)
  return (
    <div className='showcase-div'>
    	<h3 className='showcase-div-p'>{props.catagory.toUpperCase()}</h3>
    	<div className='showcase-div-items'>
    		{cards}
    	</div>
    	<Link className="showcase-div-show-all" to={{pathname:'/show-all', state:{ 'type':`${props.catagory.toUpperCase()}`,'link':`/upload/catagory/${props.catagory}`}}}>Show All</Link>
    </div>
  )
}

export default showcase;