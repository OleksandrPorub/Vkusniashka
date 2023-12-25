import styles from "./TheLoader.module.scss";

interface LoaderProps {
    size?: number;
}

const TheLoader: React.FC<LoaderProps> = ({ size = 40 }) => {
    const spinnerStyle = {
        width: size,
        height: size,
        borderWidth: size / 11,
    };
    const textStyle = {
        fontSize: size/4.2,
    };
    return (
        <div className={styles.loader} style={textStyle}>
            <div className={styles.spinner} style={spinnerStyle}></div>
            <span className={styles.text}>
                зачекайте
            </span>
        </div>
    );
};

export default TheLoader;
