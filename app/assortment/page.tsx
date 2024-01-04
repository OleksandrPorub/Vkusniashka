import { NextPage } from "next";
import TheAssortmentListVisitor from "../components/assortmentListVisitor/TheAssortmentListVisitor";

const assortment: NextPage = async () => {

    return (
        <div className="page">
            <TheAssortmentListVisitor/>
        </div>
    );
};

export default assortment;
