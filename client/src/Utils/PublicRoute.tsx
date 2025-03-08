import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoute() {
  const [auth, setAuth] = useState<boolean | null>(null);
  useEffect(() => {
    const getAuth = async () => {
      const response = await fetch("http://localhost:4000/api/auth/me", {
        credentials: "include",
      });
      if (response.ok) setAuth(true);
      else setAuth(false);
    };

    getAuth();
  }, []);
  if (auth === null) return;
  return auth ? <Navigate to="/" replace={true} /> : <Outlet />;
}
