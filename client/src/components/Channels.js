import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setMenuSidebar } from '../slices/userSlice'
import Accordion from './Accordion'
import Channel from './Channel'

export default function Channels({ activeUrl }) {
    const [open, setOpen] = useState(true)
    const { rooms } = useSelector(state => state.room)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function navigateChannel(location) {
        navigate(location)
        dispatch(setMenuSidebar(false))
    }

    return (
        <div className="mb-8">
            <Accordion name="channels" setOpen={setOpen} open={open} />

            <div className={`${open ? 'block' : 'hidden'}`}>
                {
                    rooms.map(room => (
                        <Channel key={room._id} room={room} activeUrl={activeUrl} navigateChannel={navigateChannel} />
                    ))
                }
            </div>
        </div>
    )
}
