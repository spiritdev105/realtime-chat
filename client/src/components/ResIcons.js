import { useDispatch, useSelector } from "react-redux"
import { MenuAlt3Icon, MenuIcon, UserIcon } from "@heroicons/react/solid";
import { setMenuSidebar, setProfileSidebar, setServerSidebar } from "../slices/userSlice";

export default function ResIcons() {
    const { profileSidebar, serverSidebar, menuSidebar } = useSelector(state => state.users)
    const dispatch = useDispatch()

    return (
        <>
            <MenuAlt3Icon className="w-7 h-7 fill-gray-300 cursor-pointer lg:hidden block" onClick={() => dispatch(setServerSidebar(!serverSidebar))} tabIndex={1} onBlur={() => dispatch(setServerSidebar(false))} />
            <UserIcon className="w-7 h-7 fill-gray-300 cursor-pointer md:hidden block" onClick={() => dispatch(setProfileSidebar(!profileSidebar))} tabIndex={1} onBlur={() => dispatch(setProfileSidebar(false))} />
            <MenuIcon className="w-7 h-7 fill-gray-300 cursor-pointer sm:hidden block" onClick={() => dispatch(setMenuSidebar(!menuSidebar))} tabIndex={1} onBlur={() => dispatch(setMenuSidebar(false))} />
        </>
    )
}
