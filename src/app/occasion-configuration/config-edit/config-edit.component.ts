import { Component, Input, OnInit, OnChanges, ViewEncapsulation, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import BoardStyle from 'src/app/shared/models/BoardStyles';
import BarMenuService from 'src/app/shared/services/bar-menu-board.service';
import { MatSnackBar } from '@angular/material';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-config-edit',
    templateUrl: './config-edit.component.html',
    styleUrls: ['./config-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfigEditComponent implements OnInit {

    @Input() selectedStyle: BoardStyle;
    @Output() styleUpdate: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    private imageURL = 'https://barmenuboardblob.blob.core.windows.net/image-assets/';

    constructor(private barMenuService: BarMenuService,
                private cd: ChangeDetectorRef,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
    }

    getHeaderImageURL(style: BoardStyle): string {
        return this.imageURL + style.headerImage;
    }

    getMainBackgroundImageURL(style: BoardStyle): string {
        return this.imageURL + style.mainBackgroundImage;
    }

    toggleMainBackgroundColorOrImage() {
        this.selectedStyle.useMainBackgroundColor = !this.selectedStyle.useMainBackgroundColor;
    }

    getRecipeBackgroundImageURL(style: BoardStyle): string {
        return this.imageURL + style.recipeBackgroundImage;
    }

    toggleRecipeBackgroundColorOrImage() {
        this.selectedStyle.useRecipeBackgroundColor = !this.selectedStyle.useRecipeBackgroundColor;
    }

    getRecipeProfileBackgroundImageURL(style: BoardStyle): string {
        return this.imageURL + style.recipeProfileBackgroundImage;
    }

    toggleRecipeProfileBackgroundColorOrImage() {
        this.selectedStyle.useRecipeProfileBackgroundColor = !this.selectedStyle.useRecipeProfileBackgroundColor;
    }

    uploadImage(fileInputEvent: any, imageProperty: string) {
        if (fileInputEvent !== undefined) {
            const strings = fileInputEvent.target.files[0].name.split('.', 2);
            const name = strings[0];
            const extension = strings[1];
            const newFileName = name + '_' +
                    Math.floor(1000 + Math.random() * (10000 + 1 - 1000)) +
                    '.' + extension;

            this.barMenuService.uploadBoardStyleImage(fileInputEvent.target.files[0], newFileName)
                .subscribe(result => {
                    this.setImageProperty(imageProperty, newFileName);
                    this.cd.detectChanges();
                });
        }
    }

    deleteImage(imageName: string, imageProperty: string) {
        this.barMenuService.deleteBoardStyleImage(imageName)
            .subscribe(response => {
                this.setImageProperty(imageProperty, null);
                this.cd.detectChanges();
            });
    }

    private setImageProperty(imageProperty: string, value: any) {
        switch (imageProperty) {
            case 'headerImage': {
                this.selectedStyle.headerImage = value;
                break;
            }
            case 'mainBackgroundImage': {
                this.selectedStyle.mainBackgroundImage = value;
                break;
            }
            case 'recipeBackgroundImage': {
                this.selectedStyle.recipeBackgroundImage = value;
                break;
            }
            case 'recipeProfileBackgroundImage': {
                this.selectedStyle.recipeProfileBackgroundImage = value;
                break;
            }
        }
    }

    save(style: BoardStyle) {
        const newStyle = style.id ? true : false;
        this.barMenuService.saveBoardStyle(style)
            .subscribe(result => {
                this.cd.detectChanges();
                this.styleUpdate.emit(true);
                if (newStyle) {
                    this.selectedStyle = style;
                    this.cd.detectChanges();
                }
                this.openSnackBar('Style Saved, refresh the Specials to see the change', 'dismiss');
            },
                error => this.openSnackBar('Style not saved, a required field is needed', 'dismiss')
            );
    }

    deleteStyle(style: BoardStyle) {
        if (style.active) {
            this.openSnackBar('This style is currently active and cannot be deleted', 'dismiss');
        } else if (style.id === 1) {
            this.openSnackBar('This style is the default style and cannot be deleted', 'dismiss');
        } else {
            this.barMenuService.deleteBoardStyle(style.id).subscribe(res => {
                this.deleteStyleImages(style);
                this.cd.detectChanges();
                this.styleUpdate.emit(true);
                this.openSnackBar('Style has been deleted', 'dismiss');
            });
        }
    }

    deleteStyleImages(style: BoardStyle) {
        const image1 = style.headerImage;
        const image2 = style.mainBackgroundImage;
        const image3 = style.recipeBackgroundImage;
        const image4 = style.recipeProfileBackgroundImage;

        this.barMenuService.deleteBoardStyleImage(image1)
        .pipe(mergeMap(result => {
            return this.barMenuService.deleteBoardStyleImage(image2);
        }))
        .pipe(mergeMap(result => {
            return this.barMenuService.deleteBoardStyleImage(image3);
        }))
        .pipe(mergeMap(result => {
            return this.barMenuService.deleteBoardStyleImage(image4);
        }))
        .subscribe(response => {
            this.cd.detectChanges();
        });
    }

    cancel() {
        this.selectedStyle = null;
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          verticalPosition: 'top',
        });
    }
}
