"use client";

import { FormEventHandler, useState } from "react";
import styles from "./TheProductCreateForm.module.scss";
import ThePopUpWrapper from "../popUpWrapper/ThePopUpWrapper";
import { productItemType } from "@/app/data/assortment";


type Props = {
    setCreateForm: Function;
    handler_createItem: Function;
};

const TheProductCreateForm: React.FC<Props> = ({ setCreateForm, handler_createItem }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if(!name){
            window.alert('Поле "Назва продукту" не заповнене!');
            return;
        }
        const randomID = Math.random().toString(36).substring(2);
        const newProduct: productItemType = { name: name, id: randomID };
        newProduct.quantity = quantity;
        newProduct.description = description;
        newProduct.price = +((parseFloat(price)).toFixed(2));
        await handler_createItem(newProduct);
        setCreateForm(false);
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
