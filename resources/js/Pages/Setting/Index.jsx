import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import TextInput from '@/Components/DaisyUI/TextInput'
import Button from '@/Components/DaisyUI/Button'
import { Head, useForm } from '@inertiajs/react'
import { isEmpty } from 'lodash'
import Card from '@/Components/DaisyUI/Card'

const extractValue = (set, key) => {
    const find = set.find((s) => s.key === key)
    if (isEmpty(find) === false) {
        if (find.type === 'image') {
            return find?.url
        }
        return find?.value
    }
    return ''
}

export default function Setting(props) {
    const { setting } = props

    const { data, setData, post, processing, errors } = useForm({
        app_name: extractValue(setting, 'app_name'),
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

    const handleSubmit = () => {
        post(route('setting.update'))
    }

    return (
        <AuthenticatedLayout page={'Setting'} action={['Index']}>
            <Head title="Setting" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 overflow-hidden">
                    <Card>
                        <div className="text-xl font-bold mb-4 text-base-content">
                            Setting
                        </div>
                        <TextInput
                            name="app_name"
                            value={data.app_name}
                            onChange={handleOnChange}
                            label="App Name"
                            error={errors.app_name}
                        />
                        <div className="mt-4">
                            <Button
                                onClick={handleSubmit}
                                processing={processing}
                                type="primary"
                            >
                                Simpan
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
