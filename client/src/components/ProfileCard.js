import { DotsHorizontalIcon } from '@heroicons/react/outline'
import React from 'react'
import Avatar from './Avatar'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function ProfileCard({ user }) {
    return (
        <div className="bg-gray-700 rounded-2xl py-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Avatar image={user.imageUrl ? user.imageUrl : defaultImage} customStyle="w-14 h-14" />
                <div className="content">
                    <h2 className="text-2xl text-gray-300 font-medium">{user.username}</h2>
                    <div className="status flex items-center gap-2 text-lg text-gray-500">
                        <span className="w-4 h-4 inline-block bg-green-500 rounded-full"></span>
                        Active for chat
                    </div>
                </div>
            </div>

            <DotsHorizontalIcon className="stroke-gray-300 w-6 h-6" />
        </div>
    )
}
