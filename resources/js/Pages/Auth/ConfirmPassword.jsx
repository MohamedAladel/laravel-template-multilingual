import React, { useEffect } from 'react'
import { Head, useForm } from '@inertiajs/react'

import GuestLayout from '@/Layouts/GuestLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'

import { useTranslation } from 'react-i18next';
export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    })
const {t,i18n}=useTranslation()

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.confirm'))
    }

    return (
        <GuestLayout>
            <Head title={t('Confirm Password')} />

            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit}>
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

                <div className="flex items-center justify-end mt-4">
                    <Button
                        className="ms-4"
                        processing={processing}
                        onClick={submit}
                    >
                        {t('Confirm')}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
