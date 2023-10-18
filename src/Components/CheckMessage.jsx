import React from 'react'

const CheckMessage = ({message}) => {
    return (
        <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-5 text-center'>
            <span>{message}</span>
        </div>
    )
}

export default CheckMessage;