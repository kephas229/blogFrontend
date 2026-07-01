import API_URL from '../../api.js';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "./AuthLayout";
import InputField from "./InputField";
import { setToken } from "./auth";
import { validateRegisterForm, getPasswordStrength } from "./validateRegisterForm";

const strengthLabels = ["", "Très faible", "Faible", "Moyen", "Fort", "Très fort"];
const strengthColors = ["", "danger", "danger", "warning", "info", "success"];

const PasswordStrength = ({ password }) => {
    const { passed, failed, score } = getPasswordStrength(password);
    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="d-flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`flex-fill rounded`}
                        style={{ height: 4, backgroundColor: i <= score ? `var(--bs-${strengthColors[score]})` : "#dee2e6", transition: "background-color 0.3s" }}
                    />
                ))}
            </div>
            <small className={`text-${strengthColors[score]} fw-semibold`}>{strengthLabels[score]}</small>
            <ul className="list-unstyled mt-1 mb-0" style={{ fontSize: "0.78rem" }}>
                {failed.map((msg) => (
                    <li key={msg} className="text-danger"><i className="bi bi-x-circle-fill me-1" />{msg}</li>
                ))}
                {passed.map((msg) => (
                    <li key={msg} className="text-success"><i className="bi bi-check-circle-fill me-1" />{msg}</li>
                ))}
            </ul>
        </div>
    );
};

const Register = () => {
    const [formData, setFormData] = useState({ fullname: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors]     = useState({});
    const [loading, setLoading]   = useState(false);
    const navigate                = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = validateRegisterForm(formData);
        if (Object.keys(errs).length) return setErrors(errs);

        setLoading(true);

        try {
            const res = await fetch(API_URL + "/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.fullname,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setToken(data.token);
                toast.success("Compte créé avec succès !");
                navigate("/admin");
            } else {
                setErrors(data.errors || { email: data.message });
            }
        } catch {
            toast.error("Impossible de joindre le serveur, réessaie plus tard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout icon="bi-person-plus-fill" title="Créer un compte" subtitle="Rejoignez-nous en quelques secondes.">
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Nom complet" icon="bi-person" type="text" name="fullname"
                    value={formData.fullname} onChange={handleChange}
                    placeholder="Votre nom" error={errors.fullname}
                />
                <InputField
                    label="Email" icon="bi-envelope" type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="exemple@email.com" error={errors.email}
                />

                <div className="mb-3">
                    <InputField
                        label="Mot de passe" icon="bi-lock" type="password" name="password"
                        value={formData.password} onChange={handleChange}
                        placeholder="••••••••" error={errors.password}
                    />
                    <PasswordStrength password={formData.password} />
                </div>

                <InputField
                    label="Confirmer le mot de passe" icon="bi-shield-lock" type="password" name="confirmPassword"
                    value={formData.confirmPassword} onChange={handleChange}
                    placeholder="••••••••" error={errors.confirmPassword}
                />

                <button className="btn btn-primary w-100 py-2 fw-bold mt-1" disabled={loading}>
                    <i className="bi bi-person-plus-fill me-2" />
                    {loading ? "Création en cours..." : "S'inscrire"}
                </button>

                <div className="text-center mt-4">
                    <span className="text-muted">Déjà un compte ?</span>{" "}
                    <NavLink to="/login" className="text-decoration-none fw-bold">Se connecter</NavLink>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;
