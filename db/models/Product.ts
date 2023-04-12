import { Schema, model, models } from "mongoose"
import { Product, Durability, Shops } from "@/types/Product"

const ProductSchema = new Schema<Product>({    
    name: String,
    makro: {
        kcal: { 
            type: Number,
            required: true
        },
        fats: { 
            type: Number,
            required: true
        },
        saturatedFats: Number,
        carbs: { 
            type: Number,
            required: true
        },
        sugars: Number,
        proteins:  { 
            type: Number,
            required: true
        },
        fibre: Number,
        salt: Number,
    },
    gi: {
        value: { 
            type: Number,
            required: true
        },
        itemFromGiList: String
    },
    gl: {
        value: { 
            type: Number,
            required: true
        },
        itemFromGlList: String
    },
    durability: Durability,
    ableToFreeze: Boolean,
    whereToBuy: Shops,
})

export default models.Product || model<Product>("Product", ProductSchema)