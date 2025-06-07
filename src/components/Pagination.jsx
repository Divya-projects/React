import React, { useState } from 'react'

const Pagination = (props) => {
    // destructuring the props
        const { pageNo, handleNext, handlePrevious } = props

    return <>
        <div className='bg-gray-400 p-4 flex justify-center h-[50px] w-full gap-2'>
            <div onClick={handlePrevious} className='px-4 cursor-pointer'>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div>{pageNo}</div>
            <div onClick={handleNext} className='px-4 cursor-pointer'>
                <i className="fa-solid fa-arrow-right"></i>
            </div>   
        </div>
    </>
}

export default Pagination;