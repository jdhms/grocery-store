import React, { useCallback } from "react";
import { useAccount, useMsal } from "@azure/msal-react";
import { AuthConfig } from "../config";

interface UserCtx {
  request: <T>(url: string, opts?: Partial<RequestInit>) => Promise<T | null>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  username?: string;
}

export const UserContext = React.createContext<UserCtx>(undefined!);

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const baseUrl = AuthConfig.API_URL!;
const tokenRequest = {
  scopes: [AuthConfig.API_SCOPE],
};

export const UserContextProvider: React.FC = (props) => {
  const { children } = props;
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] ?? {});

  const getTokenSilent = useCallback(async () => {
    try {
      const response = await instance.acquireTokenSilent({
        ...tokenRequest,
        account: account ?? undefined,
      });
      return response.accessToken;
    } catch (e) {
      console.log("Failed to aquire token silently");
      return null;
    }
  }, [instance, account]);

  const getTokenPopup = useCallback(async () => {
    try {
      const response = await instance.acquireTokenPopup(tokenRequest);
      return response.accessToken;
    } catch (e) {
      console.log("Failed to aquire token with popup");
      return null;
    }
  }, [instance]);

  const aquireToken = useCallback(async () => {
    let token = await getTokenSilent();
    if (token) {
      return token;
    }
    return await getTokenPopup();
  }, [getTokenPopup, getTokenSilent]);

  const getAuthHeaders = useCallback(async () => {
    const token = account ? await aquireToken() : await getTokenSilent();
    const value = token ? `Bearer ${token}` : "";
    return {
      Authorization: value,
    };
  }, [getTokenSilent, aquireToken, account]);

  const login = useCallback(async () => {
    await instance.loginPopup({
      ...tokenRequest,
      prompt: "select_account",
    });
  }, [instance]);

  const logout = useCallback(async () => {
    instance.logout();
  }, [instance]);

  const request = useCallback(
    async <T,>(
      url: string,
      opts: Partial<RequestInit> = {}
    ): Promise<T | null> => {
      const authHeader = await getAuthHeaders();
      const resp = await fetch(`${baseUrl}${url}`, {
        ...opts,
        headers: {
          ...defaultHeaders,
          ...opts.headers,
          ...authHeader,
        },
      });
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      try {
        const data = await resp.json();
        return data;
      } catch (e) {
        return null;
      }
    },
    [getAuthHeaders]
  );

  return (
    <UserContext.Provider
      value={{ request, login, logout, username: account?.name }}
    >
      {(account || inProgress === "none") && children}
    </UserContext.Provider>
  );
};
