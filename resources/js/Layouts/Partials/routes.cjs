import { HiChartPie, HiUser, HiCog, HiGlobeAlt } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

const routes = () => {
    const { t, i18n } = useTranslation();

    
    const routes= [
        {
            name: t('Dashboard'),
            show: true,
            icon: HiChartPie,
            route: route('dashboard'),
            active: 'dashboard',
            permission: 'view-dashboard',
        },
        
        {
            name: t('User'),
            show: true,
            icon: HiUser,
            items: [
                {
                    name: t('Roles'),
                    show: true,
                    route: route('roles.index'),
                    active: 'roles.*',
                    permission: 'view-role',
                },
                {
                    name: t('Users'),
                    show: true,
                    route: route('user.index'),
                    active: 'user.index',
                    permission: 'view-user',
                },
            ],
        },
       
        {
            name: t('Customer'),
            show: true,
            icon: HiUser,
            route: route('customers.index'),
            active: 'customers.index',
            permission: 'view-customer',
        },
        
        {
            name: t('Shortlink'),
            show: true,
            icon: HiGlobeAlt,
            route: route('shortlink.link.index'),
            active: 'shortlink.link.*',
            permission: 'view-shortlink',
        },
        {
            name: t('Setting'),
            show: true,
            icon: HiCog,
            route: route('setting.index'),
            active: 'setting.index',
            permission: 'view-setting',
        },
    ];
    
    return routes;
};

export default routes;
