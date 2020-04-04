import { NgModule } from '@angular/core';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatSelectModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
// import { AboutComponent } from './about/about.component';
import { FuseWidgetModule } from '@fuse/components';
import { TripComponent } from './trip.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: '**',
        component: TripComponent
    }
];

@NgModule({
    declarations: [
        TripComponent,
        // AboutComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        FuseWidgetModule,
        FuseSharedModule,

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule

    ],
    providers: [
    ]
})
export class TripModule {
}
