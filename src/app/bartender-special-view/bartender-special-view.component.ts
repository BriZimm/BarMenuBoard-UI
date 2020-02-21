import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import BarMenuService from '../shared/services/bar-menu-board.service';
import Recipe from '../shared/models/Recipe';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ServedType, GlassType } from '../shared/enums';

@Component({
    selector: 'app-bartender-special-view',
    templateUrl: './bartender-special-view.component.html',
    styleUrls: ['./bartender-special-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BartenderSpecialViewComponent implements OnInit {
    recipes: Recipe[];
    currentRecipeList: Recipe[];
    currentSpecialsList: Recipe[];
    viewAll: boolean;
    recipeCount: number;
    recipeNames: string[];
    filteredRecipeNames: Observable<string[]>;
    filterString: string;
    myControl = new FormControl();

    Enums = {
        Served: ServedType as typeof ServedType,
        Glass: GlassType as typeof GlassType,
    };

    constructor(private barMenuService: BarMenuService,
                private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.barMenuService.getAllRecipes().subscribe(recipes => {
            this.recipes = recipes.sort((a, b) => a.name > b.name ? 1 : -1);
            this.currentRecipeList = recipes;
            this.viewAll = true;
            this.recipeCount = this.currentRecipeList.length;
            this.createFilter();
        });
    }

    filterBySpecials() {
        this.currentRecipeList = this.recipes.filter(recipe => recipe.currentSpecial === true);
        this.currentSpecialsList = this.currentRecipeList;
        this.recipeCount = this.currentRecipeList.length;
        this.viewAll = false;
        this.createFilter();
        this.cd.detectChanges();
    }

    showAllRecipes() {
        this.currentRecipeList = this.recipes;
        this.recipeCount = this.currentRecipeList.length;
        this.viewAll = true;
        this.createFilter();
        this.cd.detectChanges();
    }

    createFilter() {
        this.recipeNames = this.currentRecipeList.map(recipe => recipe.name);
        this.filteredRecipeNames = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        let filterValue = '';
        if (value !== null) {
            filterValue = value.toLowerCase();
            this.filterByName(filterValue);
        }

        return this.recipeNames.filter(option => option.toLowerCase().includes(filterValue));
    }

    filterByName(value: string) {
        if (value === '') {
            this.myControl.reset();
            this.currentRecipeList = this.viewAll ? this.recipes : this.currentSpecialsList;
        } else {
            this.currentRecipeList = this.currentRecipeList.filter(recipe => recipe.name.toLowerCase().includes(value));
        }
    }

    getImageUrl(file: string): string {
        return `https://barmenuboardblob.blob.core.windows.net/recipe-images/${file}`;
    }

}
