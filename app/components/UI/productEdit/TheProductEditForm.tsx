"use client";

import { FormEventHandler, useEffect, useState } from "react";
import styles from "./TheProductEditForm.module.scss";
import ThePopUpWrapper from "../popUpWrapper/ThePopUpWrapper";
import { AnimatePresence, motion } from "framer-motion";
import TheCloserIcon from "../closerIcon/TheCloserIcon";

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
    const [name, setName] = useState(product?.name || "");
    const [quantity, setQuantity] = useState(product?.quantity || "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price?.toFixed(2) || "");
    const [formApear, setFormApear] = useState(false);

    useEffect(() => {
        setFormApear(true);
    }, []);

    const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData: productType = { name: name || "", id: product.id };

        formData.quantity = quantity;
        formData.description = description;
        formData.price = +parseFloat(price).toFixed(2);
        await handler_updateItem(formData);
        setFormApear(false);
        setTimeout(() => {
            setEditForm(false);
        }, 400);
    };

    return (
        <ThePopUpWrapper>
            <AnimatePresence>
                {formApear && (
                    <motion.div
                        className={styles.formWrapper}
                        key="productCreateForm"
                        initial={{ y: "-50vh" }}
                        animate={{
                            y: 0,
                        }}
                        exit={{ y: "-50vh", opacity: 0 }}
                        transition={{
                            duration: 1,
                            type: "spring",
                            bounce: 0.5,
                        }}
                    >
                        <div
                            className={styles.closerWrapper}
                            onClick={(e) => {
                                setFormApear(false);
                                setTimeout(
                                    (e) => {
                                        setEditForm(false);
                                        closer(e);
                                    },
                                    400,
                                    e
                                );
                            }}
                        >
                            <TheCloserIcon width={40} color={"#98ff99"}></TheCloserIcon>
                        </div>
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
                    </motion.div>
                )}
            </AnimatePresence>
        </ThePopUpWrapper>
    );
};

export default TheProductEditForm;
