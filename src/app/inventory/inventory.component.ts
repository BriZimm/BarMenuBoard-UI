import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import Inventory from '../shared/models/Inventory';
import BarMenuService from '../shared/services/bar-menu-board.service';
import { IngredientType } from '../shared/enums/ingredient-type.enum';
import { MatSnackBar } from '@angular/material';
import { mergeMap } from 'rxjs/operators';
import LiquorCategory from '../shared/models/LiquorCategory';
import MixerCategory from '../shared/models/MixerCategory';
import GarnishCategory from '../shared/models/GarnishCategory';
import AmountValue from '../shared/models/AmountValue';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InventoryComponent implements OnInit {
    alcohols: Inventory[];
    mixers: Inventory[];
    garnishes: Inventory[];
    addItem: boolean;
    item: Inventory;

    liquorCategories: LiquorCategory[];
    mixerCategories: MixerCategory[];
    garnishCategories: GarnishCategory[];
    amountValues: AmountValue[];

    Enums = {
        IngredientType: IngredientType as typeof IngredientType
    };

    constructor(private barMenuService: BarMenuService,
                private snackBar: MatSnackBar,
                private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.getValues();
    }

    getValues() {
        this.barMenuService.getAllInventory()
            .subscribe(inventory => {
                this.alcohols = inventory.filter(x => x.ingredientType === IngredientType.Alcohol);
                this.mixers = inventory.filter(x => x.ingredientType === IngredientType.Mixer);
                this.garnishes = inventory.filter(x => x.ingredientType === IngredientType.Garnish);
        });

        this.barMenuService.getAllLiquorCategories()
            .pipe(mergeMap(liquorCategories => {
                this.liquorCategories = liquorCategories;
                return this.barMenuService.getAllMixerCategories();
            }))
            .pipe(mergeMap(mixerCategories => {
                this.mixerCategories = mixerCategories;
                return this.barMenuService.getAllGarnishCategories();
            }))
            .pipe(mergeMap(garnishCategories => {
                this.garnishCategories = garnishCategories;
                return this.barMenuService.getAllAmountValues();
            }))
            .subscribe(amountValues => this.amountValues = amountValues);
    }

    addNewItem() {
        this.addItem = true;
        this.item = {
            name: null,
            ingredientType: null,
            mixerType: null,
            liquorType: null,
            garnishType: null,
            amount: null
        } as Inventory;
    }

    hideNewItem() {
        this.addItem = false;
    }

    clearOtherTypeValues(type: IngredientType) {
        switch (type) {
            case IngredientType.Alcohol: {
                this.item.garnishType = 0;
                this.item.mixerType = 0;
                break;
            }
            case IngredientType.Mixer: {
                this.item.garnishType = 0;
                this.item.liquorType = 0;
                break;
            }
            case IngredientType.Garnish: {
                this.item.liquorType = 0;
                this.item.mixerType = 0;
                break;
            }
        }
    }

    saveItem(close: boolean) {
        this.barMenuService.saveInventoryItem(this.item)
            .subscribe(res => {
                if (close) {
                    this.addItem = false;
                } else {
                    this.addNewItem();
                }
                this.openSnackBar('The new item has been added', 'dismiss');
                this.getValues();
            });
    }

    updateitem(item: any) {
        this.barMenuService.saveInventoryItem(item)
            .subscribe(res => {
                this.openSnackBar('The item has been updated', 'dismiss');
                this.getValues();
            });
    }

    deleteItem(item: any) {
        this.barMenuService.deleteInventoryItem(item.Id)
            .subscribe(res => {
                this.openSnackBar('The item has been deleted', 'dismiss');
                this.getValues();
            });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          verticalPosition: 'top',
        });
    }

    getCategoryName(type: string, id: number) {
        let result: any;
        switch (type) {
            case 'liquor': {
                result = this.liquorCategories.find(cat => cat.id === id) as any;
                break;
            }
            case 'mixer': {
                result = this.mixerCategories.find(cat => cat.id === id) as any;
                break;
            }
            case 'garnish': {
                result = this.garnishCategories.find(cat => cat.id === id) as any;
                break;
            }
        }
        return result.category;

    }
}
