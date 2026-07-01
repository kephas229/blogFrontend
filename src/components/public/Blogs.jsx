import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { isLoggedIn } from '../auth/auth';
import API_URL from '../../api.js';

const Blogs = () => {
    const [blogs, setBlogs]       = useState([]);
    const [keyword, setKeyword]   = useState('');
    const [searched, setSearched] = useState(false);
    const [loading, setLoading]   = useState(true);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/blogs`);
            const result   = await response.json();
            setBlogs(result.data);
        } catch {
            console.error('Impossible de récupérer les articles.');
        } finally {
            setLoading(false);
        }
    };

    const searchBlogs = async (e) => {
        e.preventDefault();
        if (!keyword.trim()) return;
        setLoading(true);
        try {
            const res    = await fetch(`${API_URL}/api/blogs?keyword=${encodeURIComponent(keyword)}`);
            const result = await res.json();
            setBlogs(result.data);
            setSearched(true);
        } finally {
            setLoading(false);
        }
    };

    const resetSearch = () => {
        setKeyword('');
        setSearched(false);
        fetchBlogs();
    };

    useEffect(() => { fetchBlogs(); }, []);

    return (
        <div className="container-fluid px-5">
            <form onSubmit={searchBlogs}>
                <div className="d-lg-flex justify-content-end pt-3">
                    <div className="d-flex">
                        <div className="input-group">
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => { setKeyword(e.target.value); if (!e.target.value) resetSearch(); }}
                                className="form-control"
                                placeholder="Rechercher un article"
                            />
                            {keyword && (
                                <button type="button" className="btn btn-outline-secondary" onClick={resetSearch} title="Effacer">
                                    <i className="bi bi-x-lg" />
                                </button>
                            )}
                        </div>
                        <button className="btn btn-dark ms-2" disabled={loading}>Rechercher</button>
                    </div>
                </div>
            </form>

            <div className="d-flex justify-content-between pt-5 mb-4">
                <div className="d-flex align-items-center gap-3">
                    <h4 className="mb-0">Articles</h4>
                    {searched && (
                        <span className="text-muted fs-6">
                            {blogs.length > 0
                                ? `${blogs.length} résultat${blogs.length > 1 ? 's' : ''} pour « ${keyword} »`
                                : `Aucun résultat pour « ${keyword} »`}
                        </span>
                    )}
                </div>
                {isLoggedIn() && (
                    <a href="/admin/blogs/create" className="btn btn-dark">Créer un article</a>
                )}
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-secondary" role="status" />
                </div>
            ) : blogs.length === 0 && searched ? (
                <div className="text-center py-5">
                    <i className="bi bi-search fs-1 text-muted" />
                    <p className="mt-3 text-muted fs-5">Aucun article ne correspond à <strong>« {keyword} »</strong></p>
                    <button className="btn btn-outline-dark mt-2" onClick={resetSearch}>Voir tous les articles</button>
                </div>
            ) : (
                <div className="row">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blogs;
