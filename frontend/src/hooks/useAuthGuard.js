import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // adjust the path as needed

export const useAuthGuard = ({
  redirectTo = "/login",
  redirectDelay = 2000,
} = {}) => {
  const navigate = useNavigate();
  const { user, accessToken, refreshAccessToken } = useUser();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!accessToken) {
        await refreshAccessToken(); // wait for refresh
      }
      setIsCheckingAuth(false); // mark check as done
    };

    checkAuth();
  }, [accessToken, refreshAccessToken]);

  useEffect(() => {
    if (!isCheckingAuth && (!user || !accessToken)) {
      const timeout = setTimeout(() => {
        navigate(redirectTo);
      }, redirectDelay);

      return () => clearTimeout(timeout);
    }
  }, [isCheckingAuth, user, accessToken, navigate, redirectTo, redirectDelay]);

  const isRedirecting = !isCheckingAuth && (!user || !accessToken);

  return {
    user,
    accessToken,
    isRedirecting,
    isCheckingAuth,
  };
};
