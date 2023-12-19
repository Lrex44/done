import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();  // Destructure the token from useAuth

  useEffect(() => {
    const authCheck = async () => {
      if (auth?.token) {  // Check if auth.token is defined
        try {
          const res = await axios.get("/api/v1/auth/user-auth");
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        } catch (error) {
          // Handle error if the axios request fails
          console.error("Error fetching user authentication:", error);
          setOk(false);
        }
      }
    };
    authCheck();
  }, [auth]);  // Include auth in the dependency array

  return ok ? <Outlet /> : <Spinner />;
}
