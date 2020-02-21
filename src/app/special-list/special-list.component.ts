import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Recipes from '../shared/models/TodaysSpecial';
import BarMenuService from '../shared/services/bar-menu-board.service';
import { ServedType, CocktailType, StrengthType, GlassType } from '../shared/enums';
import BoardStyle from '../shared/models/BoardStyles';

@Component({
    selector: 'app-special-list',
    templateUrl: './special-list.component.html',
    styleUrls: ['./special-list.component.scss']
})
export class SpecialListComponent implements OnInit {
    styles: BoardStyle;
    specials: Array<Recipes>;

    Enums = {
        Served: ServedType as typeof ServedType,
        Type: CocktailType as typeof CocktailType,
        Strength: StrengthType as typeof StrengthType,
        Glass: GlassType as typeof GlassType,
    };

    constructor(private barMenuService: BarMenuService,
                private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.initializePage();
    }

    initializePage() {
        this.barMenuService.getAllBoardStyles().subscribe(res => {
            this.styles = res.find(s => s.active);
        });
        this.barMenuService.getAllSpecials().subscribe(res => {
            this.specials = res;
        });
    }

    getPageBackground(): string {
        if (this.styles.useMainBackgroundColor) {
            return this.styles.mainBackgroundColor;
        }
        return `url(https://barmenuboardblob.blob.core.windows.net/image-assets/${this.styles.mainBackgroundImage})`;
    }

    getPageHeaderImage(): string {
        return `url(https://barmenuboardblob.blob.core.windows.net/image-assets/${this.styles.headerImage})`;
    }

    getTitleTextColor(): string {
        return this.styles.titleTextColor;
    }

    getRecipeBackground(): string {
        if (this.styles.useRecipeBackgroundColor) {
            return this.styles.recipeBackgroundColor;
        }
        return `url(https://barmenuboardblob.blob.core.windows.net/image-assets/${this.styles.recipeBackgroundImage})`;
    }

    getRecipeProfileBackground(): string {
        if (this.styles.useRecipeProfileBackgroundColor) {
            return this.styles.recipeProfileBackgroundColor;
        }
        return `url(https://barmenuboardblob.blob.core.windows.net/image-assets/${this.styles.recipeProfileBackgroundImage})`;
    }

    getRecipeBorderColor(): string {
        return '2px solid ' + this.styles.recipeBorderColor;
    }

    getRecipeImageBorderColor(): string {
        return '2px solid' + this.styles.recipeImageBorderColor;
    }

    getRecipeTitleColor(): string {
        return this.styles.recipeHeaderColor;
    }

    getRecipeDescriptionTextColor(): string {
        return this.styles.recipeDescriptionHeaderTextColor;
    }

    getRecipeDesciptionTextColor(): string {
        return this.styles.recipeTextColor;
    }

    getRecipeProfileLabelColor(): string {
        return this.styles.recipeProfileLabelColor;
    }

    getRecipeProfileItemColor(): string {
        return this.styles.recipeProfileItemColor;
    }

    getBannerColor(): string {
        if (this.styles.bannerColor === 'hny' || this.styles.bannerColor === 'usa') {
            return '';
        } else {
            return this.styles.bannerColor;
        }
    }

    getBannerTextColor(): string {
        if (this.styles.bannerTextColor === 'hny') {
            return '';
        } else {
            return this.styles.bannerTextColor;
        }
    }
}
