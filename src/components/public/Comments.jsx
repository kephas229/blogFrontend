import API_URL from '../../api.js';
import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const Comments = ({ blogId }) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        chargerCommentaires();
    }, []);

    const chargerCommentaires = async () => {
        try {
            const response = await fetch(`${API_URL}/api/blogs/${blogId}/comments`);
            const result = await response.json();
            setComments(result.data || []);
        } catch (error) {
            console.error('Erreur lors du chargement des commentaires :', error);
        }
    };

    return (
        <div className="col-md-8 mt-5">
            <h5 className="mb-4">
                Commentaires{' '}
                {comments.length > 0 && <span className="badge bg-secondary">{comments.length}</span>}
            </h5>

            <CommentList comments={comments} />

            <hr className="my-4" />

            {/* onCommentAdded : appelé par CommentForm après un envoi réussi */}
            <CommentForm blogId={blogId} onCommentAdded={chargerCommentaires} />
        </div>
    );
};

export default Comments;
