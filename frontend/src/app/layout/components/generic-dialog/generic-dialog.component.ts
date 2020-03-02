import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-generic-dialog',
    templateUrl: './generic-dialog.component.html',
    styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent implements OnInit {
    title:string;
    content: string

    constructor(
        private dialogRef: MatDialogRef<GenericDialogComponent>,
        @Inject(MAT_DIALOG_DATA) { title, content }
    ) {
        this.title = title;
        this.content = content
    }

    ngOnInit() {
    }

    submit(button: string) {
        this.dialogRef.close(button);
    }

}
