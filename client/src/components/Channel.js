import React from 'react'
import Quantity from './Quantity'

export default function Channel({ total, name }) {
    return (
        <div className="flex items-center justify-between rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900">
            <p className="capitalize text-gray-300 text-xl">
                <span className="mr-4">#</span>
                {name}
            </p>
            {total && <Quantity total={total} />}
        </div>
    )
}
