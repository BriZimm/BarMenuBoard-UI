import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import Recipe from '../models/Recipe';
import TodaysSpecial from '../models/TodaysSpecial';
import BoardStyle from '../models/BoardStyles';
import Inventory from '../models/Inventory';
import LiquorCategory from '../models/LiquorCategory';
import MixerCategory from '../models/MixerCategory';
import GarnishCategory from '../models/GarnishCategory';
import AmountValue from '../models/AmountValue';

@Injectable()
export default class BarMenuService {
    public API = 'https://barmenuboardapi.azurewebsites.net/api'; // Comment out to test locally
    // public API = 'https://localhost:44301/api'; // Uncomment to test locally
    public RECIPIES_API = `${this.API}/recipe`;
    public SPECIALS_API = `${this.API}/todays-special`;
    public BOARDSTYLES_API = `${this.API}/board-style`;
    public BOARDSTYLEIMAGE_API = `${this.API}/board-style-image`;
    public RECIPEIMAGE_API = `${this.API}/recipe-image`;
    public INVENTORY_API = `${this.API}/inventory`;
    public LIQUOR_CATS_API = `${this.API}/liquor-categories`;
    public MIXER_CATS_API = `${this.API}/mixer-categories`;
    public GARNISH_CATS_API = `${this.API}/garnish-categories`;
    public AMOUNTVALUES_API = `${this.API}/amount-values`;

    constructor(private http: HttpClient) {}

    specialsListUpdate: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    // Recipe API Calls

    getAllRecipes(): Observable<Array<Recipe>> {
        return this.http.get<Array<Recipe>>(`${this.RECIPIES_API}`);
    }

    getRecipe(id: number) {
        return this.http.get(`${this.RECIPIES_API}/${id}`);
    }

    saveRecipe(recipe: Recipe): Observable<Recipe> {
        let result: Observable<Recipe>;
        if (recipe.id) {
            result = this.http.post<Recipe>(`${this.RECIPIES_API}`, recipe);
        } else {
            result = this.http.put<Recipe>(`${this.RECIPIES_API}`, recipe);
        }
        return result;
    }

    deleteRecipe(id: number) {
        return this.http.delete(`${this.RECIPIES_API}/${id}`);
    }

    uploadRecipeImage(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('File', file, file.name);
        return this.http.post<any>(`${this.RECIPEIMAGE_API}`, formData);
    }

    deleteImage(fileName: string): Observable<any> {
        return this.http.get(`${this.RECIPEIMAGE_API}/delete/${fileName}`);
    }

    // Specials API Calls

    getAllSpecials(): Observable<Array<TodaysSpecial>> {
        return this.http.get<Array<TodaysSpecial>>(`${this.SPECIALS_API}`);
    }

    getSpecial(id: string) {
        return this.http.get(`${this.SPECIALS_API}/${id}`);
    }

    saveSpecial(special: TodaysSpecial): Observable<TodaysSpecial> {
        return this.http.put<TodaysSpecial>(`${this.SPECIALS_API}`, special);
    }

    deleteSpecial(id: number) {
        return this.http.delete(`${this.SPECIALS_API}/${id}`);
    }

    // Board Style API Calls

    getAllBoardStyles(): Observable<Array<BoardStyle>> {
        return this.http.get<Array<BoardStyle>>(`${this.BOARDSTYLES_API}`);
    }

    getBoardStyle(id: number): Observable<BoardStyle> {
        return this.http.get<BoardStyle>(`${this.BOARDSTYLES_API}/${id}`);
    }

    saveBoardStyle(boardStyle: BoardStyle): Observable<BoardStyle> {
        let result: Observable<BoardStyle>;
        if (boardStyle.id) {
            result = this.http.post<BoardStyle>(`${this.BOARDSTYLES_API}`, boardStyle);
        } else {
            result = this.http.put<BoardStyle>(`${this.BOARDSTYLES_API}`, boardStyle);
        }
        return result;
    }

    makeStyleActive(boardStyle: BoardStyle): Observable<BoardStyle> {
        return this.http.post<BoardStyle>(`${this.BOARDSTYLES_API}/make-active`, boardStyle);
    }

    deleteBoardStyle(id: number) {
        return this.http.delete(`${this.BOARDSTYLES_API}/${id}`);
    }

    uploadBoardStyleImage(file: File, newFileName: string): Observable<string> {
        const formData: FormData = new FormData();
        formData.append('File', file, newFileName);
        return this.http.post<string>(`${this.BOARDSTYLEIMAGE_API}`, formData);
    }

