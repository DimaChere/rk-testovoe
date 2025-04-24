"use client";
import defaultCatImage from "@/shared/assets/images/cat-image.png";
import { FC } from "react";
import { getClasses } from "./styles/get-classes";

type CatImageProps = {
    imageUrl: string;
};

export const CatImage: FC<CatImageProps> = ({ imageUrl }) => {
    const { cnRoot, cnImage } = getClasses();

    return (
        <div className={cnRoot}>
            <img
                src={imageUrl || defaultCatImage.src}
                alt="cat"
                className={cnImage}
            />
        </div>
    );
};
