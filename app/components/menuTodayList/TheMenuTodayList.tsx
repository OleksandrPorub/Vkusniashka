"use client";

import type { productItemType } from "@/app/data/assortment";
import { FC, useEffect, useState } from "react";
import styles from "./TheMenuTodayList.module.scss";
import TheChooseAction from "../UI/chooseActionTab/TheChooseAction";
import TheProductEditForm from "../UI/productEdit/TheProductEditForm";
import TheLoader from "../UI/loader/TheLoader";
import TheProductList from "../productList/TheProductList";
import TheProductCreateForm from "../UI/productCreate/TheProductCreateForm";
import { createNewProductMenu, deleteProductMenu, editProductMenu, getMenuToday } from "@/app/services/mongoFetchMenuToday";

type IsChooseType = string | null;

const TheMenuTodayList: FC = () => {
    const [productList, setProductList]: [productItemType[], Function] = useState([]);
    const [isChoose, setIsChoose]: [IsChooseType, any] = useState(null);
    const [editForm, setEditForm]: [boolean, Function] = useState(false);
    const [isLoading, setIsLoading]: [boolean, Function] = useState(false);
    const [createForm, setCreateForm]: [boolean, Function] = useState(false);
  
    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            const products = await getMenuToday({});
            setProductList(products);
            setIsLoading(false);
        };
        getProducts();
    }, []);
    const handler_DelItem = async (id: string) => {
        const response = window.prompt("Ви впевнені, що хочете видалити цей елемент?", "Так");
        if (response === ("Так" || "Да" || "Yes" || "y" || "Y")) {
            await deleteProductMenu({ id: id });
            setProductList(await getMenuToday({}));
            setIsChoose(null);
        }
    };

    const handler_updateItem = async (formData: productItemType) => {
        await editProductMenu(formData);
        setProductList(await getMenuToday({}));
        setIsChoose(null);
    };
    const handler_createItem = async (newProduct: productItemType) => {
        await createNewProductMenu(newProduct);
        setProductList(await getMenuToday({}));
    };

    const handler_Closer = (e: any) => {
        e.stopPropagation();
        setIsChoose(null);
    };
    const chooseAction = isChoose ? (
        <TheChooseAction
            id={isChoose}
            setEditForm={setEditForm}
            handler_DelItem={handler_DelItem}
            handler_Closer={handler_Closer}
        ></TheChooseAction>
    ) : null;

    return (
        <article className={styles.wrapper}>
            <h2 className={styles.headLine}>Меню сьогодні</h2>
            {isLoading ? (
                <TheLoader size={80}></TheLoader>
            ) : productList.length ? (
                <TheProductList
                    productList={productList}
                    isChoose={isChoose}
                    setIsChoose={setIsChoose}
                    chooseAction={chooseAction}
                ></TheProductList>
            ) : (
                <h3>Продуктів у списку немає.</h3>
            )}
            <button
                className={styles.btn_createProduct}
                onClick={() => {
                    setCreateForm(true);
                }}
            >
                Створити новий продукт
            </button>
            {editForm && (
                <TheProductEditForm
                    handler_updateItem={handler_updateItem}
                    closer={handler_Closer}
                    product={productList.filter((pr) => pr.id === isChoose)[0]}
                    setEditForm={setEditForm}
                ></TheProductEditForm>
            )}
            {createForm && (
                <TheProductCreateForm selectProduct={true} setCreateForm={setCreateForm} handler_createItem={handler_createItem}></TheProductCreateForm>
            )}
        </article>
    );
};

export default TheMenuTodayList;
