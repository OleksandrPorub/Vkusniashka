// import Product, { Products } from "./productsModel";
// import dbMongoConnect from "./dbMongoConnect";
// import type {productItemType} from "@/app/data/assortment"

const BASE_URL:string = process.env.NEXT_PUBLIC_DOMEN_BASE_URL!;
if (!BASE_URL) {
    throw new Error("Please define the BASE_URL environment variable inside .env.local");
}

const URL_PRODUCTS = BASE_URL + "/api/db.products";


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

