const pulse = {
    background: 'linear-gradient(90deg, #e9ecef 25%, #dee2e6 50%, #e9ecef 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-pulse 1.5s ease-in-out infinite',
    borderRadius: 6,
};

const style = document.createElement('style');
style.textContent = `@keyframes skeleton-pulse { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`;
if (!document.head.querySelector('[data-skeleton]')) {
    style.setAttribute('data-skeleton', '');
    document.head.appendChild(style);
}

export const SkeletonBox = ({ width = '100%', height = 16, className = '', style: extra = {} }) => (
    <div style={{ ...pulse, width, height, ...extra }} className={className} />
);

export const BlogCardSkeleton = () => (
    <div className="col-12 col-md-6 col-lg-4">
        <div className="card mb-4 border-0 shadow-lg overflow-hidden">
            <SkeletonBox height={200} style={{ borderRadius: 0 }} />
            <div className="card-body">
                <SkeletonBox height={20} width="75%" className="mb-2" />
                <SkeletonBox height={14} className="mb-1" />
                <SkeletonBox height={14} width="60%" className="mb-3" />
                <div className="d-flex justify-content-between align-items-center">
                    <SkeletonBox height={32} width={80} />
                </div>
            </div>
        </div>
    </div>
);

export const BlogDetailsSkeleton = () => (
    <div className="container pt-5">
        <div className="d-flex justify-content-between mb-4">
            <SkeletonBox height={28} width={200} />
            <SkeletonBox height={36} width={120} />
        </div>
        <SkeletonBox height={16} width={220} className="mb-4" />
        <SkeletonBox height={320} className="mb-5 w-50" />
        <SkeletonBox height={16} className="mb-2" />
        <SkeletonBox height={16} className="mb-2" />
        <SkeletonBox height={16} width="80%" className="mb-2" />
        <SkeletonBox height={16} className="mb-2" />
        <SkeletonBox height={16} width="65%" />
    </div>
);

export const StatsCardsSkeleton = () => (
    <div className="row mb-4">
        {[0, 1].map((i) => (
            <div key={i} className="col-md-6">
                <div className="card border-0 shadow-sm mb-3">
                    <div className="card-body d-flex align-items-center gap-3">
                        <SkeletonBox width={48} height={48} style={{ borderRadius: '50%' }} />
                        <div style={{ flex: 1 }}>
                            <SkeletonBox height={32} width={60} className="mb-1" />
                            <SkeletonBox height={14} width={120} />
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export const RecentBlogsSkeleton = () => (
    <div className="card border-0 shadow-sm">
        <div className="card-body">
            <SkeletonBox height={20} width={150} className="mb-4" />
            {[...Array(5)].map((_, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <SkeletonBox height={16} width="40%" />
                    <SkeletonBox height={16} width="15%" />
                    <SkeletonBox height={16} width="12%" />
                    <SkeletonBox height={30} width={60} />
                </div>
            ))}
        </div>
    </div>
);

export const CommentsSkeleton = () => (
    <div className="col-md-8 mt-5">
        <SkeletonBox height={24} width={180} className="mb-4" />
        {[...Array(3)].map((_, i) => (
            <div key={i} className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                        <SkeletonBox height={16} width={120} />
                        <SkeletonBox height={14} width={80} />
                    </div>
                    <SkeletonBox height={14} className="mb-1" />
                    <SkeletonBox height={14} width="70%" />
                </div>
            </div>
        ))}
    </div>
);

export const AdminCommentsSkeleton = () => (
    <div className="container mb-5">
        <SkeletonBox height={32} width={200} className="mt-5 mb-4" />
        {[...Array(5)].map((_, i) => (
            <div key={i} className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div style={{ flex: 1 }}>
                            <div className="d-flex gap-2 mb-2">
                                <SkeletonBox height={16} width={120} />
                                <SkeletonBox height={14} width={160} />
                            </div>
                            <SkeletonBox height={14} className="mb-1" />
                            <SkeletonBox height={14} width="60%" />
                        </div>
                        <SkeletonBox height={32} width={90} style={{ marginLeft: 16 }} />
                    </div>
                </div>
            </div>
        ))}
    </div>
);
