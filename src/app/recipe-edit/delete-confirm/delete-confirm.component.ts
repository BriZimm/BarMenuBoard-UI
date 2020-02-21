import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Recipe from 'src/app/shared/models/Recipe';

export interface DialogData {
    recipe: Recipe;
}

@Component({
    selector: 'app-delete-confirm',
    templateUrl: './delete-confirm.component.html',
    styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

}
