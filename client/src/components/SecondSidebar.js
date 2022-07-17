import { useSelector } from 'react-redux'
import Channels from './Channels'
import DefaultOptions from './DefaultOptions'
import Friends from './Friends'
import ProfileCard from './ProfileCard'
import SearchInput from './SearchInput'

export default function SecondSidebar({ user }) {
    const { activeUrl } = useSelector(state => state.users)
    const { menuSidebar } = useSelector(state => state.users)

    return (
        <section className={`w-[31rem] bg-gray-800 h-screen max-h-screen hideScrollBar overflow-scroll p-8 sm:static sm:top-auto sm:left-auto fixed top-0 left-0 z-10 customShadow sm:shadow-none ${menuSidebar ? 'block' : 'hidden sm:block'}`}>

            <SearchInput />
            <ProfileCard user={user} />
            <DefaultOptions user={user} activeUrl={activeUrl} />
            <Channels activeUrl={activeUrl} />
            <Friends user={user} activeUrl={activeUrl} />

        </section>
    )
}
