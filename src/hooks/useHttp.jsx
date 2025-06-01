import { useState, useCallback } from 'react';

export default function useHttp(initialData = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(initialData);

  function clearData(){
    setData(initialData);
  }

  const sendRequest = useCallback(async (requestFunction, requestData = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await requestFunction(requestData);
      setData(responseData);
      return responseData; // return for optional usage
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      throw err; // rethrow for local catch if needed
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    data,
    sendRequest,
    clearData
  };
}
