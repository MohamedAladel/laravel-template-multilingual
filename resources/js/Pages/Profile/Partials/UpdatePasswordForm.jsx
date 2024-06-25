import React, { useRef } from 'react'
import { useForm } from '@inertiajs/react'

import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'
import { useTranslation } from 'react-i18next';
export default function UpdatePasswordForm({ className }) {
    const {t,i18n}=useTranslation()

    const passwordInput = useRef()
    const currentPasswordInput = useRef()

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation')
                    passwordInput.current.focus()
                }

                if (errors.current_password) {
                    reset('current_password')
                    currentPasswordInput.current.focus()
                }
            },
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-base-content">
                    {t('Update Password')}
                </h2>

                <p className="mt-1 text-sm text-base-content">
                    {t('long password advice')}
                </p>
            </header>

            <div className="mt-6 space-y-6">
                <div>
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        label={t('Current Password')}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        error={errors.current_password}
                    />
                </div>

                <div>
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        label={t('New Password')}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        error={errors.password}
                    />
                </div>

                <div>
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        label={t('Confirm Password')}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        error={errors.password_confirmation}
                    />
                </div>

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
