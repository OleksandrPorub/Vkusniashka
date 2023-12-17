import { assortmentList } from "@/app/data/assortment";
import TheAssortmentList from "../components/assortmentList/TheAssortmentList";
import { NextPage } from "next";
import Product, { Products } from "../models/assortment";
import dbMongoConnect from "../lib/dbMongoConnect";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
    id: string;
}

type Props = {
    products: Products;
};

const assortment: NextPage = async () => {
    await dbMongoConnect();

    const gettedProducts = await Product.find();
    const gettedProductsserialized = gettedProducts.map((doc) => {
        return JSON.parse(JSON.stringify(doc));
    });
    // console.log(gettedProductsserialized);

    return (
        <article className="page">
            <h2>Ассортимент</h2>
            <TheAssortmentList assortList={gettedProductsserialized || assortmentList}></TheAssortmentList>
        </article>
    );
};

export default assortment;
