"use client";

import type { assortmentType, productItemType } from "@/app/data/assortment";
import { FC, useEffect, useState } from "react";
import styles from "./TheAssortmentList.module.scss";
import { deleteProduct, editProduct, getAllProducts } from "@/app/lib/mongoFetching";
import TheChooseAction from "../UI/chooseActionTab/TheChooseAction";
import ThePopUpWrapper from "../UI/popUpWrapper/ThePopUpWrapper";
import TheProductEditForm from "../UI/productEdit/ThePeproductEditForm";

type IsChooseType = string | null;


const TheAssortmentList: FC = () => {
    const [productList, setProductList]: [productItemType[], Function] = useState([]);
    const [isChoose, setIsChoose]: [IsChooseType, any] = useState(null);
    const [editForm, setEditForm]: [boolean, Function] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setProductList(await getAllProducts({}));
        };
        getProducts();
    }, []);
    useEffect(() => {
        console.log("isChoose= ", isChoose);
    }, [isChoose]);

    const handler_DelItem = async (id: string) => {
        const response = window.prompt("Ви впевнені, що хочете видалити цей елемент?", "Так");
        console.log(response);
        if (response === ("Так" || "Да" || "Yes" || "y" || "Y")) {        
            await deleteProduct({ id: id });
            setProductList(await getAllProducts({}));
            setIsChoose(null);
        }
    };

    const handler_updateItem = async (formData:productItemType) => {
        await editProduct(formData);

        setProductList(await getAllProducts({}));
        setIsChoose(null);
    };


    const handler_Closer = (e: any) => {
        e.stopPropagation();
        setIsChoose(null);
    };

    return (
        <article className={styles.wrapper}>
            <div className={styles.listHeader}>
                <div className={styles.listHeaderProp + " " + styles.head_num}>№</div>
                <div className={styles.listHeaderProp + " " + styles.head_name}>Найменування</div>
                <div className={styles.listHeaderProp + " " + styles.head_quantity}>Вихід продукту</div>
                <div className={styles.listHeaderProp + " " + styles.head_price}>Ціна</div>
            </div>
            <ul className={styles.productsList}>
                {productList.map((product: productItemType, i) => (
                    <li
                        className={
                            styles.productItem +
                            (isChoose == product.id ? " " + styles.active : "") +
                            (isChoose && isChoose !== product.id ? " " + styles.blur : "")
                        }
                        onClick={() => {
                            setIsChoose(product.id);
                        }}
                        key={product.id}
                    >
                        <section className={styles.section_number}>
                            <div className={styles.productProp + " " + styles.prop_num}>{i + 1}</div>
                        </section>
                        <section className={styles.section_main}>
                            <section className={styles.section_top}>
                                <div className={styles.productProp + " " + styles.prop_name}>{product.name}</div>
                                <div className={styles.productProp + " " + styles.prop_quantity}>{product.quantity}</div>
                                <div className={styles.productProp + " " + styles.prop_price}>
                                    {product.price ? product.price + " грн" : "-------"}
                                </div>
                            </section>
                            <section className={styles.section_description}>
                                {product.description && (
                                    <div className={styles.productProp + " " + styles.prop_description}>{product.description || ""}</div>
                                )}
                            </section>
                        </section>

                        {isChoose === product.id &&<TheChooseAction id={product.id} setEditForm={setEditForm} handler_DelItem={handler_DelItem} handler_Closer={handler_Closer}></TheChooseAction>}

                        {/* {isChoose === product.id && (
                            <div
                                className={styles.choosingWrap}
                            >
                                <button
                                    className={styles.btn_edit}
                                    onClick={() => {
                                        setEditForm(true);
                                    }}
                                >
                                    Редагувати
                                </button>
                                <button
                                    className={styles.btn_del}
                                    onClick={() => {
                                        handler_DelItem(product.id);
                                    }}
                                >
                                    Видалити
                                </button>
                                <button
                                    className={styles.btn_cancel}
                                    onClick={(e) => {
                                        handler_Closer(e);
                                    }}
                                >
                                    Відміна
                                </button>
                            </div>
                        )} */}
                        {editForm && isChoose === product.id && (
                            <ThePopUpWrapper>
                                <TheProductEditForm
                                    handler_updateItem={handler_updateItem}
                                    closer={handler_Closer}
                                    product={product}
                                    setEditForm={setEditForm}
                                ></TheProductEditForm>
                            </ThePopUpWrapper>
                        )}
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default TheAssortmentList;
