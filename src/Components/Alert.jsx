import React from 'react'

const Alert = ({message}) => {
    return (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded  text-center'>
            <span>{message}</span>
        </div>
    )
}

export default Alert;