    deleteBoardStyleImage(fileName: string): Observable<any> {
        return this.http.get(`${this.BOARDSTYLEIMAGE_API}/delete/${fileName}`);
    }

    // Inventory API Calls

    getAllInventory(): Observable<Array<Inventory>> {
        return this.http.get<Array<Inventory>>(`${this.INVENTORY_API}`);
    }

    getInventoryItem(id: number): Observable<Inventory> {
        return this.http.get<Inventory>(`${this.INVENTORY_API}/${id}`);
    }

    saveInventoryItem(inventory: Inventory): Observable<Inventory> {
        let result: Observable<Inventory>;
        if (inventory.id) {
            result = this.http.post<Inventory>(`${this.INVENTORY_API}`, inventory);
        } else {
            result = this.http.put<Inventory>(`${this.INVENTORY_API}`, inventory);
        }
        return result;
    }

    deleteInventoryItem(id: number) {
        return this.http.delete(`${this.INVENTORY_API}/${id}`);
    }

    // Liquor Category API Calls

    getAllLiquorCategories(): Observable<Array<LiquorCategory>> {
        return this.http.get<Array<LiquorCategory>>(`${this.LIQUOR_CATS_API}`);
    }

    getLiquorCategory(id: number): Observable<LiquorCategory> {
        return this.http.get<LiquorCategory>(`${this.LIQUOR_CATS_API}/${id}`);
    }

    saveLiquorCategory(category: LiquorCategory): Observable<LiquorCategory> {
        let result: Observable<LiquorCategory>;
        if (category.id) {
            result = this.http.post<LiquorCategory>(`${this.LIQUOR_CATS_API}`, category);
        } else {
            result = this.http.put<LiquorCategory>(`${this.LIQUOR_CATS_API}`, category);
        }
        return result;
    }

    deleteLiquorCategory(id: number) {
        return this.http.delete(`${this.LIQUOR_CATS_API}/${id}`);
    }

    // Mixer Category API Calls

    getAllMixerCategories(): Observable<Array<MixerCategory>> {
        return this.http.get<Array<MixerCategory>>(`${this.MIXER_CATS_API}`);
    }

    getMixerCategory(id: number): Observable<MixerCategory> {
        return this.http.get<MixerCategory>(`${this.MIXER_CATS_API}/${id}`);
    }

    saveMixerCategory(category: MixerCategory): Observable<MixerCategory> {
        let result: Observable<MixerCategory>;
        if (category.id) {
            result = this.http.post<MixerCategory>(`${this.MIXER_CATS_API}`, category);
        } else {
            result = this.http.put<MixerCategory>(`${this.MIXER_CATS_API}`, category);
        }
        return result;
    }

    deleteMixerCategory(id: number) {
        return this.http.delete(`${this.MIXER_CATS_API}/${id}`);
    }

    // Garnish Category API Calls

     getAllGarnishCategories(): Observable<Array<GarnishCategory>> {
        return this.http.get<Array<GarnishCategory>>(`${this.GARNISH_CATS_API}`);
    }

    getGarnishCategory(id: number): Observable<GarnishCategory> {
        return this.http.get<GarnishCategory>(`${this.GARNISH_CATS_API}/${id}`);
    }

    saveGarnishCategory(category: GarnishCategory): Observable<GarnishCategory> {
        let result: Observable<GarnishCategory>;
        if (category.id) {
            result = this.http.post<GarnishCategory>(`${this.GARNISH_CATS_API}`, category);
        } else {
            result = this.http.put<GarnishCategory>(`${this.GARNISH_CATS_API}`, category);
        }
        return result;
    }

    deleteGarnishCategory(id: number) {
        return this.http.delete(`${this.GARNISH_CATS_API}/${id}`);
    }

    // Amount Values API Calls

    getAllAmountValues(): Observable<Array<AmountValue>> {
        return this.http.get<Array<AmountValue>>(`${this.AMOUNTVALUES_API}`);
    }

    getAmountValue(id: number): Observable<AmountValue> {
        return this.http.get<AmountValue>(`${this.AMOUNTVALUES_API}/${id}`);
    }

    saveAmountValue(amountValue: AmountValue): Observable<AmountValue> {
        let result: Observable<AmountValue>;
        if (amountValue.id) {
            result = this.http.post<AmountValue>(`${this.AMOUNTVALUES_API}`, amountValue);
        } else {
            result = this.http.put<AmountValue>(`${this.AMOUNTVALUES_API}`, amountValue);
        }
        return result;
    }

    deleteAmountValue(id: number) {
        return this.http.delete(`${this.AMOUNTVALUES_API}/${id}`);
    }
}
