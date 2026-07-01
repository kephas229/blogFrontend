import API_URL from '../../api.js';
import React from 'react';
import Editor from 'react-simple-wysiwyg';

// Formulaire réutilisé dans CreateBlog et BlogEdit
// Props :
//   register, errors : viennent de react-hook-form
//   html, onHtmlChange : pour l'éditeur de contenu
//   onFileChange : pour l'upload d'image
//   imageActuelle : (optionnel) affiche l'image existante lors de l'édition
//   labelBouton : texte du bouton de soumission

const BlogForm = ({ register, errors, html, onHtmlChange, onFileChange, imageActuelle, labelBouton, disabled = false }) => {
    return (
        <div className="card-body">

            {/* Titre */}
            <div className="mb-3">
                <label className="form-label">Titre</label>
                <input
                    {...register("title", { required: true })}
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    placeholder="Entrez le titre"
                />
                {errors.title && <p className="invalid-feedback">Le titre est obligatoire</p>}
            </div>

            {/* Courte description */}
            <div className="mb-3">
                <label className="form-label">Description courte</label>
                <textarea
                    {...register("shortDesc", { required: true })}
                    className="form-control"
                    rows="3"
                    placeholder="Résumé de l'article"
                />
            </div>

            {/* Éditeur de contenu */}
            <div className="mb-3">
                <label className="form-label">Contenu</label>
                <Editor
                    value={html}
                    onChange={onHtmlChange}
                    containerProps={{ style: { height: '400px' } }}
                />
            </div>

            {/* Image */}
            <div className="mb-3">
                <label className="form-label">Image</label>
                <input type="file" className="form-control" onChange={onFileChange} />
                {imageActuelle && (
                    <img
                        src={imageActuelle.startsWith('http') ? imageActuelle : API_URL + '/uploads/blogs/' + imageActuelle}
                        className="mt-3 w-50"
                        alt="Image actuelle"
                    />
                )}
            </div>

            {/* Auteur */}
            <div className="mb-3">
                <label className="form-label">Auteur</label>
                <input
                    {...register("author", { required: true })}
                    type="text"
                    className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                    placeholder="Nom de l'auteur"
                />
                {errors.author && <p className="invalid-feedback">L'auteur est obligatoire</p>}
            </div>

            <button className="btn btn-dark mt-2" disabled={disabled}>{labelBouton}</button>
        </div>
    );
};

export default BlogForm;
