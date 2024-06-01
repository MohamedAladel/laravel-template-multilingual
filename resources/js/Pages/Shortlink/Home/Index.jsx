import React from 'react'
import { Head, useForm } from '@inertiajs/react'

import GuestLayout from '@/Layouts/CustomLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'
import { HiClipboardCopy } from 'react-icons/hi'
import { showToast } from '@/utils'

export default function Index(props) {
    const {
        flash: { message },
    } = props
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            link: '',
        })

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        )
    }

    const handleCopyToClipboard = () => {
        showToast('copied to clipboard', 'success')
        navigator.clipboard.writeText(message.link)
    }

    const handleSubmit = () => {
        reset()
        clearErrors()
        post(route('shortlink.home'))
    }

    return (
        <GuestLayout page={'Index'} action={''}>
            <Head title="Index" />

            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col">
                    <div className="text-4xl font-bold mb-4 text-base-content">
                        Shortlinks.
                    </div>

                    <div className="w-full flex flex-row gap-1">
                        <div className="flex-1">
                            <TextInput
                                name="link"
                                value={data.link}
                                onChange={handleOnChange}
                                placeholder="URL"
                                error={errors.link}
                                className=""
                            />
                        </div>
                        <div>
                            <Button
                                onClick={handleSubmit}
                                processing={processing}
                                className=""
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </div>

                {message?.link && (
                    <div className="flex flex-col">
                        <div className="p-4  flex flex-row justify-between bg-opacity-10 bg-green-500 text-green-500">
                            <p className="">{message.link}</p>

                            <HiClipboardCopy
                                className="text-base-content h-5 w-5"
                                title="click to copy"
                                onClick={handleCopyToClipboard}
                            />
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    )
}
