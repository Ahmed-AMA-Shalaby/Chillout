import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    GenericTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule
  ],
  exports: [
    GenericTableComponent
  ]
})
export class GenericTableModule { }
