const passwordRules = [
    { test: (p) => p.length >= 8,           message: "Au moins 8 caractères" },
    { test: (p) => /[A-Z]/.test(p),         message: "Une lettre majuscule" },
    { test: (p) => /[a-z]/.test(p),         message: "Une lettre minuscule" },
    { test: (p) => /[0-9]/.test(p),         message: "Un chiffre" },
    { test: (p) => /[^A-Za-z0-9]/.test(p),  message: "Un caractère spécial (!@#$...)" },
];

export const getPasswordStrength = (password) => {
    if (!password) return { passed: [], failed: passwordRules.map((r) => r.message), score: 0 };
    const passed = passwordRules.filter((r) => r.test(password)).map((r) => r.message);
    const failed = passwordRules.filter((r) => !r.test(password)).map((r) => r.message);
    return { passed, failed, score: passed.length };
};

export const validateRegisterForm = (formData) => {
    const errs = {};

    if (!formData.fullname.trim()) errs.fullname = "Nom requis";

    if (!formData.email) {
        errs.email = "Email requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = "Adresse email invalide";
    }

    if (!formData.password) {
        errs.password = "Mot de passe requis";
    } else {
        const { failed } = getPasswordStrength(formData.password);
        if (failed.length > 0) {
            errs.password = "Le mot de passe ne respecte pas les critères requis";
        }
    }

    if (!formData.confirmPassword) {
        errs.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
        errs.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    return errs;
};
