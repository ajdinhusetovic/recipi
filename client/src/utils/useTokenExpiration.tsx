import { useEffect, useRef } from "react";

interface TokenData {
  exp: number;
}

const useTokenExpiration = () => {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenData: TokenData = JSON.parse(atob(token.split(".")[1]));
        const expiryTime = tokenData.exp * 1000;
        const currentTime = Date.now();

        if (currentTime > expiryTime) {
          handleTokenExpired();
        } else {
          const timeUntilExpiry = expiryTime - currentTime;
          return window.setTimeout(checkTokenExpiry, timeUntilExpiry);
        }
      }
    };

    timeoutRef.current = checkTokenExpiry();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTokenExpired = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
};

export default useTokenExpiration;
