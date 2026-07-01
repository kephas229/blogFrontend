import API_URL from '../../api.js';
import { useState, useEffect } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { CommentsSkeleton } from '../shared/Skeleton';

const Comments = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        chargerCommentaires();
    }, []);

    const chargerCommentaires = async () => {
        try {
            const response = await fetch(`${API_URL}/api/blogs/${blogId}/comments`);
            const result   = await response.json();
            setComments(result.data || []);
        } catch {
            console.error('Erreur lors du chargement des commentaires.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CommentsSkeleton />;

    return (
        <div className="col-md-8 mt-5">
            <h5 className="mb-4">
                Commentaires{' '}
                {comments.length > 0 && <span className="badge bg-secondary">{comments.length}</span>}
            </h5>

            <CommentList comments={comments} />

            <hr className="my-4" />

            <CommentForm blogId={blogId} onCommentAdded={chargerCommentaires} />
        </div>
    );
};

export default Comments;
