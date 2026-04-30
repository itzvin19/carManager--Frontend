import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { carFormSchema, type CarFormT, type CarSchemaT } from "../schemas";
import { FormField } from "./FormField";
import { getCarCategories } from "../api";
import { useImageUpload } from "../lib/useImageUpload";
import { ImagePreview } from "./ImagePreview";

export type ModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CarFormT) => Promise<void>;
    initialData?: Partial<CarSchemaT>;
    title?: string;
    buttonLabel?: string;
};

export default function CarModal({ open, onClose, onSubmit, initialData, title = "Nuevo Vehículo", buttonLabel = "Guardar" }: ModalProps) {
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CarFormT>({
        resolver: zodResolver(carFormSchema),
        defaultValues: initialData || { brand: "", model: "", year: "", color: "", carTypeId: 0, price: 0, seats: 1 }
    });

    const { imagePreview, setImagePreview, isDragging, setIsDragging, handleFiles, removeImage } = useImageUpload(setValue);

    const { data: categories } = useQuery({ queryKey: ['carCategories'], queryFn: getCarCategories });

    useEffect(() => {
        if (open) {
            reset(initialData || { brand: "", model: "", year: "", color: "", carTypeId: 0, price: 0, seats: 1 });
        }

        if (initialData?.imageUrl) {
                setImagePreview(import.meta.env.VITE_FILE_SERVER+initialData.imageUrl);
            } else {
                setImagePreview(null);
            }
    }, [open, initialData,setImagePreview, reset]);

    const { mutate, isPending } = useMutation({
        mutationFn: onSubmit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
            removeImage();
            onClose();
        }
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/** biome-ignore lint/a11y/noStaticElementInteractions: s */}
            {/** biome-ignore lint/a11y/useKeyWithClickEvents: s*/}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-gray-900 text-white shadow-xl border border-gray-800 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-gray-800 px-5 py-3">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition" type="button">✕</button>
                </div>

                <form onSubmit={handleSubmit((data) => mutate(data))} className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <FormField label="Brand" error={errors.brand}>
                                <input {...register("brand")} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500" placeholder="Toyota" />
                            </FormField>

                            <FormField label="Model" error={errors.model}>
                                <input {...register("model")} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500" placeholder="Corolla" />
                            </FormField>

                            <FormField label="Year" error={errors.year}>
                                <input type="number" {...register("year")} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500" placeholder="2000" />
                            </FormField>

                            <FormField label="Color" error={errors.color}>
                                <input {...register("color")} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500" placeholder="Negro" />
                            </FormField>

                            <FormField label="Seats" error={errors.seats}>
                                <input {...register("seats", { valueAsNumber: true })} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500" placeholder="Negro" />
                            </FormField>

                            <FormField label="Car Type" error={errors.carTypeId}>
                                <select {...register("carTypeId", { valueAsNumber: true })} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500">
                                    <option value="0">Selecciona...</option>
                                    {categories?.map(cat => <option key={cat.id} value={cat.id}>{cat.type}</option>)}
                                </select>
                            </FormField>

                            <FormField label="Price" error={errors.price}>
                                <input type="number" {...register("price", { valueAsNumber: true })} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500" />
                            </FormField>
                        </div>

                        <div className="lg:col-span-1">
                            <span className="block text-sm font-medium text-gray-300 mb-1">Imagen</span>
                            {/** biome-ignore lint/a11y/noStaticElementInteractions: a */}
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
                                className={`border-2 border-dashed rounded-lg p-10 transition min-h-40 flex flex-col ${isDragging
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-gray-700 hover:border-gray-600"
                                    }`}
                            >
                                <input type="file" accept="image/*" id="img-input" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                                <label htmlFor="img-input" className="cursor-pointer flex flex-col items-center">
                                    <svg className="w-10 h-10 text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <title>Icono de subir imagen</title>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs">Subir imagen</span>
                                </label>
                            </div>
                            {imagePreview && <ImagePreview src={imagePreview} onRemove={removeImage} />}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
                        <button type="button" onClick={onClose} className="ray-700 transition cursor-pointer">Cancelar</button>
                        <button type="submit" disabled={isPending} className="px-4 py-2 rounded-lg bg-red-600 disabled:bg-red-900 hover:bg-red-700 transition font-medium cursor-pointer">
                            {isPending ? "Cargando..." : buttonLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}