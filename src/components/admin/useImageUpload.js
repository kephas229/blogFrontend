import API_URL from '../../api.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getToken } from '../auth/auth';

export const useImageUpload = () => {
    const [imageId, setImageId] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(API_URL + '/api/save-temp-image', {
                method: 'POST',
                headers: { Authorization: `Bearer ${getToken()}` },
                body: formData,
            });

            const result = await res.json();

            if (!res.ok || result.status === 'false') {
                toast.error(result.errors?.image || "Format ou taille d'image invalide.");
                e.target.value = null;
                return;
            }

            setImageId(result.image.id);
        } catch {
            toast.error("Impossible de joindre le serveur.");
        }
    };

    return { imageId, handleFileChange };
};
