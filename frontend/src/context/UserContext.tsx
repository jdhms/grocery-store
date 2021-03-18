import React, { useCallback } from "react";

interface UserCtx {
  request: <T>(url: string, opts?: Partial<RequestInit>) => Promise<T | null>;
}

export const UserContext = React.createContext<UserCtx>(undefined!);

const baseUrl = process.env.REACT_APP_API_URL!;

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const UserContextProvider: React.FC = (props) => {
  const { children } = props;

  // add auth here
  const request = useCallback(
    async <T,>(
      url: string,
      opts: Partial<RequestInit> = {}
    ): Promise<T | null> => {
      const resp = await fetch(`${baseUrl}${url}`, {
        ...opts,
        headers: {
          ...defaultHeaders,
          ...opts.headers,
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
    []
  );

  return (
    <UserContext.Provider value={{ request }}>{children}</UserContext.Provider>
  );
};
