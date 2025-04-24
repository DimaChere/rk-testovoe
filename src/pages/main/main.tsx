import { CatImage } from "@/components/cat-image/cat-image";
import { FetchForm } from "@/components/fetch-form/ui/fetch-form";
import { getClasses } from "./styles/get-classes";

export const MainPage = () => {
    const { cnRoot } = getClasses();
    const catImage = "";

    return (
        <main className={cnRoot}>
            <FetchForm />
            <CatImage imageUrl={catImage} />
        </main>
    );
};
