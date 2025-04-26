import { fetchCatImage } from "@/shared/api/fetch-cat-image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Schema, schema } from "../lib/form-schema";

export const useFetchForm = (
    handleChangeImageUrl: (newUrl: string) => void
) => {
    const [autoRefetch, setAutoRefetch] = useState(false);
    const { register, watch, handleSubmit } = useForm<Schema>({
        resolver: zodResolver(schema),
    });

    const isSubmitEnabled = watch("enabled");

    const {
        error,
        mutate: fetchCat,
        isPending,
    } = useMutation({
        mutationFn: fetchCatImage,
        onSuccess: (data) => {
            handleChangeImageUrl(data);
        },
    });

    const { data: autoRefetchData } = useQuery({
        queryKey: ["auto-refetch-cat"],
        queryFn: () => fetchCatImage(),
        refetchInterval: autoRefetch ? 5000 : false,
        enabled: autoRefetch,
    });

    useEffect(() => {
        if (autoRefetch && autoRefetchData) {
            handleChangeImageUrl(autoRefetchData);
        }
    }, [autoRefetch, autoRefetchData, handleChangeImageUrl]);

    const onSubmit = handleSubmit((formData: Schema) => {
        setAutoRefetch(formData.autoRefetch);

        if (!formData.autoRefetch) {
            fetchCat();
        }
    });

    return { isPending, register, isSubmitEnabled, onSubmit, error };
};
