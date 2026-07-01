import { NavLink } from 'react-router-dom';
import { RecentBlogsSkeleton } from '../shared/Skeleton';

const RecentBlogs = ({ blogs = [], loading }) => {
    if (loading) return <RecentBlogsSkeleton />;

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body">
                <h5 className="card-title mb-3">Derniers articles</h5>

                {blogs.length === 0 ? (
                    <p className="text-muted">Aucun article pour l'instant.</p>
                ) : (
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Auteur</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.author}</td>
                                    <td>{blog.date}</td>
                                    <td>
                                        <NavLink to={`/blogs/${blog.id}`} className="btn btn-sm btn-dark">
                                            Voir
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default RecentBlogs;
