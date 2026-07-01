import API_URL from '../../api.js';
import { useState, useEffect } from 'react';
import { authHeaders } from '../auth/auth';
import StatsCards from './StatsCards';
import RecentBlogs from './RecentBlogs';

const Dashboard = () => {
    const [totalBlogs, setTotalBlogs]       = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [latestBlogs, setLatestBlogs]     = useState([]);
    const [loading, setLoading]             = useState(true);

    useEffect(() => {
        chargerDashboard();
    }, []);

    const chargerDashboard = async () => {
        try {
            const response = await fetch(API_URL + '/api/admin/dashboard', {
                headers: authHeaders(),
            });
            const result = await response.json();
            setTotalBlogs(result.totalBlogs);
            setTotalComments(result.totalComments);
            setLatestBlogs(result.LatestBlogs);
        } catch {
            console.error('Erreur lors du chargement du dashboard.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mb-5">
            <h2 className="pt-5 mb-4">Tableau de bord</h2>
            <StatsCards totalBlogs={totalBlogs} totalComments={totalComments} loading={loading} />
            <RecentBlogs blogs={latestBlogs} loading={loading} />
        </div>
    );
};

export default Dashboard;
