import { FuseNavigation } from '@fuse/types';

// English
export const Navigation: FuseNavigation[] = [
    {
        id: 'home',
        title: 'Home',
        icon: 'home',
        type: 'item',
        url: '/home'
    },
    {
        id: 'sectors',
        title: 'Sectors',
        icon: 'location_city',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/sectors/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/sectors/search'
            }
        ]
    },
    {
        id: 'stations',
        title: 'Stations',
        icon: 'local_gas_station',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/stations/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/stations/search'
            }
        ]
    },
    {
        id: 'tanks',
        title: 'Tanks',
        icon: 'delete_outline',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/tanks/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/tanks/search'
            }
        ]
    },
    {
        id: 'companies',
        title: 'Companies',
        icon: 'business',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/companies/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/companies/search'
            }
        ]
    },
    {
        id: 'storages',
        title: 'Storages',
        icon: 'storage',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/storages/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/storages/search'
            }
        ]
    },
    {
        id: 'products',
        title: 'Products',
        icon: 'category',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/products/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/products/search'
            }
        ]
    },
    {
        id: 'vehicles',
        title: 'Vehicles',
        icon: 'local_shipping',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/vehicles/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/vehicles/search'
            }
        ]
    },
    {
        id: 'drivers',
        title: 'Drivers',
        icon: 'people',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/drivers/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/drivers/search'
            }
        ]
    },
    {
        id: 'distances',
        title: 'Distances',
        icon: 'map',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/distances/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/distances/search'
            }
        ]
    },
    {
        id: 'trips',
        title: 'Trips',
        icon: 'departure_board',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/trips/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/trips/search'
            }
        ]
    },
    {
        id: 'users',
        title: 'Users',
        icon: 'person_pin',
        type: 'collapsable',
        children: [
            {
                id: 'Create',
                title: 'Create',
                type: 'item',
                url: '/users/create'
            },
            {
                id: 'Search',
                title: 'Search',
                type: 'item',
                url: '/users/search'
            }
        ]
    },
    {
        id: 'reports',
        title: 'Reports',
        icon: 'import_contacts',
        type: 'collapsable',
        children: [
            {
                id: 'dailyreports',
                title: 'Daily reports',
                type: 'collapsable',
                children: [
                    {
                        id: 'withdrawals',
                        title: 'Withdrawals',
                        type: 'item',
                        url: '/withdrawals'
                    },
                    {
                        id: 'sales',
                        title: 'Sales',
                        type: 'item',
                        url: '/sales'
                    },
                    {
                        id: 'importedproduct',
                        title: 'Imported Product',
                        type: 'item',
                        url: '/importedproduct'
                    },
                    {
                        id: 'supplyplan',
                        title: 'Supply Plan',
                        type: 'item',
                        url: '/supplyplan'
                    }
                ]
            },
            {
                id: 'monthlyreports',
                title: 'Monthly reports',
                type: 'collapsable',
                children: [
                    {
                        id: 'withdrawals',
                        title: 'Withdrawals',
                        type: 'item',
                        url: '/withdrawals'
                    },
                    {
                        id: 'sales',
                        title: 'Sales',
                        type: 'item',
                        url: '/sales'
                    },
                    {
                        id: 'importedproduct',
                        title: 'Imported product',
                        type: 'item',
                        url: '/importedproduct'
                    }
                ]
            },
            {
                id: 'specialreports',
                title: 'Special reports',
                type: 'collapsable',
                children: [
                    {
                        id: 'averageimportedproduct',
                        title: 'Average imported product',
                        type: 'item',
                        url: '/averageimportedproduct'
                    },
                    {
                        id: 'endofmonthstationsneeds',
                        title: 'End of month stations\' needs',
                        type: 'item',
                        url: '/endofmonthstationsneeds'
                    },
                    {
                        id: 'storagesremaining',
                        title: 'Storages remaining',
                        type: 'item',
                        url: '/storagesremaining'
                    }
                ]
            }
        ]
    }
];

// Arabic

