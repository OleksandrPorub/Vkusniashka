import TheAssortmentList from "../components/assortmentList/TheAssortmentList";
import { NextPage } from "next";

const assortment: NextPage = async () => {

    return (
        <article className="page">
            <TheAssortmentList></TheAssortmentList>
        </article>
    );
};

export default assortment;
