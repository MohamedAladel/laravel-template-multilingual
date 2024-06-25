import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Card from '@/Components/DaisyUI/Card'
import { useTranslation } from 'react-i18next';
export default function Dashboard(props) {
    const {t,i18n}=useTranslation()

    return (
        <AuthenticatedLayout page={'Dashboard'} action={''}>
            <Head title="Dashboard" />

            <div>
                <Card>{t('Dashboard')}</Card>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-2 gap-2">
                    <Card>
                        <h3 className="text-lg font-bold">
                            {props.role_count}
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            {t('Roles')}
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-bold">
                            {props.user_count}
                        </h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            {t('Users')}
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-bold">0</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            {t('Empty')}
                        </p>
                    </Card>
                    <Card>
                        <h3 className="text-lg font-bold">0</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            {t('Empty')}
                        </p>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
