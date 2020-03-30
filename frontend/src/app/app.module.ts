import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from 'app/app.component';
import { fuseConfig } from 'app/fuse-config';
import { LayoutModule } from 'app/layout/layout.module';

import 'hammerjs';
import { ColorSketchModule } from 'ngx-color/sketch';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';
import { AppStorageService } from './main/services/app-storage.service';
import { GenericService } from './main/services/generic.service';
import { GenericDialogComponent } from './layout/components/generic-dialog/generic-dialog.component';


const appRoutes: Routes = [
    {
        path: '', redirectTo: 'welcome', pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadChildren: './main/components/welcome/welcome.module#WelcomeModule'
    },
    {
        path: 'home',
        loadChildren: './main/components/home/home.module#HomeModule'
    },
    {
        path: 'agents/create',
        loadChildren: './main/components/agents/agents-create/agents-create.module#AgentsCreateModule'
    },
    {
        path: 'agents/search',
        loadChildren: './main/components/agents/agents-search/agents-search.module#AgentsSearchModule'
    },
    {
        path: 'distances/create',
        loadChildren: './main/components/distances/distances-create/distances-create.module#DistancesCreateModule'
    },
    {
        path: 'distances/search',
        loadChildren: './main/components/distances/distances-search/distances-search.module#DistancesSearchModule'
    },
    {
        path: 'drivers/create',
        loadChildren: './main/components/drivers/drivers-create/drivers-create.module#DriversCreateModule'
    },
    {
        path: 'drivers/search',
        loadChildren: './main/components/drivers/drivers-search/drivers-search.module#DriversSearchModule'
    },
    {
        path: 'products/create',
        loadChildren: './main/components/products/products-create/products-create.module#ProductsCreateModule'
    },
    {
        path: 'products/search',
        loadChildren: './main/components/products/products-search/products-search.module#ProductsSearchModule'
    },
    {
        path: 'quotas/create',
        loadChildren: './main/components/quotas/quotas-create/quotas-create.module#QuotasCreateModule'
    },
    {
        path: 'quotas/search',
        loadChildren: './main/components/quotas/quotas-search/quotas-search.module#QuotasSearchModule'
    },
    {
        path: 'sectors/create',
        loadChildren: './main/components/sectors/sectors-create/sectors-create.module#SectorsCreateModule'
    },
    {
        path: 'sectors/search',
        loadChildren: './main/components/sectors/sectors-search/sectors-search.module#SectorsSearchModule'
    },
    {
        path: 'stations/create',
        loadChildren: './main/components/stations/stations-create/stations-create.module#StationsCreateModule'
    },
    {
        path: 'stations/search',
        loadChildren: './main/components/stations/stations-search/stations-search.module#StationsSearchModule'
    },
    {
        path: 'station/:id',
        loadChildren: './main/components/stations/stations-search/station/station.module#StationModule'
    },
    {
        path: 'users/create',
        loadChildren: './main/components/users/users-create/users-create.module#UsersCreateModule'
    },
    {
        path: 'users/search',
        loadChildren: './main/components/users/users-search/users-search.module#UsersSearchModule'
    },
    {
        path: 'vehicles/create',
        loadChildren: './main/components/vehicles/vehicles-create/vehicles-create.module#VehiclesCreateModule'
    },
    {
        path: 'vehicles/search',
        loadChildren: './main/components/vehicles/vehicles-search/vehicles-search.module#VehiclesSearchModule'
    },
    {
        path: 'warehouses/create',
        loadChildren: './main/components/warehouses/warehouses-create/warehouses-create.module#WarehousesCreateModule'
    },
    {
        path: 'warehouses/search',
        loadChildren: './main/components/warehouses/warehouses-search/warehouses-search.module#WarehousesSearchModule'
    },
    {
        path: 'warehouse/:id',
        loadChildren: './main/components/warehouses/warehouses-search/warehouse/warehouse.module#WarehouseModule'
    },
    {
        path: 'acknowledgements/sales',
        loadChildren: './main/components/acknowledgements/sales/sales.module#SalesModule'
    },
    {
        path: 'acknowledgements/existings',
        loadChildren: './main/components/acknowledgements/existings/existings.module#ExistingsModule'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        GenericDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        ColorSketchModule,
        // Material moment date module
        MatMomentDateModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,

        // Material
        MatSnackBarModule,
        MatDialogModule
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 3000
            }
        },
        AppStorageService,
        GenericService
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        GenericDialogComponent
    ]
})
export class AppModule {
}
