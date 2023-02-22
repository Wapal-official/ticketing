async function fetchJson(url: string, options: object): Promise<any> {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

export async function getCountries(): Promise<any[]> {
    const url = 'https://api.countrystatecity.in/v1/countries';
    const options = {
        headers: {
            'X-CSCAPI-KEY': 'MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==',
        },
    };
    return fetchJson(url, options);
}

export async function getStatesByCountryId(countryId: number): Promise<any[]> {
    const url = `https://api.countrystatecity.in/v1/countries/${countryId}/states`;
    const options = {
        headers: {
            'X-CSCAPI-KEY': 'MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==',
        },
    };
    return fetchJson(url, options);
}

export async function getCitiesByStateId(stateId: number): Promise<any[]> {
    const url = `https://api.countrystatecity.in/v1/states/${stateId}/cities`;
    const options = {
        headers: {
            'X-CSCAPI-KEY': 'MUpaQkxnREszUk00c0V3UFhEYXU5QXU0a2ZnNm1aZ2pTZlZsald3NQ==',
        },
    };
    return fetchJson(url, options);
}
