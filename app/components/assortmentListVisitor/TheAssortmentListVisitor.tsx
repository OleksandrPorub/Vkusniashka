"use client";

import type { productItemType } from "@/app/data/assortment";
import { FC, useEffect, useState } from "react";
import styles from "./TheAssortmentListVisitor.module.scss";
import { getAllProducts } from "@/app/services/mongoFetchProducts";
import TheLoader from "../UI/loader/TheLoader";
import TheProductListVisitor from "../productListVisitor/TheProductListVisitor";

const TheAssortmentListVisitor: FC = () => {
    const [productList, setProductList]: [productItemType[], Function] = useState([]);
    const [isLoading, setIsLoading]: [boolean, Function] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            setProductList(await getAllProducts({}));
            setIsLoading(false);
        };
        getProducts();
    }, []);

    return (
        <article className={styles.wrapper}>
            <h2 className={styles.headLine}>Асортимент</h2>
            {isLoading ? (
                <TheLoader size={80}></TheLoader>
            ) : productList.length ? (
                <TheProductListVisitor productList={productList}></TheProductListVisitor>
            ) : (
                <h3>Продуктів у списку немає.</h3>
            )}
        </article>
    );
};

export default TheAssortmentListVisitor;
