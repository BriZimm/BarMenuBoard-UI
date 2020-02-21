import { CocktailType, GlassType, StrengthType, ServedType } from '../enums';

export default class TodaysSpecial {
    id: number;
    name: string;
    description: string;
    type: CocktailType;
    glass: GlassType;
    strength: StrengthType;
    served: ServedType;
    garnish: string;
    similarTastes: string;
    image: string;

    // const(name: string,
    //       description: string,
    //       type: string,
    //       glass: CocktailType,
    //       strength: StrengthType,
    //       served: ServedType,
    //       garnish: string,
    //       similarTastes: string,
    //       image: string) {

    //     name = name;
    //     description = description;
    //     type = type;
    //     glass = glass;
    //     strength = strength;
    //     served = served;
    //     garnish = garnish;
    //     similarTastes = similarTastes;
    //     image = image;
    // }
  }
