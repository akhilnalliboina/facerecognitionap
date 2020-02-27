import React from "react"

const  FaceRecognition=({imageUrl})=>{
    return(
    <div className='Center pa3'  >
        <img  alt=''
        src={imageUrl} 
        width='500px'
        heigh='auto'/>   </div>
    )
}
export default FaceRecognition
