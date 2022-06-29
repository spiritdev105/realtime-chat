import React from 'react'
import FirstSidebar from '../components/FirstSidebar'
import Profile from '../components/Profile'
import SecondSidebar from '../components/SecondSidebar'
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <section className="flex">
            <FirstSidebar />
            <SecondSidebar />
            <section className="relative overflow-hidden h-screen max-h-screen bg-gray-900 w-[88rem] flex-grow px-20">
                <Outlet />
            </section>
            <Profile />
        </section>
    )
}
