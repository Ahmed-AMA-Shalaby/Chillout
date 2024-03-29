import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        GenericTableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        // Material
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,

        RouterModule
    ],
    exports: [
        GenericTableComponent
    ]
})
export class GenericTableModule { }
