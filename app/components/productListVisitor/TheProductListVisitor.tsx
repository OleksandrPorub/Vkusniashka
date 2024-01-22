import { FC } from "react";
import styles from "./TheProductListVisitor.module.scss";
import { productItemType } from "@/app/data/assortment";

type propsType = {
    productList: productItemType[];
};

const TheProductListVisitor: FC<propsType> = ({ productList }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.listHeader}>
                <div className={styles.listHeaderProp + " " + styles.head_num}>№</div>
                <div className={styles.listHeaderProp + " " + styles.head_name}>Найменування</div>
                <div className={styles.listHeaderProp + " " + styles.head_quantity}>Вихід продукту</div>
                <div className={styles.listHeaderProp + " " + styles.head_price}>
                    Ціна <br />
                    грн
                </div>
            </div>
            <ul className={styles.productsList}>
                {productList.map((product: productItemType, i) => (
                    <li className={styles.productItem} key={product.id}>
                        <section className={styles.section_number}>
                            <div className={styles.productProp + " " + styles.prop_num}>{i + 1}</div>
                        </section>
                        <section className={styles.section_main}>
                            <section className={styles.section_top}>
                                <div className={styles.productProp + " " + styles.prop_name}>{product.name}</div>
                                <div className={styles.productProp + " " + styles.prop_quantity}>{product.quantity}</div>
                                <div className={styles.productProp + " " + styles.prop_price}>
                                    {/* {product.price ? product.price.toFixed(2) : "-------"} */}
                                    {product.price ? (
                                        <>
                                            <span className={styles.price_integer}>{product.price.toFixed()}</span>
                                             .
                                            <span  className={styles.price_fraction}>{product.price.toFixed(2).split('.')[1]}</span>
                                        </>
                                    ) : (
                                        "-------"
                                    )}
                                </div>
                            </section>
                            <section className={styles.section_description}>
                                {product.description && (
                                    <div className={styles.productProp + " " + styles.prop_description}>{product.description || ""}</div>
                                )}
                            </section>
                        </section>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TheProductListVisitor;
