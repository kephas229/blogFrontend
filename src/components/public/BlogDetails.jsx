import API_URL from '../../api.js';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const BlogDetails = () => {
    const [blog, setBlog]     = useState(null);
    const [erreur, setErreur] = useState('');
    const params              = useParams();

    useEffect(() => {
        const chargerBlog = async () => {
            try {
                const response = await fetch(API_URL + '/api/blogs/' + params.id);
                if (!response.ok) throw new Error('Article introuvable');
                const result = await response.json();
                if (!result.data) throw new Error('Données manquantes');
                setBlog(result.data);
            } catch {
                setErreur("Impossible de charger cet article. Il n'existe peut-être plus.");
            }
        };
        chargerBlog();
    }, [params.id]);

    if (erreur) return (
        <div className="container pt-5">
            <div className="alert alert-danger">{erreur}</div>
            <a href="/" className="btn btn-dark">Retour aux articles</a>
        </div>
    );

    if (!blog) return (
        <div className="container pt-5 text-center">
            <div className="spinner-border text-secondary" role="status" />
        </div>
    );

    return (
        <div className="container">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Détails du Blog</h4>
                <a href="/" className="btn btn-dark">Retour aux articles</a>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <p>par <strong>{blog.author}</strong> le {blog.date}</p>

                    {blog.image && (
                        <img
                            className="w-50 h-50"
                            src={blog.image.startsWith('http') ? blog.image : API_URL + '/uploads/blogs/' + blog.image}
                            alt="illustration"
                        />
                    )}

                    <div className="mt-5" dangerouslySetInnerHTML={{ __html: blog.Description }} />
                </div>
            </div>

            <div className="row">
                <Comments blogId={params.id} />
            </div>
        </div>
    );
};

export default BlogDetails;
