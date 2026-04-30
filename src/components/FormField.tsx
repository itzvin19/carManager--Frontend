import type { FieldError } from "react-hook-form";

export const FormField = ({ label, error, children }: { label: string, error?: FieldError, children: React.ReactNode }) => (
    <div>
        <span className="block text-sm font-medium text-gray-300 mb-1">{label}</span>
        {children}
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);