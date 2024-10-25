import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function NotFound() {
  const { id } = useContext(AuthContext);
  return <Navigate to={`/main/${id}`} replace />
}