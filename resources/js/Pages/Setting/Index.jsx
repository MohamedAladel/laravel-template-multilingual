import React ,{ useState, useEffect }  from "react";
import { Head, useForm } from "@inertiajs/react";
import { isEmpty } from "lodash";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/DaisyUI/Card";
import TextInput from "@/Components/DaisyUI/TextInput";
import Button from "@/Components/DaisyUI/Button";
import FormFile from "@/Components/DaisyUI/FormFile";
import { Select, Option } from '@/Components/DaisyUI/SelectInput'
import { useTranslation } from "react-i18next";
const extractValue = (set, key) => {
    const find = set.find((s) => s.key === key);
    if (isEmpty(find) === false) {
        if (find.type === "image") {
            return find?.url;
        }
        return find?.value;
    }
    return "";
};

export default function Setting(props) {
    const { setting } = props;
    const { t, i18n } = useTranslation();

    const app_logo_url = extractValue(setting, "app_logo");
    const { data, setData, post, processing, errors } = useForm({
        app_name: extractValue(setting, "app_name"),
        app_logo: "",
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                    ? 1
                    : 0
                : event.target.value
        );
    };

    const handleSubmit = () => {
        post(route("setting.update"));
    };
    let lang =i18n.language

    const handleLangChange = (event) => {
        const value = event.target.value;
        lang=value
        i18n.changeLanguage(value)
        // Example validation
    
      };

    return (
        <AuthenticatedLayout page={"System"} action={"Setting"}>
            <Head title={t("Setting")} />

            <div>
                <Card>
                    <div className="text-xl font-bold mb-4 text-base-content">
                        {t("Setting")}
                    </div>
                    <TextInput
                        name="app_name"
                        value={data.app_name}
                        onChange={handleOnChange}
                        label={t("App Name")}
                        error={errors.app_name}
                    />
                    <FormFile
                        label={t("App Logo")}
                        onChange={(file_path) => setData("app_logo", file_path)}
                        error={errors.app_logo}
                        url={app_logo_url}
                        filemimes="image/jpg,image/jpeg,image/png"
                    />
                    <div>
                        <Select
                            label={t('language')}
                            name="lang-select"
                            value={lang}
                            defaultValue={lang}
                            onChange={handleLangChange}
                        >
                            <Option value="en" children={"English"}></Option>
                            <Option value="ar" children={"Arabic"}></Option>
                            <Option value="id" children={"Indonesian"}></Option>
                        </Select>
                    </div>
                    <div className="mt-4">
                        <Button
                            onClick={handleSubmit}
                            processing={processing}
                            type="primary"
                        >
                            {t("Save")}
                        </Button>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
