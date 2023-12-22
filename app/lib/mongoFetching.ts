// import Product, { Products } from "./productsModel";
// import dbMongoConnect from "./dbMongoConnect";

const URL_PRODUCTS = process.env.BASE_URL + "/api/db.products";
import type {productItemType} from "@/app/data/assortment"

// const URL_PRODUCTS = "http://localhost:3000/api/db.products";
type Params = {
    query?: string;
};
type productType = {
    _id?: string;
    id?: string;
    name?: string;
    quantity?: string;
    description?: string;
    price?: number;
};

export const getAllProducts = async ({ query }: { query?: string }) => {
    const url = URL_PRODUCTS;
    const response = await fetch(url);
    return response.json();
};

export const deleteProduct = async ({ id }: { id: string }) => {  
    const url = id ? URL_PRODUCTS + `?id=${id}` : URL_PRODUCTS;
    const response = await fetch(url, {
        method: "DELETE",
    });
    return response.json();
};

export const editProduct = async (product: productType) => {
    const id = product.id;
    const url = id ? URL_PRODUCTS + `?id=${id}` : URL_PRODUCTS;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(product)
    });
    return response.json();
};


