import styles from "./TheCloserIcon.module.scss";
type PropsType = {
    width: number;
    color: string;
    className?:string;
};

const TheCloserIcon = ({ width, color, className}: PropsType) => {
    
    const inlineStyles = {
        circle: {
            width: width + "px",
            height: width + "px",
            borderColor: color,
            borderWidth: (width*0.06)+"px",
        },
        line: {
            backgroundColor: color,
        },
    };

    return (
        <div className={styles.circle + (className?(" "+className):"")} style={inlineStyles.circle}>
            <div className={styles.line} style={inlineStyles.line}></div>
            <div className={styles.line} style={inlineStyles.line}></div>
        </div>
    );
};

export default TheCloserIcon;
