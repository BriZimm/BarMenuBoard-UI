import { CocktailType, GlassType, StrengthType, ServedType } from '../enums';

export default class Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    ingredients: string;
    type: CocktailType;
    glass: GlassType;
    strength: StrengthType;
    served: ServedType;
    garnish: string;
    similarTastes: string;
    image: string;
    currentSpecial: boolean;
    specialId?: number;
}
