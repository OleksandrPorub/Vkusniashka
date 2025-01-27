const BASE_URL: string = process.env.NEXT_PUBLIC_DOMEN_BASE_URL! || "https://vkusniashka.vercel.app";

if (!BASE_URL) {
    throw new Error("Please define the BASE_URL environment variable inside .env.local");
}

const URL_PRODUCTS = BASE_URL + "/api/db.menutoday";
const URL_PRODUCTS_EDIT = BASE_URL + "/api/db-edit.menutoday";

type productType = {
    _id?: string;
    id?: string;
    name?: string;
    quantity?: string;
    description?: string;
    price?: number;
};

export const getMenuToday = async ({ query }: { query?: string }) => {
    const url = query ? URL_PRODUCTS + `?q=${query}` : URL_PRODUCTS;

    const response = await fetch(url);
    return response.json();
};

export const deleteProductMenu = async ({ id }: { id?: string }) => {
    const url = id ? URL_PRODUCTS_EDIT + `?id=${id}` : URL_PRODUCTS_EDIT;
    const response = await fetch(url, {
        method: "DELETE",
    });
    return response.json();
};

export const editProductMenu = async (product: productType) => {
    const id = product.id;
    const url = id ? URL_PRODUCTS_EDIT + `?id=${id}` : URL_PRODUCTS_EDIT;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(product),
    });
    return response.json();
};

export const createNewProductMenu = async (product: productType) => {
    const url = URL_PRODUCTS_EDIT;
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(product),
    });
    return response.json();
};
