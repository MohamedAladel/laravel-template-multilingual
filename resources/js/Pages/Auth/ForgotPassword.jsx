import React from 'react'
import { Head, useForm } from '@inertiajs/react'

import GuestLayout from '@/Layouts/GuestLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'

import { useTranslation } from 'react-i18next';
export default function ForgotPassword({ status }) {
    const {t,i18n}=useTranslation()

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.email'))
    }

    return (
        <GuestLayout>
            <Head title={t('Forgot Password')} />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    label={t('Email')}
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={onHandleChange}
                    error={errors.email}
                />

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="ms-4"
                        processing={processing}
                        onClick={submit}
                    >
                        {t('Email Password Reset Link')}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
