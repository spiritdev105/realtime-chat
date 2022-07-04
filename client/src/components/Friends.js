import { PlusIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import Accordion from './Accordion'
import Friend from './Friend'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Friends({ user }) {
    const [open, setOpen] = useState(true)
    const { conversations } = useSelector(state => state.conversation)
    const yourFriends = conversations.map(c => c.members.find(m => m.memberId !== user._id))

    return (
        <div>
            <Accordion name="Friends" setOpen={setOpen} open={open} />

            <div className={`${open ? 'block' : 'hidden'}`}>
                {
                    yourFriends.map(f => (<Friend key={f.memberId} yourFriend={f} />))
                }
            </div>

            <Link to="/">
                <div className="flex items-center gap-4 cursor-pointer mt-8">
                    <div className="w-9 h-9 rounded-xl bg-gray-700 flex justify-center items-center">
                        <PlusIcon className="stroke-white w-4 h-4" />
                    </div>
                    <span className="text-gray-300 capitalize text-xl">add friends</span>
                </div>
            </Link>
        </div>
    )
}