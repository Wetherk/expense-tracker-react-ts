import { useState, useCallback } from "react";

function useRequest<T>(request: () => Promise<T>): {
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
            .then((response) => setData(response))
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false));
    }, [request]);

    return { isLoading, error, data, sendRequest };
}

export default useRequest;
