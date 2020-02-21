import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import Recipe from '../shared/models/Recipe';
import { Subscription, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import BarMenuService from '../shared/services/bar-menu-board.service';
import TodaysSpecial from '../shared/models/TodaysSpecial';
import { GlassType, CocktailType, ServedType, StrengthType } from '../shared/enums';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
    recipe: Recipe = new Recipe();
    sub: Subscription;
    originalSpecialState: boolean;
    recipeImageExists: boolean;
    specialsCount: number;
    onUploadFinished: boolean;
    fullImageUrl: string;

    Enums = {
        Served: ServedType as typeof ServedType,
        Glass: GlassType as typeof GlassType,
        CocktailType: CocktailType as typeof CocktailType,
        StrengthType: StrengthType as typeof StrengthType
    };

    private imageURL = 'https://barmenuboardblob.blob.core.windows.net/recipe-images/';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cd: ChangeDetectorRef,
        private barMenuService: BarMenuService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
      ) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            // tslint:disable-next-line: no-string-literal
            const id = params['id'];
            if (id) {
              this.barMenuService.getRecipe(id).subscribe((recipe: any) => {
                if (recipe) {
                  this.recipe = recipe;
                  this.fullImageUrl = this.imageURL + recipe.image;
                  this.recipeImageExists = this.recipe.image !== null;
                  if (this.recipe.currentSpecial) {
                      this.originalSpecialState = true;
                  }
                } else {
                  console.log(
                    `Recipe with id '${id}' not found, returning to list`
                  );
                  this.gotoList();
                }
              });
            }
          });

        this.barMenuService.getAllSpecials()
            .subscribe(specials => this.specialsCount = specials.length);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    updateSpecialsCount() {
        if (!this.recipe.currentSpecial) {
            this.specialsCount += 1;
        } else {
            this.specialsCount -= 1;
        }
    }

    getImageURL() {
        return this.fullImageUrl;
    }

    uploadimage(fileInputEvent: any, recipe: Recipe) {
        if (fileInputEvent !== undefined) {
            this.barMenuService.uploadRecipeImage(fileInputEvent.target.files[0])
                .subscribe(response => {
                    recipe.image = fileInputEvent.target.files[0].name;
                    this.fullImageUrl = this.imageURL + recipe.image;
                    this.recipeImageExists = true;
                    this.cd.detectChanges();
                });
        }
    }

    deleteImage() {
        this.barMenuService.deleteImage(this.recipe.image)
            .subscribe(response => {
                this.recipe.image = null;
                this.fullImageUrl = null;
                this.recipeImageExists = false;
                this.cd.detectChanges();
            });
    }

    save(recipe: Recipe) {
        if (this.specialsCount > 5) {
            recipe.currentSpecial = false;
        }
        this.barMenuService.saveRecipe(recipe)
            .pipe(mergeMap(result => {
                if (this.specialsCount <= 5) {
                    // Update Special status if needed
                    const special = new TodaysSpecial();
                    if (!this.originalSpecialState && result.currentSpecial) {
                        special.name = recipe.name;
                        special.description = recipe.description;
                        special.type = recipe.type;
                        special.glass = recipe.glass;
                        special.strength = recipe.strength;
                        special.served = recipe.served;
                        special.garnish = recipe.garnish;
                        special.similarTastes = recipe.similarTastes;
                        special.image = recipe.image;
                        return this.barMenuService.saveSpecial(special);
                    } else if (this.originalSpecialState && !result.currentSpecial) {
                        return this.barMenuService.deleteSpecial(recipe.specialId);
                    } else { return of(null); }
                } else {
                    return of(1);
                }
            })).subscribe(result => {
                if (result === 1) {
                    this.specialsCount -= 1;
                    this.openSnackBar('There is a maximum of 5 specials allowed, remove one before adding another', 'dismiss');
                } else {
                    this.gotoList();
                }
            },
                error => this.openSnackBar('Recipe not saved, a required field is needed', 'dismiss')
            );
    }

    openConfirmDialog() {
        const dialogRef = this.dialog.open(DeleteConfirmComponent, {
            height: '170px',
            width: '400px',
            data: { recipe: this.recipe }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                this.remove(this.recipe.id);
            }
        });
      }

    remove(id: number) {
        if (this.recipe.currentSpecial) {
            this.barMenuService.deleteSpecial(this.recipe.specialId);
        }
        this.deleteImage();
        this.barMenuService.deleteRecipe(id).subscribe(result => {
            this.gotoList();
            },
            error => console.error(error)
        );
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 3000,
          verticalPosition: 'top',
        });
    }

    gotoList() {
        this.router.navigate(['/recipe-list']);
    }
}
