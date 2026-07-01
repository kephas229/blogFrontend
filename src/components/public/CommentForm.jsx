import API_URL from '../../api.js';
import React, { useState } from 'react';

const CommentForm = ({ blogId, onCommentAdded }) => {

    const [nom, setNom]         = useState('');
    const [email, setEmail]     = useState('');
    const [message, setMessage] = useState('');
    const [envoi, setEnvoi]     = useState(false);
    const [erreur, setErreur]   = useState('');
    const [succes, setSucces]   = useState('');

    const envoyerCommentaire = async (e) => {
        e.preventDefault();
        setEnvoi(true);
        setErreur('');
        setSucces('');

        try {
            const response = await fetch(`${API_URL}/api/blogs/${blogId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom, email, message }),
            });

            if (response.ok) {
                setSucces('Votre commentaire a été publié avec succès !');
                setNom(''); setEmail(''); setMessage('');
                onCommentAdded(); // demande à Comments.jsx de recharger la liste
            } else {
                setErreur('Une erreur est survenue. Veuillez réessayer.');
            }
        } catch (error) {
            setErreur('Impossible de se connecter au serveur. Réessayez plus tard.');
        } finally {
            setEnvoi(false);
        }
    };

    return (
        <>
            <h5 className="mb-3">Laisser un commentaire</h5>

            {succes && <div className="alert alert-success">{succes}</div>}
            {erreur && <div className="alert alert-danger">{erreur}</div>}

            <form onSubmit={envoyerCommentaire}>
                <div className="mb-3">
                    <label className="form-label">Nom <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Votre nom"
                        value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Adresse email <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" placeholder="votre@email.com"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Message <span className="text-danger">*</span></label>
                    <textarea className="form-control" placeholder="Votre commentaire..."
                        rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-dark" disabled={envoi}>
                    {envoi ? 'Envoi en cours...' : 'Publier le commentaire'}
                </button>
            </form>
        </>
    );
};

export default CommentForm;
