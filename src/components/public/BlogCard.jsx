import API_URL from '../../api.js';
import { toast } from 'react-toastify';
import { authHeaders, isLoggedIn } from '../auth/auth';
import ConfirmDialog from '../shared/ConfirmDialog';
import useConfirm from '../shared/useConfirm';

const BlogCard = ({ blog, blogs, setBlogs }) => {
    const { confirm, dialogProps } = useConfirm();

    const showImage = (img) => {
        if (!img) return 'https://placehold.co/600x400';
        if (img.startsWith('http')) return img;
        return API_URL + '/uploads/blogs/' + img;
    };

    const deleteBlog = async (id) => {
        const ok = await confirm({
            title: 'Supprimer cet article ?',
            message: "Cette action est irréversible. L'article sera définitivement supprimé.",
            confirmLabel: 'Supprimer',
        });
        if (!ok) return;

        try {
            const response = await fetch(API_URL + '/api/blogs/' + id, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (!response.ok) throw new Error();
            setBlogs(blogs.filter((b) => b.id !== id));
            toast.success('Article supprimé avec succès');
        } catch {
            toast.error('Erreur lors de la suppression. Réessaie.');
        }
    };

    return (
        <>
            <ConfirmDialog {...dialogProps} />

            <div className="col-12 col-md-6 col-lg-4">
                <div className="card mb-4 border-0 shadow-lg">
                    <img
                        src={showImage(blog.image)}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                        alt={blog.title}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.shortDesc}</p>
                        <div className="d-flex justify-content-between align-items-center">

                            <a href={`/blogs/${blog.id}`} className="btn btn-dark btn-sm">Détails</a>

                            {isLoggedIn() && (
                                <div className="d-flex gap-3">
                                    <a href="#" className="text-danger" onClick={(e) => { e.preventDefault(); deleteBlog(blog.id); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </a>
                                    <a href={`/admin/blogs/edit/${blog.id}`} className="text-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                        </svg>
                                    </a>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogCard;
