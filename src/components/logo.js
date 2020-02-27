import React from "react"
import Tilt from 'react-tilt'
import './logo.css'
import brain from './brain.png'
const Logo=()=>{
    return(
        
            <div className='ma4 mt0'><Tilt className="Tilt " options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"> <img style={{paddingTop:'3px'}} src={brain} alt='logo'/> </div>
       </Tilt></div>
    )
}
export default Logo