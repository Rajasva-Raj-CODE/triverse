import React from 'react'
type Props ={
    text:string;
}

const BoxText = ({text}:Props) => {
  return (
    <p className='text-sm sm:text-base rounded-lg font-bold text-white px-4 py-1 bg-yellow-600 w-fit'>
        {text}

    </p>
      
    
  )
}

export default BoxText
