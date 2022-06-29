import { useState } from 'react'
import Accordion from './Accordion'
import Channel from './Channel'

export default function Channels() {
    const [open, setOpen] = useState(true)

    return (
        <div className="mb-8">
            <Accordion name="channels" setOpen={setOpen} open={open} />

            <div className={`${open ? 'block' : 'hidden'}`}>
                <Channel total="60" name="general chat" />
                <Channel name="design supports" />
                <Channel total="5" name="products showcases" />
                <Channel total="45" name="hangout lounge" />
                <Channel name="bots and games" />
            </div>
        </div>
    )
}
