import React, { useEffect, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { HiLogout } from 'react-icons/hi'
import { filterAllowedMenu } from './helpers.cjs'
import routes from './routes.cjs'

const SidebarItem = ({ item }) => {
    return (
        <li>
            <Link
                href={item.route}
                className={`${route().current(item.active) ? 'active' : ''}`}
            >
                {item.icon && (
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                )}
                {item.name}
            </Link>
        </li>
    )
}

const SidebarItemGroup = ({ item }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        item.items.map((item) => {
            route().current(item.active) ? setOpen(true) : ''
        })
    }, [])

    return (
        <li>
            <details open={open}>
                <summary>
                    {item.icon && (
                        <item.icon className="h-4 w-4" aria-hidden="true" />
                    )}
                    {item.name}
                </summary>
                <ul>
                    {item.items.map((item) => (
                        <div key={item.route}>
                            <SidebarItem item={item} />
                        </div>
                    ))}
                </ul>
            </details>
        </li>
    )
}

export default function SidebarNav({ user, show }) {
    const {
        props: { app_name },
    } = usePage()
    const menus = routes.filter((item) => {
        item.open = false
        if (!item.show) {
            return null
        }
        if (user.role === null) {
            return filterAllowedMenu(user, item)
        }
        if (user.role.permissions.find((p) => p.name === item.permission)) {
            return item
        }

        return filterAllowedMenu(user, item)
    })

    return (
        <div
            className={`${
                show ? 'block' : 'hidden'
            } flex flex-col h-screen overflow-y-auto transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[50] w-64 bg-base-200  pt-7 pb-10 md:block md:translate-x-0 md:end-auto md:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500`}
        >
            <div className="flex flex-col justify-between flex-1">
                <div className="">
                    <div className="px-2 pb-4 text-center">
                        <Link
                            className="flex-none text-xl font-semibold text-base-content"
                            href={route('dashboard')}
                        >
                            {app_name}
                        </Link>
                    </div>
                    <nav className="w-full">
                        <ul className="menu bg-base-200 rounded-box">
                            {menus.map((item) => (
                                <div key={`item-${item.name}`}>
                                    {item.items === undefined ? (
                                        <SidebarItem item={item} />
                                    ) : (
                                        <SidebarItemGroup item={item} />
                                    )}
                                </div>
                            ))}
                            <li>
                                <div
                                    onClick={() => router.post(route('logout'))}
                                >
                                    <HiLogout
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div>
                <p className="text-sm font-light text-center bottom-4 left-4 pt-10 text-base-content">
                    {app_name} &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    )
}
