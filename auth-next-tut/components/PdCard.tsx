import React from 'react'

// md:w-1/3 lg:w-1/4 mb-4"
const Card = ({children}:{children:React.ReactNode}) => {
    const cardStyle = {
        padding:"100px",
        margin:"10px",
        boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",
        border:"1px solid #ddd",
        display:"flex-auto flex-wrop justify-evenly" ,
        justifyContent:"center",
        alignItem:"center",
    }
  return (
    // <div className='  px-24 mx-3 box'>Card</div>
    <div style={cardStyle}>{children}</div>
  )
}

export default Card