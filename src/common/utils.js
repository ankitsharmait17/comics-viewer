export function convertToQueryParams(params) {
    if (!params || Object.keys(params).length === 0) {
        return '';
    }

    const queryParams = Object.entries(params)
        .filter(([key, value]) => value !== null && value !== '' && value?.length !== 0)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    return queryParams ? '?' + queryParams : '';
}

export function truncateText(text: string, maxlength = 30) {
    return text?.length > maxlength ? `${text.slice(0, maxlength)}...` : text;
}
