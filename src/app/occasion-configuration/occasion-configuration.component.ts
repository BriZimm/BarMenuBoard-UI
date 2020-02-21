import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import BarMenuService from '../shared/services/bar-menu-board.service';
import BoardStyle from '../shared/models/BoardStyles';
import { mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-occasion-configuration',
    templateUrl: './occasion-configuration.component.html',
    styleUrls: ['./occasion-configuration.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OccasionConfigurationComponent implements OnInit {
    boardStyles: Array<BoardStyle>;
    currentStyle: BoardStyle;

    constructor(private barMenuService: BarMenuService,
                private cd: ChangeDetectorRef,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.getAllBoardStyles();
    }

    getAllBoardStyles() {
        this.barMenuService.getAllBoardStyles().subscribe(styles => {
            this.boardStyles = styles;
        });
    }

    newStyle() {
        this.currentStyle = {
            name: '',
            headerImage: '',
            mainBackgroundImage: '',
            recipeBackgroundImage: '',
            recipeProfileBackgroundImage: '',

        } as BoardStyle;
    }

    editStyle(style: BoardStyle) {
        this.currentStyle = style;
        this.cd.detectChanges();
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

    makeActive(style: BoardStyle) {
        this.barMenuService.makeStyleActive(style).subscribe(res => {
            this.getAllBoardStyles();
            this.cd.detectChanges();
        });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          verticalPosition: 'top',
        });
    }
}
