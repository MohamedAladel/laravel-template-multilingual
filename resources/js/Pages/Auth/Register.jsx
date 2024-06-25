import React, { useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'

import GuestLayout from '@/Layouts/GuestLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'

import { useTranslation } from 'react-i18next';
export default function Register() {
    const {t,i18n}=useTranslation()

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        )
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('register'))
    }

    return (
        <GuestLayout>
            <Head title={t('Register')} />

            <form onSubmit={submit}>
                <div>
                    <TextInput
                        label={t('Name')}
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={onHandleChange}
                        error={errors.name}
                    />
                </div>

                <div className="mt-4">
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

                <div className="flex items-center justify-end mt-4 gap-1">
                    <Link href={route('login')} className="link">
                        {t('Already registered?')}
                    </Link>

                    <Button
                        className="ms-4"
                        processing={processing}
                        onClick={submit}
                        type="primary"
                    >
                        {t('Register')}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
