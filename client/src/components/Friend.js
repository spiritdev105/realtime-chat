import React from 'react'
import Avatar from './Avatar'
import Quantity from './Quantity'

export default function Friend({ image, name, total }) {
    return (
        <div className="flex items-center justify-between rounded-xl cursor-pointer py-2.5 px-3 hover:bg-gray-900">
            <div className="capitalize text-gray-300 text-xl flex items-center gap-4">
                <Avatar image={image} customStyle="w-9 h-9" />
                {name}
            </div>
            {total && <Quantity total={total} />}
        </div>
    )
}
