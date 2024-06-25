import React, { useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'

import GuestLayout from '@/Layouts/GuestLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'
import { useTranslation } from 'react-i18next';
export default function ResetPassword({ token, email }) {
    const {t,i18n}=useTranslation()

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.store'))
    }

    return (
        <GuestLayout>
            <Head title={t('Reset Password')}/>

            <form onSubmit={submit}>
                <div>
                    <TextInput
                        label={t('Email')}
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={onHandleChange}
                        error={errors.email}
                    />
                </div>

                <div className="mt-4">
                    <TextInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={onHandleChange}
                        error={errors.password}
                    />
                </div>

                <div className="mt-4">
                    <TextInput
                        label={t('Confirm Password')}
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                        error={errors.password_confirmation}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="ms-4"
                        processing={processing}
                        onClick={submit}
                    >
                        {t('Reset Password')}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
