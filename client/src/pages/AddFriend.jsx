import React from 'react'
import SearchedFriend from '../components/SearchedFriend'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function AddFriend() {
    return (
        <>
            <section className="py-10 border-0 border-b border-gray-800 border-solid">
                <h1 className="text-gray-200 text-3xl font-semibold pb-2">Add Friend</h1>
                <p className="text-gray-500 text-xl">You can add friend with their username. It's cAsE-sEnSeTiVe</p>
                <form className="bg-gray-700 rounded-xl flex gap-4 items-center py-3 px-4 mt-6">
                    <input type="text" placeholder="Enter a Username" className="w-full bg-gray-700 text-xl text-gray-300 rounded-md" />
                    <input type="submit" value="Find friend" className="px-12 py-2.5 text-center text-2xl text-gray-300 font-medium bg-blue-500 rounded-md cursor-pointer transition-all hover:bg-blue-600" />
                </form>
            </section>

            <div className="searchedFriends">
                {/* <div className="noSearch">
                    <img src="/images/group.svg" alt="" className="w-[48rem] h-[34rem] object-cover mx-auto" />
                    <p className="text-gray-500 text-xl text-center mt-5">Wumpus is waiting on friends. You don't have to, though.</p>
                </div> */}
                <SearchedFriend image={defaultImage} />
                <SearchedFriend image={defaultImage} added={true} />
            </div>
        </>
    )
}
