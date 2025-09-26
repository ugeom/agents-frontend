export const getJsonRequest = async (url: string) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
    }
    
    return res.json();
};

export const postJsonRequest = async (url: string, body: any) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
    }
    
    return res.json();
};

export const buildApiUrl = (endpoint: string) => {
    return `${process.env.REACT_APP_API_URL}${endpoint}`;
};