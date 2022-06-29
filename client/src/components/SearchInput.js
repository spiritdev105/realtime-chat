import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

export default function SearchInput() {
    return (
        <form className="flex gap-3 bg-gray-900 p-4 items-center rounded-xl mb-6">
            <input type="text" placeholder="search for anything" className="w-full bg-transparent text-xl text-gray-400" />
            <SearchIcon className="stroke-gray-600 w-6 h-6" />
        </form>
    )
}
