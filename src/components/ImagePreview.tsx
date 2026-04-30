interface ImagePreviewProps {
    src: string;
    onRemove: () => void;
}

export const ImagePreview = ({ src, onRemove }: ImagePreviewProps) => (
    <div className="mt-2 relative group">
        <img
            src={src}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg border border-gray-700"
        />
        <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            title="Eliminar imagen"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>
                    Eliminar imagen
                </title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
);