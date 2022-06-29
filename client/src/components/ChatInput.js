import { PaperAirplaneIcon } from '@heroicons/react/solid'
import React from 'react'

export default function ChatInput() {
    return (
        <div className="py-8 px-20 absolute bottom-0 left-0 w-full bg-gray-900">
            <form className="bg-gray-700 flex gap-5 py-4 px-6 items-center rounded-xl">
                <input type="text" placeholder="Message in Design Supports" className="w-full bg-transparent text-xl text-gray-400" />
                <PaperAirplaneIcon className="fill-gray-300 w-7 h-7 rotate-45 cursor-pointer" />
            </form>
        </div>
    )
}
