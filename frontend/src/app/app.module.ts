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
import { AuthGuardService } from './main/services/auth-guard.service';
import { RoleGuardService } from './main/services/role-guard.service';
import { environment } from 'environments/environment';


const appRoutes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: './main/components/login/login.module#LoginModule'
    },
    {
        path: 'home',
        loadChildren: './main/components/home/home.module#HomeModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'agents/create',
        loadChildren: './main/components/agents/agents-create/agents-create.module#AgentsCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'agents/search',
        loadChildren: './main/components/agents/agents-search/agents-search.module#AgentsSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'distances/create',
        loadChildren: './main/components/distances/distances-create/distances-create.module#DistancesCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'distances/search',
        loadChildren: './main/components/distances/distances-search/distances-search.module#DistancesSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'drivers/create',
        loadChildren: './main/components/drivers/drivers-create/drivers-create.module#DriversCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'drivers/search',
        loadChildren: './main/components/drivers/drivers-search/drivers-search.module#DriversSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'products/create',
        loadChildren: './main/components/products/products-create/products-create.module#ProductsCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'products/search',
        loadChildren: './main/components/products/products-search/products-search.module#ProductsSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'quotas/create',
        loadChildren: './main/components/quotas/quotas-create/quotas-create.module#QuotasCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'quotas/search',
        loadChildren: './main/components/quotas/quotas-search/quotas-search.module#QuotasSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'sectors/create',
        loadChildren: './main/components/sectors/sectors-create/sectors-create.module#SectorsCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'sectors/search',
        loadChildren: './main/components/sectors/sectors-search/sectors-search.module#SectorsSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'stations/create',
        loadChildren: './main/components/stations/stations-create/stations-create.module#StationsCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'stations/search',
        loadChildren: './main/components/stations/stations-search/stations-search.module#StationsSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'station/:id',
        loadChildren: './main/components/stations/stations-search/station/station.module#StationModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'trips/create',
        loadChildren: './main/components/trips/trips-create/trips-create.module#TripsCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'trips/search',
        loadChildren: './main/components/trips/trips-search/trips-search.module#TripsSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'users/create',
        loadChildren: './main/components/users/users-create/users-create.module#UsersCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'users/search',
        loadChildren: './main/components/users/users-search/users-search.module#UsersSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'vehicles/create',
        loadChildren: './main/components/vehicles/vehicles-create/vehicles-create.module#VehiclesCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'vehicles/search',
        loadChildren: './main/components/vehicles/vehicles-search/vehicles-search.module#VehiclesSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'warehouses/create',
        loadChildren: './main/components/warehouses/warehouses-create/warehouses-create.module#WarehousesCreateModule',
        canActivate: [RoleGuardService],
        data: {
            expectedRole: environment.roles.Administrator
        }
    },
    {
        path: 'warehouses/search',
        loadChildren: './main/components/warehouses/warehouses-search/warehouses-search.module#WarehousesSearchModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'warehouse/:id',
        loadChildren: './main/components/warehouses/warehouses-search/warehouse/warehouse.module#WarehouseModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'acknowledgements/sales',
        loadChildren: './main/components/acknowledgements/sales/sales.module#SalesModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'acknowledgements/existings',
        loadChildren: './main/components/acknowledgements/existings/existings.module#ExistingsModule',
        canActivate: [AuthGuardService]
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
        GenericService,
        AuthGuardService,
        RoleGuardService
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
