import API_URL from '../../api.js';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogForm from './BlogForm';
import { useImageUpload } from './useImageUpload';
import { authHeaders } from '../auth/auth';

const BlogEdit = () => {
    const [html, setHtml]       = useState('');
    const [blog, setBlog]       = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving]   = useState(false);
    const [erreur, setErreur]   = useState('');
    const navigate              = useNavigate();
    const params                = useParams();

    const { imageId, handleFileChange }                          = useImageUpload();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const chargerBlog = async () => {
            try {
                const response = await fetch(API_URL + '/api/blogs/' + params.id);
                if (!response.ok) throw new Error('Article introuvable');
                const result = await response.json();
                setBlog(result.data);
                reset(result.data);
                setHtml(result.data.Description ?? '');
            } catch {
                setErreur("Impossible de charger l'article. Vérifie ta connexion.");
            } finally {
                setLoading(false);
            }
        };
        chargerBlog();
    }, []);

    const formSubmit = async (data) => {
        setSaving(true);
        try {
            const response = await fetch(API_URL + '/api/blogs/' + params.id, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify({ ...data, Description: html, image_id: imageId }),
            });
            if (!response.ok) throw new Error();
            const result = await response.json();
            if (result.message) {
                toast.success('Article modifié avec succès !');
                navigate('/');
            }
        } catch {
            toast.error('Erreur lors de la modification. Réessaie.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="container pt-5 text-center">
            <div className="spinner-border text-secondary" role="status" />
        </div>
    );

    if (erreur) return (
        <div className="container pt-5">
            <div className="alert alert-danger">{erreur}</div>
            <a href="/" className="btn btn-dark">Retour aux articles</a>
        </div>
    );

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h2>Modifier l'article</h2>
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
                        imageActuelle={blog.image}
                        labelBouton={saving ? 'Enregistrement...' : 'Modifier'}
                        disabled={saving}
                    />
                </form>
            </div>
        </div>
    );
};

export default BlogEdit;
