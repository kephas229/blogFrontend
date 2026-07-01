import React from 'react';

// Formate une date en français : "12 juin 2025"
const formaterDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: '2-digit', month: 'long', year: 'numeric',
    });
};

const CommentList = ({ comments }) => {

    if (comments.length === 0) {
        return (
            <p className="text-muted">
                Aucun commentaire pour l'instant. Soyez le premier à commenter !
            </p>
        );
    }

    return (
        <>
            {comments.map((comment, index) => (
                <div key={index} className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <strong>{comment.visitor_name}</strong>
                            <small className="text-muted">{formaterDate(comment.created_at)}</small>
                        </div>
                        <p className="mb-0 mt-2">{comment.message}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CommentList;
