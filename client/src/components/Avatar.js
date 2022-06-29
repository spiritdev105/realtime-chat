import React from 'react'

export default function Avatar({ image, customStyle }) {
    return (
        <img src={image} alt="" className={`${customStyle && customStyle} rounded-xl object-cover`} />
    )
}
