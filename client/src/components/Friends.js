import { PlusIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import Accordion from './Accordion'
import Friend from './Friend'
import { Link } from 'react-router-dom'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function Friends() {
    const [open, setOpen] = useState(true)

    return (
        <div>
            <Accordion name="Friends" setOpen={setOpen} open={open} />

            <div className={`${open ? 'block' : 'hidden'}`}>
                <Friend image={defaultImage} name="kiara gaurve" total="2" />
                <Friend image={defaultImage} name="kira yoshikage" />
                <Friend image={defaultImage} name="richard wu" />
                <Friend image={defaultImage} name="maria" />
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