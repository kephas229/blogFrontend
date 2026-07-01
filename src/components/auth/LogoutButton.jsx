import API_URL from '../../api.js';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken, removeToken } from "./auth";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch(API_URL + "/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
      });
    } catch {
      // on déconnecte quand même côté client si le serveur est injoignable
    } finally {
      removeToken();
      toast("À bientôt !");
      navigate("/login");
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout} disabled={loading}>
      <i className="bi bi-box-arrow-right me-2" />
      {loading ? "Déconnexion..." : "Déconnexion"}
    </button>
  );
};

export default LogoutButton;
