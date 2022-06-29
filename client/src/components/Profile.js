import Avatar from './Avatar'

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/da1787f0-f147-11ec-990c-0f218ff5e6ff?alt=media&token=a077a762-d3bd-4549-bb71-1d3afbab91b2'

export default function Profile() {
    return (
        <section className="h-screen max-h-screen overflow-scroll hideScrollBar bg-gray-800 w-[27.6rem] max-w-[28.6rem] p-8">
            <Avatar image={defaultImage} customStyle="w-32 h-32 mx-auto" />
            <h3 className="text-2xl text-gray-300 py-4 font-medium text-center">Lisa Mark</h3>
            <div className="info flex justify-between bg-gray-700 rounded-xl py-4 px-6">
                <div>
                    <p className="text-gray-500 text-base text-center">Rank</p>
                    <h1 className="text-gray-300 text-2xl text-center font-medium">12.091</h1>
                </div>

                <div>
                    <p className="text-gray-500 text-base text-center">Average Act.</p>
                    <h1 className="text-gray-300 text-2xl text-center font-medium">3.6 Hours</h1>
                </div>

                <div>
                    <p className="text-gray-500 text-base text-center">Friends</p>
                    <h1 className="text-gray-300 text-2xl text-center font-medium">40</h1>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-xl text-gray-300 font-medium pb-4">Files & Links <span className="text-sm text-gray-600 ml-1">42 Files, 12 Links</span></h3>
                <div className="files flex gap-4 mb-2">
                    <img src="/images/figma.png" alt="" className="w-10 h-10 object-cover" />
                    <div className="content">
                        <h3 className="text-xl text-gray-300 font-medium">Behance Showcase.figma</h3>
                        <span className="text-sm text-gray-500">September 05, 2022 | 18Mb</span>
                    </div>
                </div>

                <div className="files flex gap-4 mb-2">
                    <img src="/images/figma.png" alt="" className="w-10 h-10 object-cover" />
                    <div className="content">
                        <h3 className="text-xl text-gray-300 font-medium">Dribble In Review.figma</h3>
                        <span className="text-sm text-gray-500">August 14, 2022 | 40Mb</span>
                    </div>
                </div>

                <div className="files flex gap-4 mb-5">
                    <img src="/images/behance.png" alt="" className="w-10 h-10 object-cover" />
                    <div className="content">
                        <h3 className="text-xl text-gray-300 font-medium">Scale Prototype</h3>
                        <span className="text-sm text-gray-500">September 05, 2022 | https://behance.com/ui</span>
                    </div>
                </div>

                <div className="text-sm text-gray-400 rounded-full py-2 px-4 bg-gray-700 inline-block cursor-pointer capitalize">view all files & links</div>
            </div>

            <div className="latest mt-10">
                <h3 className="text-xl text-gray-300 font-medium pb-3">Latest</h3>

                <div className="flex gap-4">
                    <Avatar image={defaultImage} customStyle="w-10 h-10" />
                    <div className="content">
                        <h3 className="text-xl text-gray-400 font-medium">Lisa Mark <span className="text-sm text-gray-600 ml-1">08:30 AM</span> </h3>
                        <p className="text-base text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia earum inventore aliquam.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
