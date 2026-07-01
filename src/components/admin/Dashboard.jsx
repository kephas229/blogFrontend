import API_URL from '../../api.js';
import React, { useState, useEffect } from 'react';
import { authHeaders } from '../auth/auth';
import StatsCards from './StatsCards';
import RecentBlogs from './RecentBlogs';

// Page tableau de bord : récupère les stats + les 5 derniers articles
// Adapte l'URL selon ta route Laravel (à créer côté backend si elle n'existe pas)
const Dashboard = () => {

    const [totalBlogs, setTotalBlogs]       = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [LatestBlogs, setLatestBlogs]     = useState([]);

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
        } catch (error) {
            console.error('Erreur lors du chargement du dashboard :', error);
        }
    };

    return (
        <div className="container mb-5">
            <h2 className="pt-5 mb-4">Tableau de bord</h2>

            <StatsCards totalBlogs={totalBlogs} totalComments={totalComments} />

            <RecentBlogs blogs={LatestBlogs} />
        </div>
    );
};

export default Dashboard;
