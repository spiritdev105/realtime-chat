import React from 'react'
import Avatar from './Avatar'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/da1787f0-f147-11ec-990c-0f218ff5e6ff?alt=media&token=a077a762-d3bd-4549-bb71-1d3afbab91b2'

export default function ChatMessage({ own }) {
    return (
        <>
            {
                own ? (
                    <div className="flex mb-8 justify-end">
                        <div className="message">
                            <h3 className="message pr-5 text-xl text-gray-400 font-medium text-right"><span className="text-sm text-gray-600 mr-4">08:30 AM</span> You</h3>
                            <div className="bg-blue-500 py-3 px-5 rounded-tl-full rounded-b-full mt-2 text-xl text-gray-300 mr-2 max-w-[50rem]">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, reprehenderit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae incidunt quia quos.
                            </div>
                        </div>
                        <Avatar image={defaultImage} customStyle="w-12 h-12" />
                    </div>
                ) : (
                    <div className="flex gap-6 mb-8">
                        <Avatar image={defaultImage} customStyle="w-12 h-12" />
                        <div className="message">
                            <h3 className="message text-xl text-gray-400 font-medium">Maria <span className="text-sm text-gray-600 ml-4">08:30 AM</span></h3>
                            <div className="bg-gray-700 py-3 px-5 rounded-tr-full rounded-b-full mt-2 text-xl text-gray-300">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, reprehenderit?
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
