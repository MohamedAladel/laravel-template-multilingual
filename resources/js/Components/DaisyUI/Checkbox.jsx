import React from 'react'

const BottomTextHelper = ({ error }) => {
    if (!error) return null

    return <p className="text-sm text-red-600 mt-2">{error}</p>
}

export default function Checkbox(props) {
    return (
        <div className="flex">
            <div className="form-control">
                <label className="label cursor-pointer">
                    <input
                        name={props.name}
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        onChange={props.onChange}
                        checked={props.value}
                        disabled={props.disabled}
                    />
                    <span className="label-text ms-2">{props.label}</span>
                </label>
            </div>
            <BottomTextHelper error={props.error} />
        </div>
    )
}
