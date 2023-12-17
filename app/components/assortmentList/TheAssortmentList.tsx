"use client";

import type { assortmentType, productItemType } from "@/app/data/assortment";
import { FC } from "react";
import styles from "./TheAssortmentList.module.scss";

const TheAssortmentList: FC<{ assortList: assortmentType }> = ({ assortList }) => {
    return (
        <table className={styles.table}>
            {/* <colgroup>
                <col />
                <col className={styles.colQuantity} />
                <col />
            </colgroup> */}
            <tbody>
                <tr className={styles.trHeader}>
                    <th>id</th>
                    <th>Найменування</th>
                    <th>
                        Вихід <br /> продукту
                    </th>
                    <th>Ціна</th>
                </tr>
                {assortList.map((product: productItemType) => (
                    <tr key={product.id}>
                        <td
                            onClick={() => {
                                console.log("Click");
                            }}
                        >
                            {product._id}
                        </td>
                        <td
                            onClick={() => {
                                console.log("Click");
                            }}
                        >
                            {product.name}
                        </td>
                        <td className={styles.tdQuantity}>{product.quantity}</td>
                        {product.price && <td className={styles.tdPrice}>{product.price} грн </td>}
                        {/* <td>{product.discription || ""}</td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TheAssortmentList;
