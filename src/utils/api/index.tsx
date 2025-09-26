export const postJsonRequest = async (url: string, body: any) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    return res.json();
};

export const buildApiUrl = (endpoint: string) => {
    return `${process.env.REACT_APP_API_URL}${endpoint}`;
};