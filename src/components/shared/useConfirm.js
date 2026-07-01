import { useState, useCallback } from 'react';

const useConfirm = () => {
    const [state, setState] = useState({ isOpen: false, resolve: null, title: '', message: '', confirmLabel: 'Confirmer', confirmVariant: 'danger' });

    const confirm = useCallback(({ title, message, confirmLabel, confirmVariant }) => {
        return new Promise((resolve) => {
            setState({ isOpen: true, resolve, title, message, confirmLabel: confirmLabel ?? 'Confirmer', confirmVariant: confirmVariant ?? 'danger' });
        });
    }, []);

    const handleConfirm = () => {
        state.resolve(true);
        setState((s) => ({ ...s, isOpen: false }));
    };

    const handleCancel = () => {
        state.resolve(false);
        setState((s) => ({ ...s, isOpen: false }));
    };

    return { confirm, dialogProps: { isOpen: state.isOpen, title: state.title, message: state.message, confirmLabel: state.confirmLabel, confirmVariant: state.confirmVariant, onConfirm: handleConfirm, onCancel: handleCancel } };
};

export default useConfirm;
