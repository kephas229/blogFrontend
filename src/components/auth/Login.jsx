import API_URL from '../../api.js';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import InputField from "./InputField";
import { setToken } from "./auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = "Email requis";
    if (!formData.password) errs.password = "Mot de passe requis";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);

    try {
      const res = await fetch(API_URL + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        toast.success("Connexion réussie !");
        navigate("/admin");
      } else {
        setErrors({ email: data.message || "Email ou mot de passe incorrect" });
      }
    } catch {
      toast.error("Impossible de joindre le serveur, réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout icon="bi-box-arrow-in-right" title="Connectez-vous" subtitle="BlogFlow">
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          icon="bi-envelope"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="exemple@email.com"
          error={errors.email}
        />

        <InputField
          label="Mot de passe"
          icon="bi-lock"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
        />

        <button className="btn btn-primary w-100 py-2 fw-bold mt-1" disabled={loading}>
          <i className="bi bi-box-arrow-in-right me-2" />
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>

        <div className="text-center mt-4">
          <span className="text-muted">Pas encore de compte ?</span>{" "}
          <NavLink to="/register" className="text-decoration-none fw-bold">
            S'inscrire
          </NavLink>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
