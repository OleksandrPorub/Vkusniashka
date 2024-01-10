import { FC } from "react";
import styles from "./TheChooseAction.module.scss";
import { motion } from "framer-motion";

type PropsWithFunction = { id: string; setEditForm: Function; handler_DelItem: Function; handler_Closer: Function };

const TheChooseAction: FC<PropsWithFunction> = ({ id, setEditForm, handler_DelItem, handler_Closer }) => {
    return (
            <motion.div
                className={styles.choosingWrap}
                key={id}
                initial={{ scaleY: 0 }}
                animate={{
                    scaleY: 1,
                }}
                exit={{ scaleY: 0 }}
                transition={{
                    duration: 0.4,
                }}
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
                        handler_DelItem(id);
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
            </motion.div>
    );
};

export default TheChooseAction;
