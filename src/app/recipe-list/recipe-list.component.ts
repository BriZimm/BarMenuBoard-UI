import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Recipe from '../shared/models/Recipe';
import BarMenuService from '../shared/services/bar-menu-board.service';
import TodaysSpecial from '../shared/models/TodaysSpecial';
import { ServedType, CocktailType } from '../shared/enums';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
    recipeList: Recipe[];
    specialsCount: number;
    responsive: boolean;
    cols: number;

    Enums = {
        Served: ServedType as typeof ServedType,
        Type: CocktailType as typeof CocktailType
    };

    constructor(private barMenuService: BarMenuService,
                private snackBar: MatSnackBar,
                private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.responsive = true;
        this.cols = 1;
        this.barMenuService.getAllRecipes().subscribe(recipes => this.recipeList = recipes);
        this.barMenuService.getAllSpecials().subscribe(specials => this.specialsCount = specials.length);
    }

    removeSpecial(recipe: any) {
        return this.barMenuService.deleteSpecial(recipe.specialId)
                    .subscribe(x => {
                        recipe.currentSpecial = false;
                        recipe.specialId = null;
                        this.specialsCount -= 1;
                        this.cd.detectChanges();
                    });
    }

    addSpecial(recipe) {
        if (this.specialsCount < 5) {
            const special = new TodaysSpecial();
            special.name = recipe.name;
            special.description = recipe.description;
            special.type = recipe.type;
            special.glass = recipe.glass;
            special.strength = recipe.strength;
            special.served = recipe.served;
            special.garnish = recipe.garnish;
            special.similarTastes = recipe.similarTastes;
            special.image = recipe.image;

            return this.barMenuService.saveSpecial(special)
                        .subscribe(x => {
                            recipe.specialId = special.id;
                            recipe.currentSpecial = true;
                            this.specialsCount += 1;
                            this.cd.detectChanges();
                        });
        } else {
            this.openSnackBar('There is a maximum of 5 specials allowed, remove one before adding another', 'dismiss');
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          verticalPosition: 'top',
        });
    }
}
