import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'
import { usePrevious } from 'react-use'
import { Head, Link } from '@inertiajs/react'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useModalState } from '@/hooks'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Pagination from '@/Components/Pagination'
import ModalConfirm from '@/Components/DaisyUI/ModalConfirm'
import SearchInput from '@/Components/DaisyUI/SearchInput'
import HasPermission from '@/Components/Common/HasPermission'
import Dropdown from '@/Components/DaisyUI/Dropdown'
import Button from '@/Components/DaisyUI/Button'
import Card from '@/Components/DaisyUI/Card'

export default function Index(props) {
    const {
        data: { links, data },
    } = props

    const [search, setSearch] = useState('')
    const preValue = usePrevious(search)

    const confirmModal = useModalState()

    const handleDeleteClick = (product) => {
        confirmModal.setData(product)
        confirmModal.toggle()
    }

    const onDelete = () => {
        if (confirmModal.data !== null) {
            router.delete(route('roles.destroy', confirmModal.data.id))
        }
    }

    const params = { q: search }
    useEffect(() => {
        if (preValue) {
            router.get(
                route(route().current()),
                { q: search },
                {
                    replace: true,
                    preserveState: true,
                }
            )
        }
    }, [search])

    return (
        <AuthenticatedLayout page={'System'} action={'Role'}>
            <Head title="Role" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <div className="flex justify-between">
                            <HasPermission p="create-role">
                                <Link href={route('roles.create')}>
                                    <Button size="sm" type="primary">
                                        Tambah
                                    </Button>
                                </Link>
                            </HasPermission>

                            <div className="flex items-center">
                                <SearchInput
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((role, index) => (
                                    <tr key={role.id}>
                                        <td>{role.name}</td>
                                        <td className="text-right">
                                            <Dropdown
                                                label={'Opsi'}
                                                last={
                                                    index + 1 === +data.length
                                                }
                                            >
                                                <HasPermission p="update-role">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    'roles.edit',
                                                                    role
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiPencil />
                                                            <div>Ubah</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                                <HasPermission p="delete-role">
                                                    <Dropdown.Item
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                role
                                                            )
                                                        }
                                                    >
                                                        <div className="flex space-x-1 items-center">
                                                            <HiTrash />
                                                            <div>Hapus</div>
                                                        </div>
                                                    </Dropdown.Item>
                                                </HasPermission>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="w-full overflow-x-auto flex lg:justify-center">
                            <Pagination links={links} params={params} />
                        </div>
                    </Card>
                </div>
            </div>
            <ModalConfirm modalState={confirmModal} onConfirm={onDelete} />
        </AuthenticatedLayout>
    )
}
