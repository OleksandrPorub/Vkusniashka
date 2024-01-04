"use client";

import type { productItemType } from "@/app/data/assortment";
import { FC, useEffect, useState } from "react";
import styles from "./TheMenuTodayListVisitor.module.scss";
import TheLoader from "../UI/loader/TheLoader";
import { getMenuToday } from "@/app/services/mongoFetchMenuToday";
import TheProductListVisitor from "../productListVisitor/TheProductListVisitor";

const TheMenuTodayListVisitor: FC = () => {
    const [productList, setProductList]: [productItemType[], Function] = useState([]);
    const [isLoading, setIsLoading]: [boolean, Function] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            const products = await getMenuToday({});
            console.log(products);
            setProductList(products);
            setIsLoading(false);
        };
        getProducts();
    }, []);



    return (
        <article className={styles.wrapper}>
            <h2 className={styles.headLine}>Меню сьогодні</h2>
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

export default TheMenuTodayListVisitor;
