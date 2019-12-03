import React from 'react'
import '../css/Image.css'


const Image = ({data,id,handleSaveClick}) => {
    function imageButtonText(){
        return window.location.href.indexOf('/profile') === -1 ? 'Save' : 'Delete'
    }
    function copyUrl(){
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = data;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        console.log('thing copied to clipboard',data)
        alert(data+' has been copied!')
    }
    return(
        <div className="img-container" key={id}>
            <img alt="" className='img' src={data} key={id} />
            <div className='btn-container'>
                <button className='btn save' onClick={handleSaveClick}>{imageButtonText()}</button>
                <button className='btn share' onClick={() => copyUrl()} >Share</button>
            </div>
        </div>
    )
}

export default Image