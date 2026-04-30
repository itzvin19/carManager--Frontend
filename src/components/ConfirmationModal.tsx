import React, { useEffect } from "react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "primary" | "warning";
    isLoading?: boolean;
}

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "¿Estás seguro?",
    description = "Esta acción no se puede deshacer.",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    variant = "danger",
    isLoading = false,
}: ConfirmationModalProps) => {

    // Cerrar con tecla Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const variantStyles = {
        danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
        primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        warning: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-400",
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">

            {/** biome-ignore lint/a11y/noStaticElementInteractions: s */}
            {/** biome-ignore lint/a11y/useKeyWithClickEvents:d */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Contenedor del Modal */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-6 text-left shadow-xl transition-all animate-in fade-in zoom-in duration-200">

                <div className="flex items-center gap-4">
                    {/* Icono dinámico según variante */}
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${variant === 'danger' ? 'bg-red-900/30' : 'bg-blue-900/30'
                        }`}>
                        {variant === 'danger' ? (
                            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white leading-6">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-400">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Acciones */}
                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex justify-center rounded-xl bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-300 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onConfirm}
                        className={`inline-flex justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]}`}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Procesando...
                            </div>
                        ) : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;