// export const Navigation: FuseNavigation[] = [
//     {
//         id: 'home',
//         title: 'الصفحة الرئيسية',
//         icon: 'home',
//         type: 'item',
//         url: '/home'
//     },
//     {
//         id: 'sectors',
//         title: 'قطاعات',
//         icon: 'location_city',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/sectors/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/sectors/search'
//             }
//         ]
//     },
//     {
//         id: 'stations',
//         title: 'محطات',
//         icon: 'local_gas_station',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/stations/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/stations/search'
//             }
//         ]
//     },
//     {
//         id: 'tanks',
//         title: 'خزانات',
//         icon: 'delete_outline',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/tanks/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/tanks/search'
//             }
//         ]
//     },
//     {
//         id: 'companies',
//         title: 'شركات',
//         icon: 'business',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/companies/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/companies/search'
//             }
//         ]
//     },
//     {
//         id: 'storages',
//         title: 'مستودعات',
//         icon: 'storage',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/storages/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/storages/search'
//             }
//         ]
//     },
//     {
//         id: 'products',
//         title: 'منتجات',
//         icon: 'category',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/products/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/products/search'
//             }
//         ]
//     },
//     {
//         id: 'vehicles',
//         title: 'مركبات',
//         icon: 'local_shipping',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/vehicles/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/vehicles/search'
//             }
//         ]
//     },
//     {
//         id: 'drivers',
//         title: 'سائقين',
//         icon: 'people',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/drivers/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/drivers/search'
//             }
//         ]
//     },
//     {
//         id: 'distances',
//         title: 'مسافات',
//         icon: 'map',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/distances/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/distances/search'
//             }
//         ]
//     },
//     {
//         id: 'trips',
//         title: 'رحلات',
//         icon: 'departure_board',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/trips/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/trips/search'
//             }
//         ]
//     },
//     {
//         id: 'users',
//         title: 'مستخدمين',
//         icon: 'person_pin',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'Create',
//                 title: 'إنشاء',
//                 type: 'item',
//                 url: '/users/create'
//             },
//             {
//                 id: 'Search',
//                 title: 'بحث',
//                 type: 'item',
//                 url: '/users/search'
//             }
//         ]
//     },
//     {
//         id: 'reports',
//         title: 'تقارير',
//         icon: 'import_contacts',
//         type: 'collapsable',
//         children: [
//             {
//                 id: 'dailyreports',
//                 title: 'تقارير يومية',
//                 type: 'collapsable',
//                 children: [
//                     {
//                         id: 'withdrawals',
//                         title: 'مسحوبات',
//                         type: 'item',
//                         url: '/withdrawals'
//                     },
//                     {
//                         id: 'sales',
//                         title: 'مبيعات',
//                         type: 'item',
//                         url: '/sales'
//                     },
//                     {
//                         id: 'importedproduct',
//                         title: 'واردات',
//                         type: 'item',
//                         url: '/importedproduct'
//                     },
//                     {
//                         id: 'supplyplan',
//                         title: 'خطة الإمداد',
//                         type: 'item',
//                         url: '/supplyplan'
//                     }
//                 ]
//             },
//             {
//                 id: 'monthlyreports',
//                 title: 'تقارير شهرية',
//                 type: 'collapsable',
//                 children: [
//                     {
//                         id: 'withdrawals',
//                         title: 'مسحوبات',
//                         type: 'item',
//                         url: '/withdrawals'
//                     },
//                     {
//                         id: 'sales',
//                         title: 'مبيعات',
//                         type: 'item',
//                         url: '/sales'
//                     },
//                     {
//                         id: 'importedproduct',
//                         title: 'واردات',
//                         type: 'item',
//                         url: '/importedproduct'
//                     }
//                 ]
//             },
//             {
//                 id: 'specialreports',
//                 title: 'تقارير خاصة',
//                 type: 'collapsable',
//                 children: [
//                     {
//                         id: 'averageimportedproduct',
//                         title: 'متوسط الواردات',
//                         type: 'item',
//                         url: '/averageimportedproduct'
//                     },
//                     {
//                         id: 'endofmonthstationsneeds',
//                         title: 'إحتياجات المحطة أخر الشهر',
//                         type: 'item',
//                         url: '/endofmonthstationsneeds'
//                     },
//                     {
//                         id: 'storagesremaining',
//                         title: 'متبقى الخزانات',
//                         type: 'item',
//                         url: '/storagesremaining'
//                     }
//                 ]
//             }
//         ]
//     }
// ];