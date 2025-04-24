export const fetchCatImage = async () => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search", {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch cat");
    const data = await res.json();

    return data[0].url;
};
