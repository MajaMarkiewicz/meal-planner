interface Makro {
    kcal: Number;
    fats: Number;
    saturatedFats?: Number;
    carbs: Number;
    sugars?: Number;
    proteins: Number;
    fibre?: Number;
    salt?: Number;
}

interface Gi {
    value: Number;
    itemFromGiList?: String;
}

interface Gl {
    value: Number;
    itemFromGlList?: String;
}

export enum Durability {
    Long = "LONG",
    Medium = "MEDIUM",
    Short = "SHORT",
}

export enum Shops {
    Zabka = "ZABKA",
    Biedronka = "BIEDRONKA",
    Lidl = "LIDL",
    Stall = "STALL"
}

export interface Product {
    name: String;
    makro: Makro;
    gi: Gi;
    gl: Gl;
    durability?: Durability;
    ableToFreeze?: Boolean;
    whereToBuy?: Shops;
}