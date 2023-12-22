import { assortmentList } from "@/app/data/assortment";
import TheAssortmentList from "../components/assortmentList/TheAssortmentList";
import { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAllProducts } from "../lib/mongoFetching";

// interface Params extends ParsedUrlQuery {
//     id: string;
// }

const assortment: NextPage = async () => {

    const gettedProducts = await getAllProducts({});
    return (
        <article className="page">
            <h2>Асортимент</h2>
            <TheAssortmentList></TheAssortmentList>
        </article>
    );
};

export default assortment;
