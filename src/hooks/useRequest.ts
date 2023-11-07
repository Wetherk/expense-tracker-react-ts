import { useState, useCallback } from "react";

function useRequest<T>(
    request: () => Promise<Response>,
    responseParser?: (responseData: object) => T
): {
    isLoading: boolean;
    error: string;
    data: T | null;
    sendRequest: () => void;
} {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState("");
    const [data, setData] = useState<T | null>(null);

    const sendRequest = useCallback(() => {
        request()
            .then(async (response) => {
                const responseData = await response.json();
                let data = responseData;

                if (responseParser) data = responseParser(responseData);
                setData(data);
            })
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false));
    }, [request, responseParser]);

    return { isLoading, error, data, sendRequest };
}

export default useRequest;
