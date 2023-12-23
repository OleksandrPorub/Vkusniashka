import TheAssortmentList from "../components/assortmentList/TheAssortmentList";
import { NextPage } from "next";

const assortment: NextPage = async () => {

    return (
        <article className="page">
            <h2>Асортимент</h2>
            <TheAssortmentList></TheAssortmentList>
        </article>
    );
};

export default assortment;
