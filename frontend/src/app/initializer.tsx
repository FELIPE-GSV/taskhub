"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import API from "@/api/api";

export function Initializer() {
  const { setUser, setDashboardUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/pages/login');
      return;
    }

    const isTokenExpired = () => {
      const now = new Date().getTime();
      const tokenTimestamp = localStorage.getItem('tokenTimestamp');
      const expiresIn = 1800 * 1000;
      if (!tokenTimestamp) return true;
      return now - Number(tokenTimestamp) > expiresIn;
    };

    const fetchUser = async () => {
      try {
        const response = await API.get('/user/get-user/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        router.push("/pages/login");
      }
    };
    const fetchDashboard = async () => {
      try {
        const response = await API.get('/user/dashboard-user/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data) {
          setDashboardUser(response.data);
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        router.push("/pages/login");
      }
    };

    if (isTokenExpired()) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenTimestamp');
      setUser(null)
      router.push("/pages/login");
    } else {
      fetchUser();
      fetchDashboard();
    }
  }, [router, setUser]);

  return null;
}
