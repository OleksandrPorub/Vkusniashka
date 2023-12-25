import { FC } from "react";
import styles from "./TheProductList.module.scss";
import { productItemType } from "@/app/data/assortment";

type propsType = {
    productList: productItemType[];
    isChoose: string | null;
    setIsChoose: Function;
    chooseAction: React.JSX.Element | null;
};

const TheProductList: FC<propsType> = ({ productList, isChoose, setIsChoose, chooseAction }) => {
    return (
        <>
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
                        {isChoose === product.id && chooseAction}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TheProductList;
