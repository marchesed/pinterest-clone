import React from 'react'
import '../css/Image.css'

const Image = ({data,id,handleSaveClick}) => {
    return(
        <div className="img-container" key={id}>
            <img className='img' src={data} key={id} />
            <button className='btn' onClick={handleSaveClick}>Save</button>
        </div>
    )
}

export default Image