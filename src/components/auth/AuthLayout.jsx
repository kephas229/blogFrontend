import React from "react";

const AuthLayout = ({ icon, title, subtitle, children }) => (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center"
    style={{
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div
      className="card shadow-lg border-0 rounded-4 p-4"
      style={{ width: "100%", maxWidth: "480px", background: "rgba(255,255,255,.95)" }}
    >
      <div className="text-center mb-4">
        <div
          className="bg-primary rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
          style={{ width: 70, height: 70, cursor: 'pointer' }}
          onClick={() => window.location.href = '/'}
          title="Retour à l'accueil"
        >
          <i className={`bi ${icon} text-white fs-2`}></i>
        </div>
        <h2 className="fw-bold">{title}</h2>
        <p className="text-muted">{subtitle}</p>
      </div>
      {children}
    </div>
  </div>
);

export default AuthLayout;