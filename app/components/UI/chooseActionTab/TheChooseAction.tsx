import { FC } from "react";
import styles from "./TheChooseAction.module.scss";

type PropsWithFunction = {id:string; setEditForm: Function; handler_DelItem: Function; handler_Closer: Function };

const TheChooseAction: FC<PropsWithFunction> = ({ id, setEditForm, handler_DelItem, handler_Closer }) => {
    return (
        <div className={styles.choosingWrap}>
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
        </div>
    );
};

export default TheChooseAction;
