import API_URL from '../../api.js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogForm from './BlogForm';
import { useImageUpload } from './useImageUpload';
import { authHeaders } from '../auth/auth';

const CreateBlog = () => {
    const [html, setHtml]     = useState('');
    const [saving, setSaving] = useState(false);
    const navigate            = useNavigate();

    const { imageId, handleFileChange }                    = useImageUpload();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const formSubmit = async (data) => {
        setSaving(true);
        try {
            const response = await fetch(API_URL + '/api/blogs', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ ...data, Description: html, image_id: imageId }),
            });
            if (!response.ok) throw new Error();
            const result = await response.json();
            if (result.message) {
                toast.success('Article créé avec succès !');
                navigate('/');
            }
        } catch {
            toast.error("Erreur lors de la création de l'article. Réessaie.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h2>Créer un article</h2>
                <a href="/" className="btn btn-dark">Retour</a>
            </div>
            <div className="card border-0 shadow">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <BlogForm
                        register={register}
                        errors={errors}
                        html={html}
                        onHtmlChange={(e) => setHtml(e.target.value)}
                        onFileChange={handleFileChange}
                        labelBouton={saving ? 'Publication...' : 'Créer'}
                        disabled={saving}
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
