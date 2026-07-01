import { useEffect } from 'react';

const ConfirmDialog = ({ isOpen, title, message, confirmLabel = 'Confirmer', confirmVariant = 'danger', onConfirm, onCancel }) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onCancel}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content border-0 shadow">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title">{title}</h5>
                        <button className="btn-close" onClick={onCancel} />
                    </div>
                    <div className="modal-body pt-2">
                        <p className="text-muted mb-0">{message}</p>
                    </div>
                    <div className="modal-footer border-0 pt-0">
                        <button className="btn btn-light" onClick={onCancel}>Annuler</button>
                        <button className={`btn btn-${confirmVariant}`} onClick={onConfirm}>{confirmLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
