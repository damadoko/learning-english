import { useEffect, useState } from "react";

import { clearToken, getToken } from "../utils/authUtil";
import axios from "../services/axiosInstance";
import { authToken } from "../services";

export type UsePermissionResponse = {
  username?: string;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleLogout: () => void;
};

export const usePermission = (): UsePermissionResponse => {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const token = getToken();
    console.log(token);
    if (!token) return;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    authToken().then((data) => {
      if (!data.success) {
        clearToken();
        return;
      }
      setUsername(data.user.username);
    });
  }, []);

  const handleLogout = () => {
    setUsername(undefined);
    clearToken();
  };

  return { username, setUsername, handleLogout };
};
