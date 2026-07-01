import { StatsCardsSkeleton } from '../shared/Skeleton';

const StatsCards = ({ totalBlogs, totalComments, loading }) => {
    if (loading) return <StatsCardsSkeleton />;

    return (
        <div className="row mb-4">
            <div className="col-md-6">
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-center">
                        <i className="bi bi-journal-text fs-1 text-primary me-3" />
                        <div>
                            <h2 className="mb-0">{totalBlogs}</h2>
                            <span className="text-muted">Articles publiés</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-center">
                        <i className="bi bi-chat-dots fs-1 text-success me-3" />
                        <div>
                            <h2 className="mb-0">{totalComments}</h2>
                            <span className="text-muted">Commentaires</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
