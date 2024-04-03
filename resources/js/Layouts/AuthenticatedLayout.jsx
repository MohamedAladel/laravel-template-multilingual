import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { router, usePage } from '@inertiajs/react'
import { HiMenu } from 'react-icons/hi'
import { isArray, isEmpty } from 'lodash'

import Dropdown from '@/Components/Defaults/Dropdown'
import SidebarNav from './Partials/SidebarNav'
import Breadcrumb from '@/Components/DaisyUI/Breadcrumb'
import ThemeSwitch from '@/Components/DaisyUI/ThemeSwitch'
import { themeChange } from 'theme-change'

export default function Authenticated({ children, page = '', action = '' }) {
    const {
        props: { auth, flash },
    } = usePage()
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false)

    useEffect(() => {
        if (flash.message !== null) {
            toast(flash.message.message, { type: flash.message.type })
        }
    }, [flash])

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])

    return (
        <div className="min-h-screen">
            <SidebarNav user={auth.user} show={showingNavigationDropdown} />
            <main className="ml-0 transition md:ml-64">
                <nav className="">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-2">
                        <div className="flex justify-between sm:justify-end">
                            <div
                                className="-mr-2 flex items-center sm:hidden space-x-2"
                                data-hs-overlay="#docs-sidebar"
                                aria-controls="docs-sidebar"
                                aria-label="Toggle navigation"
                            >
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <HiMenu />
                                </button>
                            </div>

                            <div className="flex items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <ThemeSwitch />
                                </div>
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-500 text-sm font-semibold text-white leading-none">
                                                {auth.user.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .toUpperCase()}
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route('profile.edit')}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {page !== '' && (
                    <Breadcrumb>
                        <Breadcrumb.Item
                            onClick={() => router.visit(route('dashboard'))}
                        >
                            {page}
                        </Breadcrumb.Item>
                        {!isEmpty(action) && (
                            <>
                                {isArray(action) ? (
                                    action.map((a, i) => (
                                        <Breadcrumb.Item key={i}>
                                            {a}
                                        </Breadcrumb.Item>
                                    ))
                                ) : (
                                    <Breadcrumb.Item>{action}</Breadcrumb.Item>
                                )}
                            </>
                        )}
                    </Breadcrumb>
                )}
                <div className="py-4">{children}</div>
            </main>
            <ToastContainer />
        </div>
    )
}
