"use client";

import { FormEventHandler, useEffect, useState } from "react";
import styles from "./TheProductCreateForm.module.scss";
import ThePopUpWrapper from "../popUpWrapper/ThePopUpWrapper";
import { assortmentType, productItemType } from "@/app/data/assortment";
import { getAllProducts } from "@/app/services/mongoFetchProducts";

type Props = {
    setCreateForm: Function;
    handler_createItem: Function;
    selectProduct?: boolean;
};

const TheProductCreateForm: React.FC<Props> = ({ selectProduct = false, setCreateForm, handler_createItem }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productList, setProductList]: [assortmentType, Function] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            setProductList(await getAllProducts({}));
        };

        selectProduct && getProducts();
    }, [selectProduct]);

    const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!name) {
            window.alert('Поле "Назва продукту" не заповнене!');
            return;
        }
        const randomID = Math.random().toString(36).substring(2);
        const newProduct: productItemType = { name: name, id: randomID };
        newProduct.quantity = quantity;
        newProduct.description = description;
        newProduct.price = +parseFloat(price).toFixed(2);
        await handler_createItem(newProduct);
        setCreateForm(false);
    };
    const autoFill = (id: string) => {       
        const product = productList.find((product) => product.id === id);
        if (product) {
            setName(product.name);
            product.quantity && setQuantity(product.quantity);
            product.description && setDescription(product.description);
            product.price && setPrice(product.price.toFixed(2));
        }
    };

    return (
        <ThePopUpWrapper>
            <div className={styles.formWrapper}>
                <button
                    className={styles.form}
                    onClick={(e) => {
                        setCreateForm(false);
                    }}
                >
                    Закрити
                </button>
                <form onSubmit={handleSave} className={styles.form}>
                    {selectProduct && productList.length && (
                        <select
                            name="product"
                            defaultValue="selectProduct"
                            onChange={(e) => {
                                autoFill(e.target.value);
                            }}
                        >
                            <option value="selectProduct" disabled>
                                Оберіть продукт
                            </option>
                            {productList.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <label>
                        Назва продукту (обов &apos; язкове поле):
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Вихід продукту:
                        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </label>
                    <label>
                        Опис продукту:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Ціна:
                        {/* <input type="number" value={price} onChange={(e) => setPrice(+((parseFloat(e.target.value)).toFixed(2)))} /> */}
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <button>Зберегти</button>
                </form>
            </div>
        </ThePopUpWrapper>
    );
};

export default TheProductCreateForm;
