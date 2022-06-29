import Avatar from './Avatar'

export default function SearchedFriend({ image, added }) {
    return (
        <div className="pt-6 px-6 flex justify-between">
            <div className="info flex gap-6 items-center">
                <Avatar image={image} customStyle="w-14 h-14" />
                <div className="content">
                    <h3 className="capitalize text-2xl text-gray-200 font-medium">John Doe</h3>
                    <p className="capitalize text-lg text-gray-500">New Friend</p>
                </div>
            </div>

            <button className={`${added ? 'text-blue-500 outline-1 outline outline-blue-500 px-10 cursor-default' : 'text-gray-300 transition-all hover:bg-blue-600 bg-blue-500 px-12'} py-3 text-center text-2xl font-medium rounded-md`}>{added ? 'Added' : 'Send'}</button>
        </div>
    )
}
