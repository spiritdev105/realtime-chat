import { useState } from 'react'
import { useSelector } from 'react-redux'
import Accordion from './Accordion'
import Channel from './Channel'

export default function Channels({ activeUrl }) {
    const [open, setOpen] = useState(true)
    const { rooms } = useSelector(state => state.room)

    return (
        <div className="mb-8">
            <Accordion name="channels" setOpen={setOpen} open={open} />

            <div className={`${open ? 'block' : 'hidden'}`}>
                {
                    rooms.map(room => (
                        <Channel key={room._id} room={room} activeUrl={activeUrl} />
                    ))
                }
            </div>
        </div>
    )
}
