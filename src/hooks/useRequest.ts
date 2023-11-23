import { useState, useCallback } from "react";

function useRequest<T>(
    request: () => Promise<Response>,
    responseParser?: (responseData: object, response?: Response) => T
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

                if (responseData?.error) throw new Error(responseData.error);
                if (responseParser)
                    data = responseParser(responseData, response);

                setData(data);
                setError("");
            })
            .catch((error) => setError(error.message || "Request failed"))
            .finally(() => setIsLoading(false));
    }, [request, responseParser]);

    return { isLoading, error, data, sendRequest };
}

export default useRequest;
