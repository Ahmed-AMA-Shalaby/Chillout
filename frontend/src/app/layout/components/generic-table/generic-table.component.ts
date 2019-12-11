import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class GenericTableComponent implements OnInit, OnChanges {

  @Input() data: [];
  @Input() cellLink: String;
  @Input() type: String;

  dataSource: MatTableDataSource<{}>;
  originalColumns = [];
  displayedColumns = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Input() length: number;
  @Input() pageSize: number;

  @Output() pageParamters = new EventEmitter();


  setPageParams(event): void {
    this.pageParamters.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize });
  }

  constructor() { }

  ngOnInit(): void {

    if (this.type === 'vehicles') {
      this.originalColumns = ['vehicleCode', 'vehiclePlate', 'vehicleCard', 'trailerPlate'];
      this.displayedColumns = ['Vehicle Code', 'Vehicle Plate', 'Vehicle Card', 'Trailer Plate'];
    }
    else if (this.type === "specializations") {
      this.originalColumns = ['name', 'growthPlatform', 'serviceLine', 'practice'];
      this.displayedColumns = ['Name', 'Growth Platform', 'Service Line', 'Practice'];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.data) {
        this.data = changes.data.currentValue;
        this.dataSource = new MatTableDataSource(this.data);
      }
    }
  }

}
