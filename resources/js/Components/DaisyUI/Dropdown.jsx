import { useEffect, useRef, useState } from 'react'

const Dropdown = ({ children, label, last = false }) => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
                {label}
                <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    htmlfill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                {children}
            </ul>
        </div>
    )
}

Dropdown.Item = ({ children, ...props }) => {
    return <li {...props}>{children}</li>
}

export default Dropdown
