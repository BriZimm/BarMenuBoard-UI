import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import LiquorCategory from '../shared/models/LiquorCategory';
import MixerCategory from '../shared/models/MixerCategory';
import GarnishCategory from '../shared/models/GarnishCategory';
import BarMenuService from '../shared/services/bar-menu-board.service';
import { MatSnackBar } from '@angular/material';
import { mergeMap } from 'rxjs/operators';
import AmountValue from '../shared/models/AmountValue';

@Component({
    selector: 'app-inventory-config',
    templateUrl: './inventory-config.component.html',
    styleUrls: ['./inventory-config.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InventoryConfigComponent implements OnInit {
    liquorCategories: LiquorCategory[];
    mixerCategories: MixerCategory[];
    garnishCategories: GarnishCategory[];
    amountValues: AmountValue[];

    addLiquor: boolean;
    addMixer: boolean;
    addGarnish: boolean;
    addAmountValue: boolean;

    liquorToAdd: LiquorCategory = new LiquorCategory();
    mixerToAdd: MixerCategory = new MixerCategory();
    garnishToAdd: GarnishCategory = new GarnishCategory();
    amountValueToAdd: AmountValue = new AmountValue();

    constructor(private barMenuService: BarMenuService,
                private snackBar: MatSnackBar,
                private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.getValues();
    }

    getValues() {
        this.barMenuService.getAllLiquorCategories()
        .pipe(mergeMap(liquors => {
            this.liquorCategories = liquors;
            return this.barMenuService.getAllMixerCategories();
        }))
        .pipe(mergeMap(mixers => {
            this.mixerCategories = mixers;
            return this.barMenuService.getAllGarnishCategories();
        }))
        .pipe(mergeMap(garnishes => {
            this.garnishCategories = garnishes;
            return this.barMenuService.getAllAmountValues();
        }))
        .subscribe(amountValues => {
            this.amountValues = amountValues;
            this.cd.detectChanges();
        });

    }

    showHideAddCategory(type: string, show: boolean) {
        switch (type) {
            case 'liquor': {
                if (show) {
                    this.addLiquor = true;
                    this.addMixer = false;
                    this.addGarnish = false;
                    this.addAmountValue = false;
                } else {
                    this.addLiquor = false;
                }
                break;
            }
            case 'mixer': {
                if (show) {
                    this.addLiquor = false;
                    this.addMixer = true;
                    this.addGarnish = false;
                    this.addAmountValue = false;
                } else {
                    this.addMixer = false;
                }
                break;
            }
            case 'garnish': {
                if (show) {
                    this.addLiquor = false;
                    this.addMixer = false;
                    this.addGarnish = true;
                    this.addAmountValue = false;
                } else {
                    this.addGarnish = false;
                }
                break;
            }
            case 'amount': {
                if (show) {
                    this.addLiquor = false;
                    this.addMixer = false;
                    this.addGarnish = false;
                    this.addAmountValue = true;
                } else {
                    this.addAmountValue = false;
                }
                break;
            }
        }
    }

    addCategory(type: string) {
        switch (type) {
            case 'liquor': {
                const duplicateExists = this.checkForDuplicate('liquor');
                if (duplicateExists) {
                    this.openSnackBar('That liquor category already exists', 'dismiss');
                } else {
                    // Save Category
                    this.barMenuService.saveLiquorCategory(this.liquorToAdd).subscribe(x => {
                        this.addLiquor = false;
                        this.liquorToAdd = new LiquorCategory();
                        this.openSnackBar('New liquor category saved', 'dismiss');
                        this.getValues();
                    });
                }
                break;
            }
            case 'mixer': {
                const duplicateExists = this.checkForDuplicate('mixer');
                if (duplicateExists) {
                    this.openSnackBar('That mixer category already exists', 'dismiss');
                } else {
                    // Save Category
                    this.barMenuService.saveMixerCategory(this.mixerToAdd).subscribe(x => {
                        this.addMixer = false;
                        this.mixerToAdd = new MixerCategory();
                        this.openSnackBar('New mixer category saved', 'dismiss');
                        this.getValues();
                    });
                }
                break;
            }
            case 'garnish': {
                const duplicateExists = this.checkForDuplicate('garnish');
                if (duplicateExists) {
                    this.openSnackBar('That garnish category already exists', 'dismiss');
                } else {
                    // Save Category
                    this.barMenuService.saveGarnishCategory(this.garnishToAdd).subscribe(x => {
                        this.addGarnish = false;
                        this.garnishToAdd = new GarnishCategory();
                        this.openSnackBar('New garnish category saved', 'dismiss');
                        this.getValues();
                    });
                }
                break;
            }
            case 'amount': {
                const duplicateExists = this.checkForDuplicate('amount');
                if (duplicateExists) {
                    this.openSnackBar('That amount value already exists', 'dismiss');
                } else {
                    // Save Amount Value
                    this.barMenuService.saveAmountValue(this.amountValueToAdd).subscribe(x => {
                        this.addAmountValue = false;
                        this.amountValueToAdd = new AmountValue();
                        this.openSnackBar('New amount value saved', 'dismiss');
                        this.getValues();
                    });
                }
                break;
            }
        }
    }

    checkForDuplicate(type: string) {
        let result: any;
        switch (type) {
            case 'liquor': {
                result = this.liquorCategories.filter(l => l.category === this.liquorToAdd.category);
                break;
            }
            case 'mixer': {
                result = this.mixerCategories.filter(m => m.category === this.mixerToAdd.category);
                break;
            }
            case 'garnish': {
                result = this.garnishCategories.filter(g => g.category === this.garnishToAdd.category);
                break;
            }
            case 'amount': {
                result = this.amountValues.filter(a => a.value === this.amountValueToAdd.value);
                break;
            }
        }

        return result.length > 0;
    }

    deleteLiquorCat(item: LiquorCategory) {
        this.barMenuService.deleteLiquorCategory(item.id)
            .subscribe(result => {
                this.openSnackBar(`${item.category} category deleted`, 'dismiss');
                this.getValues();
        });
    }

    deleteMixerCat(item: MixerCategory) {
        this.barMenuService.deleteMixerCategory(item.id)
            .subscribe(result => {
                this.openSnackBar(`${item.category} category deleted`, 'dismiss');
                this.getValues();
        });
    }

    deleteGarnishCat(item: GarnishCategory) {
        this.barMenuService.deleteGarnishCategory(item.id)
            .subscribe(result => {
                this.openSnackBar(`${item.category} category deleted`, 'dismiss');
                this.getValues();
        });
    }

    deleteAmountValue(item: AmountValue) {
        this.barMenuService.deleteAmountValue(item.id)
            .subscribe(result => {
                this.openSnackBar(`${item.value} category deleted`, 'dismiss');
                this.getValues();
        });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          verticalPosition: 'top',
        });
    }
}
