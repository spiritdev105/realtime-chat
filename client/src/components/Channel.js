import Quantity from './Quantity'

export default function Channel({ total, room, activeUrl, navigateChannel }) {
    return (
        // <Link to={`/room/${room._id}`}>
        <div onPointerDown={() => navigateChannel(`/room/${room._id}`)} className={`flex items-center justify-between rounded-xl cursor-pointer py-3 px-4 hover:bg-gray-900 ${activeUrl === room._id ? 'bg-gray-900' : ''}`}>
            <p className="capitalize text-gray-300 text-xl">
                <span className="mr-4">#</span>
                {room.roomName}
            </p>
            {total && <Quantity total={total} />}
        </div>
        // </Link>
    )
}
