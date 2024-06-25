import React from 'react'
import { Head } from '@inertiajs/react'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import UpdatePasswordForm from './Partials/UpdatePasswordForm'
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm'
import Card from '@/Components/DaisyUI/Card'
import { useTranslation } from 'react-i18next';
export default function Edit({ mustVerifyEmail, status }) {
    const {t,i18n}=useTranslation()

    return (
        <AuthenticatedLayout page={'System'} action={'Profile'}>
            <Head title={t('Profile')} />

            <div>
                <div className="mx-auto space-y-6">
                    <Card>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </Card>

                    <Card>
                        <UpdatePasswordForm className="max-w-xl" />
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
