import classNames from "classnames/bind";
import styles from "./cat-image.module.scss";

const cn = classNames.bind(styles);

export const getClasses = () => {
    const cnRoot = cn("wrapper");
    const cnImage = cn("cat-image");

    return {
        cnRoot,
        cnImage,
    };
};
