import { NgModule } from '@angular/core';
import { MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatSelectModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AboutComponent } from './about/about.component';
import { FuseWidgetModule } from '@fuse/components';
import { StationComponent } from './station.component';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: '**',
        component: StationComponent
    }
];

@NgModule({
    declarations: [
        StationComponent,
        AboutComponent
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
export class StationModule {
}
