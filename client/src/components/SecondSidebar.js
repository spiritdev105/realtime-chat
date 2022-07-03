import Channels from './Channels'
import DefaultOptions from './DefaultOptions'
import Friends from './Friends'
import ProfileCard from './ProfileCard'
import SearchInput from './SearchInput'


export default function SecondSidebar({ user }) {
    return (
        <section className="w-[31rem] bg-gray-800 h-screen max-h-screen hideScrollBar overflow-scroll p-8">

            <SearchInput />
            <ProfileCard user={user} />
            <DefaultOptions user={user} />
            <Channels />
            <Friends />

        </section>
    )
}
