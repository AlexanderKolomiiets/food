const getResource = async (url) => {
    const res = await fetch(url);
        if (!res.ok) {
        throw new Error(console.log(`Could not fetch ${url}, status: ${res.status}`));
    }
    return await res.json();
};

export {getResource};