import { LogoutIcon } from '@heroicons/react/solid'
import React from 'react'
import { useParams } from 'react-router-dom'
import Avatar from './Avatar'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/da1787f0-f147-11ec-990c-0f218ff5e6ff?alt=media&token=a077a762-d3bd-4549-bb71-1d3afbab91b2'

export default function ChatHeader() {
    const { username } = useParams()

    return (
        <header className="absolute top-0 left-0 w-full py-10 px-20 bg-gray-900 flex justify-between items-center">
            <div className="flex items-center gap-6">
                <p className="capitalize text-gray-300 text-2xl">
                    <span className="mr-4">#</span>
                    {username}
                </p>

                <p className="text-gray-600 text-lg ">Where we can share our works and feedback</p>
            </div>

            <div className="members flex items-center gap-2">
                <Avatar image={defaultImage} customStyle="w-9 h-9" />
                <Avatar image={defaultImage} customStyle="w-9 h-9" />
                <Avatar image={defaultImage} customStyle="w-9 h-9" />
                <div className="w-9 h-9 bg-gray-800 rounded-xl text-gray-400 text-base flex items-center justify-center">24</div>
                <div className="w-9 h-9 bg-gray-700 rounded-xl text-base flex items-center justify-center">
                    <LogoutIcon className="w-6 h-6 fill-gray-300 cursor-pointer" />
                </div>
            </div>
        </header>
    )
}
