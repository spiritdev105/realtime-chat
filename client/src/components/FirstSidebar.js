import { PlusIcon } from '@heroicons/react/outline'

export default function FirstSidebar() {
    return (
        <section className="w-28 h-screen max-h-screen overflow-scroll hideScrollBar bg-gray-700 py-6">
            <div className="flex gap-2.5 justify-center mb-8">
                <span className="w-5 h-5 rounded-full bg-red-500"></span>
                <span className="w-5 h-5 rounded-full bg-yellow-500"></span>
                <span className="w-5 h-5 rounded-full bg-green-500"></span>
            </div>

            <div className="px-6 flex flex-col gap-5">
                <div className="image w-full rounded-xl bg-fuchsia-400 h-16 flex justify-center cursor-pointer">
                    <img src="/images/dribble.png" alt="" className="object-cover w-[85%] h-full" />
                </div>
                <div className="image w-full rounded-xl bg-blue-300 h-16 flex justify-center cursor-pointer">
                    <img src="/images/behance.png" alt="" className="object-contain w-[85%] h-full" />
                </div>
                <div className="image w-full rounded-xl bg-red-300 h-16 flex justify-center cursor-pointer">
                    <img src="/images/figma.png" alt="" className="object-contain w-[85%] h-full" />
                </div>
                <div className="image w-full rounded-xl bg-purple-500 h-16 flex justify-center cursor-pointer">
                    <img src="/images/discord.png" alt="" className="object-contain w-[85%] h-full" />
                </div>
                <div className="image w-full rounded-xl bg-white h-16 flex justify-center cursor-pointer">
                    <img src="/images/firefox.png" alt="" className="object-contain w-[85%] h-full" />
                </div>
                <div className="w-full rounded-xl bg-blue-500 h-16 flex justify-center cursor-pointer items-center">
                    <PlusIcon className="stroke-white w-6 h-6" />
                </div>
            </div>
        </section>
    )
}
