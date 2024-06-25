import React from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'

import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'
import { useTranslation } from 'react-i18next';
export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
}) {
    const user = usePage().props.auth.user

    const {t,i18n}=useTranslation()

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    })

    const submit = (e) => {
        e.preventDefault()
        patch(route('profile.update'))
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-base-content">
                    {t('Profile Information')}
                </h2>

                <p className="mt-1 text-sm text-base-content">
                    {t('Update your accounts profile information and email address')}
                </p>
            </header>

            <div className="mt-6 space-y-6">
                <div>
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        label={t('Name')}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoFocus={true}
                        autoComplete="name"
                        error={errors.name}
                    />
                </div>

                <div>
                    <TextInput
                        id="email"
                        type="email"
                        label={t('Email')}
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="email"
                        error={errors.email}
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            {t('Your email address is unverified.')}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {t('Click here to re-send the verification email.')}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                {t('A new verification link has been sent to your email address.')}
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button
                        onClick={submit}
                        processing={processing}
                        type="primary"
                    >
                        {t('Save')}
                    </Button>
                </div>
            </div>
        </section>
    )
}
