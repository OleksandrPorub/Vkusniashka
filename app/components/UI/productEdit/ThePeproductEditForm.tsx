"use client";

import { FormEventHandler, useState } from "react";
import styles from "./TheProductEditForm.module.scss";
import { productItemType } from "@/app/data/assortment";
import { editProduct } from "@/app/lib/mongoFetching";

type productType = {
    _id?: string;
    id: string;
    name: string;
    quantity?: string;
    description?: string;
    price?: number;
};

type Props = {
    setEditForm: Function;
    product: productType;
    closer: Function;
    handler_updateItem: Function;
};

const TheProductEditForm: React.FC<Props> = ({ setEditForm, product, closer, handler_updateItem }) => {
    const [name, setName] = useState(product.name || "");
    const [quantity, setQuantity] = useState(product.quantity || "");
    const [description, setDescription] = useState(product.description || "");
    const [price, setPrice] = useState(product.price || 0);

    const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData: productType = { name: name || "", id: product.id };

        formData.quantity = quantity;
        formData.description = description;
        formData.price = price;
        await handler_updateItem(formData);
        setEditForm(false);
    };

    return (
        <div className={styles.formWrapper}>
            <button
                className={styles.form}
                onClick={(e) => {
                    setEditForm(false);
                    closer(e);
                }}
            >
                Закрити
            </button>
            <form onSubmit={handleSave} className={styles.form}>
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
                    <input type="number" value={price} onChange={(e) => setPrice(+parseFloat(e.target.value).toFixed(2))} />
                </label>
                <button>Зберегти</button>
            </form>
        </div>
    );
};

export default TheProductEditForm;
