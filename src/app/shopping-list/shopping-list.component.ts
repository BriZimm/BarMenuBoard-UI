import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import Inventory from '../shared/models/Inventory';
import BarMenuService from '../shared/services/bar-menu-board.service';
import { MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { IngredientType } from '../shared/enums/ingredient-type.enum';
import LiquorCategory from '../shared/models/LiquorCategory';
import MixerCategory from '../shared/models/MixerCategory';
import GarnishCategory from '../shared/models/GarnishCategory';
import { mergeMap } from 'rxjs/operators';
import AmountValue from '../shared/models/AmountValue';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShoppingListComponent implements OnInit {
    shoppingList: Inventory[];
    liquorCategories: LiquorCategory[];
    mixerCategories: MixerCategory[];
    garnishCategories: GarnishCategory[];
    amountValues: AmountValue[];
    shoppingListLoaded: boolean;

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    displayedColumns: string[] = ['name', 'category', 'amount', 'action'];

    constructor(private barMenuService: BarMenuService,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.barMenuService.getAllAmountValues()
            .pipe(mergeMap(amountValues => { 
                this.amountValues = amountValues;
                return this.barMenuService.getAllInventory();
            }))
            .pipe(mergeMap(inventory => {
                this.shoppingList = inventory.filter(x => x.amount < 2);
                this.shoppingListLoaded = true;
                return this.barMenuService.getAllLiquorCategories();
            }))
            .pipe(mergeMap(liquorCategories => {
                this.liquorCategories = liquorCategories;
                return this.barMenuService.getAllMixerCategories();
            }))
            .pipe(mergeMap(mixerCategories => {
                this.mixerCategories = mixerCategories;
                return this.barMenuService.getAllGarnishCategories();
            }))
            .subscribe(garnishCategories => {
                this.garnishCategories = garnishCategories;
            });
    }

    getIngredientType(item: Inventory): string {
        let cat: any;
        switch (item.ingredientType) {
            case  IngredientType.Alcohol: {
                cat = this.liquorCategories.find(x => x.id === item.liquorType);
                return cat.category;
            }
            case  IngredientType.Mixer: {
                cat = this.mixerCategories.find(x => x.id === item.mixerType);
                return cat.category;
            }
            case  IngredientType.Garnish: {
                cat = this.garnishCategories.find(x => x.id === item.garnishType);
                return cat.category;
            }
        }
    }

    getAmountValue(item: Inventory): string {
        const object = this.amountValues.find(x => x.listOrder === item.amount);
        return object.value;
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          verticalPosition: 'top',
        });
    }

}
