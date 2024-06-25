import { HiSearch } from 'react-icons/hi'
import TextInput from './TextInput'
import { useTranslation } from 'react-i18next';
export default function SearchInput({ onChange, value }) {
    const {t}=useTranslation()
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <HiSearch className="text-base" />
            </div>
            <TextInput
                placeholder={t('Search')}
                className="ps-10"
                onChange={onChange}
                value={value}
                autoComplete="off"
            />
        </div>
    )
}
