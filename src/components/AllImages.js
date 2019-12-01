import React from 'react'
import Image from './Image'
import axios from 'axios'

const AllImages = ({handleClick,imageData}) => {
  return(
    imageData.map(({ data, _id }) => (
      <Image handleSaveClick={() => handleClick(_id)} data={data} key={_id}/>
    ))
  )
}

export default AllImages