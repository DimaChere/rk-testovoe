import classNames from "classnames/bind";
import styles from "./main.module.scss";

const cn = classNames.bind(styles);

export const getClasses = () => {
    const cnRoot = cn("main");

    return { cnRoot };
};
