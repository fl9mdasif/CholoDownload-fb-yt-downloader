/* eslint-disable @typescript-eslint/no-explicit-any */
export const modifyPayload = (values: any) => {
    // Ensure you're only passing plain data, not DOM elements or React components
    const plainData = {
        url: values.url, // or the specific properties you want to send
        // Add other properties if needed
    };

    const data = JSON.stringify(plainData);
    return data;
};
