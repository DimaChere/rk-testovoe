"use client";
import { CatImage } from "@/components/cat-image/cat-image";
import { FetchForm } from "@/components/fetch-form/ui/fetch-form";
import { useState } from "react";
import { getClasses } from "./styles/get-classes";

export const MainPage = () => {
    const { cnRoot } = getClasses();
    const [imageUrl, setImageUrl] = useState<string>("");

    const handleChangeImageUrl = (newUrl: string) => {
        setImageUrl(newUrl);
    };

    return (
        <main className={cnRoot}>
            <FetchForm handleChangeImageUrl={handleChangeImageUrl} />
            <CatImage imageUrl={imageUrl} />
        </main>
    );
};
