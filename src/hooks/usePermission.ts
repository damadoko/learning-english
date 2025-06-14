import { useEffect, useState } from "react";

import { clearToken, getToken } from "../utils/authUtil";
import axios from "../services/axiosInstance";
import { authToken } from "../services";

export type UsePermissionResponse = {
  username?: string;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleLogout: () => void;
  isLoading: boolean;
};

export const usePermission = (): UsePermissionResponse => {
  const [username, setUsername] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsLoading(true);
    authToken()
      .then((data) => {
        if (!data.success) {
          clearToken();
          return;
        }
        setUsername(data.user.username);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = () => {
    setUsername(undefined);
    clearToken();
  };

  return { username, isLoading, setUsername, handleLogout };
};
