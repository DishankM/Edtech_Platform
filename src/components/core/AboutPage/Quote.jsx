import React from 'react'
import HighlightText from '../HomePage/HighlightText'

function Quote() {
  return (
    <div className='text-[40px] text-center font-bold'>
        we are passionate about revolutionizing the way we learn.
        our platfom
        <HighlightText text={"combines technology"}/>
        <span className='text-brown-200'>
            {" "}
            expertise
        </span>
        , and community to create an 
        <span className='text-brown-200'>
            {" "}
            unparalleled educational experience.
        </span>
    </div>
  )
}

export default Quote