'use strict';


const getResource = async (url) => {
    const result = await fetch(url);
    
    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
};

const postResource = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};

export {getResource};
export {postResource};