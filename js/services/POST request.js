const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    if (!res.ok) {
        throw new Error(console.log(`Could not fetch ${url}, status: ${res.status}`));
    }

    return await res.json();
};

export {postData};