import { IngredientType } from '../enums/ingredient-type.enum';

export default class Inventory {
    id: number;
    name: string;
    updated?: Date;
    ingredientType: IngredientType;
    liquorType?: number;
    mixerType?: number;
    garnishType?: number;
    amount?: number;
}
