import API_URL from '../../api.js';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authHeaders } from '../auth/auth';
import ConfirmDialog from '../shared/ConfirmDialog';
import useConfirm from '../shared/useConfirm';
import { AdminCommentsSkeleton } from '../shared/Skeleton';

const AdminComments = () => {
    const [comments, setComments] = useState([]);
    const [erreur, setErreur]     = useState('');
    const [loading, setLoading]   = useState(true);
    const { confirm, dialogProps } = useConfirm();

    useEffect(() => {
        chargerCommentaires();
    }, []);

    const chargerCommentaires = async () => {
        try {
            const response = await fetch(API_URL + '/api/admin/comments', {
                headers: authHeaders(),
            });
            if (!response.ok) throw new Error();
            const result = await response.json();
            setComments(result.data || []);
        } catch {
            setErreur('Impossible de charger les commentaires. Réessaie plus tard.');
        } finally {
            setLoading(false);
        }
    };

    const supprimerCommentaire = async (id) => {
        const ok = await confirm({
            title: 'Supprimer ce commentaire ?',
            message: 'Le commentaire sera définitivement supprimé.',
            confirmLabel: 'Supprimer',
        });
        if (!ok) return;

        try {
            const response = await fetch(`${API_URL}/api/admin/comments/${id}`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (!response.ok) throw new Error();
            setComments(comments.filter((c) => c.id !== id));
            toast.success('Commentaire supprimé');
        } catch {
            toast.error('Erreur lors de la suppression. Réessaie.');
        }
    };

    if (loading) return (
        <>
            <ConfirmDialog {...dialogProps} />
            <AdminCommentsSkeleton />
        </>
    );

    return (
        <>
            <ConfirmDialog {...dialogProps} />

            <div className="container mb-5">
                <h2 className="pt-5 mb-4">Commentaires</h2>

                {erreur && <div className="alert alert-danger">{erreur}</div>}

                {!erreur && comments.length === 0 ? (
                    <p className="text-muted">Aucun commentaire pour l'instant.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <strong>{comment.visitor_name}</strong>{' '}
                                        <small className="text-muted">({comment.visitor_email})</small>
                                        <p className="mb-0 mt-1">{comment.message}</p>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => supprimerCommentaire(comment.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default AdminComments;
