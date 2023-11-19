import { useState, useEffect, useCallback } from 'react';

type UseErrorMessageOptions = {
  timeoutDuration?: number;
};

export const useErrorMessage = (options?: UseErrorMessageOptions) => {
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const showError = useCallback((message: string) => {
    setError(message);
    if (options?.timeoutDuration) {
      const newTimer = setTimeout(() => setError(null), options.timeoutDuration);
      setTimer(newTimer);
    }
  }, [options?.timeoutDuration]);

  const dismissError = useCallback(() => {
    setError(null);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  }, [timer]);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return { error, showError, dismissError };
};

export default useErrorMessage;