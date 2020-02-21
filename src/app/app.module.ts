import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { Routes, RouterModule } from '@angular/router';
import {
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatIconRegistry,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatRadioModule,
    MatTabsModule
  } from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import BarMenuService from './shared/services/bar-menu-board.service';
import { HomeComponent } from './home/home.component';
import { SpecialListComponent } from './special-list/special-list.component';
import { DeleteConfirmComponent } from './recipe-edit/delete-confirm/delete-confirm.component';
import { BartenderSpecialViewComponent } from './bartender-special-view/bartender-special-view.component';
import { OccasionConfigurationComponent } from './occasion-configuration/occasion-configuration.component';
import { ConfigEditComponent } from './occasion-configuration/config-edit/config-edit.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryConfigComponent } from './inventory-config/inventory-config.component';
import { MatGridListResponsiveModule } from './shared/directives/mat-grid-list-responsive.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full' },
    {
        path: 'recipe-list',
        component: RecipeListComponent,
        pathMatch: 'full'
    },
    {
        path: 'recipe-add',
        component: RecipeEditComponent,
        pathMatch: 'full'
    },
    {
        path: 'recipe-edit/:id',
        component: RecipeEditComponent,
        pathMatch: 'full'
    },
    {
        path: 'specials-list',
        component: SpecialListComponent,
        pathMatch: 'full'
    },
    {
        path: 'bartender-special-list',
        component: BartenderSpecialViewComponent,
        pathMatch: 'full'
    },
    {
        path: 'occasion-configuration',
        component: OccasionConfigurationComponent,
        pathMatch: 'full'
    },
    {
        path: 'inventory',
        component: InventoryComponent,
        pathMatch: 'full'
    },
    {
        path: 'inventory-config',
        component: InventoryConfigComponent,
        pathMatch: 'full'
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        RecipeListComponent,
        RecipeEditComponent,
        HomeComponent,
        SpecialListComponent,
        DeleteConfirmComponent,
        BartenderSpecialViewComponent,
        OccasionConfigurationComponent,
        ConfigEditComponent,
        InventoryComponent,
        InventoryConfigComponent,
        ShoppingListComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatFileUploadModule,
        MatSelectModule,
        MatOptionModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatListModule,
        MatAutocompleteModule,
        MatGridListModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTableModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatDialogModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        ColorPickerModule,
        MatGridListResponsiveModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    entryComponents: [ DeleteConfirmComponent ],
    providers: [ BarMenuService ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/mdi.svg'));
    }
 }
