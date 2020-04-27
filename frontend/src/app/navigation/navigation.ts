import { FuseNavigation } from '@fuse/types';

// English
export const administratorNavigation: FuseNavigation[] = [
    {
        id: 'home',
        title: 'الرئيسية',
        icon: 'home',
        type: 'item',
        url: '/home'
    },
    {
        id: 'agents',
        title: 'الوكلاء',
        icon: 'business',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/agents/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/agents/search'
            }
        ]
    },
    {
        id: 'distances',
        title: 'المسافات',
        icon: 'map',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/distances/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/distances/search'
            }
        ]
    },
    {
        id: 'drivers',
        title: 'السائقين',
        icon: 'people',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/drivers/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/drivers/search'
            }
        ]
    },
    {
        id: 'products',
        title: 'المنتجات',
        icon: 'category',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/products/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/products/search'
            }
        ]
    },
    {
        id: 'quotas',
        title: 'الكوتات',
        icon: 'cloud',
        type: 'item',
        url: '/quotas'
    },
    {
        id: 'sectors',
        title: 'القطاعات',
        icon: 'pie_chart',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/sectors/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/sectors/search'
            }
        ]
    },
    {
        id: 'stations',
        title: 'المحطات',
        icon: 'local_gas_station',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/stations/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/stations/search'
            }
        ]
    },
    {
        id: 'trips',
        title: 'الرحلات',
        icon: 'departure_board',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/trips/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/trips/search'
            }
        ]
    },
    {
        id: 'users',
        title: 'المستخدمين',
        icon: 'person_pin',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/users/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/users/search'
            }
        ]
    },
    {
        id: 'vehicles',
        title: 'المركبات',
        icon: 'local_shipping',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/vehicles/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/vehicles/search'
            }
        ]
    },
    {
        id: 'warehouses',
        title: 'المستودعات',
        icon: 'account_balance',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'إنشاء',
                type: 'item',
                url: '/warehouses/create'
            },
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/warehouses/search'
            }
        ]
    },
    {
        id: 'acknowledgement',
        title: 'التمامات',
        icon: 'done_all',
        type: 'collapsable',
        children: [
            {
                id: 'sales',
                title: 'المبيعات',
                type: 'item',
                url: '/acknowledgements/sales'
            },
            {
                id: 'existings',
                title: 'الموجودات',
                type: 'item',
                url: '/acknowledgements/existings'
            }
        ]
    },
    {
        id: 'reports',
        title: 'التقارير',
        icon: 'import_contacts',
        type: 'collapsable',
        children: [
            {
                id: 'distances-report',
                title: 'المسافات المقطوعة',
                type: 'item',
                url: '/reports/distances'
            },
            {
                id: 'imports-report',
                title: 'الواردات',
                type: 'item',
                url: '/reports/imports'
            },
            {
                id: 'needs-report',
                title: 'الإحتياجات',
                type: 'item',
                url: '/reports/needs'
            },
            {
                id: 'sales-report',
                title: 'المبيعات',
                type: 'item',
                url: '/reports/sales'
            },
            {
                id: 'withdrawals-reports',
                title: 'المسحوبات',
                type: 'collapsable',
                children: [
                    {
                        id: 'companies-report',
                        title: 'الشركات',
                        type: 'item',
                        url: '/reports/withdrawals/companies'
                    },
                    {
                        id: 'remainings-report',
                        title: 'المتبقيات',
                        type: 'item',
                        url: '/reports/withdrawals/remainings'
                    },
                    {
                        id: 'warehouses-report',
                        title: 'المستودعات',
                        type: 'item',
                        url: '/reports/withdrawals/warehouses'
                    }
                ]
            }
        ]
    }
];

export const operatorNavigation: FuseNavigation[] = [
    {
        id: 'home',
        title: 'الرئيسية',
        icon: 'home',
        type: 'item',
        url: '/home'
    },
    {
        id: 'agents',
        title: 'الوكلاء',
        icon: 'business',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/agents/search'
            }
        ]
    },
    {
        id: 'distances',
        title: 'المسافات',
        icon: 'map',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/distances/search'
            }
        ]
    },
    {
        id: 'drivers',
        title: 'السائقين',
        icon: 'people',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/drivers/search'
            }
        ]
    },
    {
        id: 'products',
        title: 'المنتجات',
        icon: 'category',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/products/search'
            }
        ]
    },
    {
        id: 'quotas',
        title: 'الكوتات',
        icon: 'cloud',
        type: 'item',
        url: '/quotas'
    },
    {
        id: 'sectors',
        title: 'القطاعات',
        icon: 'pie_chart',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/sectors/search'
            }
        ]
    },
    {
        id: 'stations',
        title: 'المحطات',
        icon: 'local_gas_station',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/stations/search'
            }
        ]
    },
    {
        id: 'trips',
        title: 'الرحلات',
        icon: 'departure_board',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/trips/search'
            }
        ]
    },
    {
        id: 'users',
        title: 'المستخدمين',
        icon: 'person_pin',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/users/search'
            }
        ]
    },
    {
        id: 'vehicles',
        title: 'المركبات',
        icon: 'local_shipping',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/vehicles/search'
            }
        ]
    },
    {
        id: 'warehouses',
        title: 'المستودعات',
        icon: 'account_balance',
        type: 'collapsable',
        children: [
            {
                id: 'Search',
                title: 'بحث',
                type: 'item',
                url: '/warehouses/search'
            }
        ]
    },
    {
        id: 'acknowledgement',
        title: 'التمامات',
        icon: 'done_all',
        type: 'collapsable',
        children: [
            {
                id: 'sales',
                title: 'المبيعات',
                type: 'item',
                url: '/acknowledgements/sales'
            },
            {
                id: 'existings',
                title: 'الموجودات',
                type: 'item',
                url: '/acknowledgements/existings'
            }
        ]
    },
    {
        id: 'reports',
        title: 'التقارير',
        icon: 'import_contacts',
        type: 'collapsable',
        children: [
            {
                id: 'distances-report',
                title: 'المسافات المقطوعة',
                type: 'item',
                url: '/reports/distances'
            },
            {
                id: 'imports-report',
                title: 'الواردات',
                type: 'item',
                url: '/reports/imports'
            },
            {
                id: 'needs-report',
                title: 'الإحتياجات',
                type: 'item',
                url: '/reports/needs'
            },
            {
                id: 'sales-report',
                title: 'المبيعات',
                type: 'item',
                url: '/reports/sales'
            },
            {
                id: 'withdrawals-reports',
                title: 'المسحوبات',
                type: 'collapsable',
                children: [
                    {
                        id: 'companies-report',
                        title: 'الشركات',
                        type: 'item',
                        url: '/reports/withdrawals/companies'
                    },
                    {
                        id: 'remainings-report',
                        title: 'المتبقيات',
                        type: 'item',
                        url: '/reports/withdrawals/remainings'
                    },
                    {
                        id: 'warehouses-report',
                        title: 'المستودعات',
                        type: 'item',
                        url: '/reports/withdrawals/warehouses'
                    }
                ]
            }
        ]
    }
];