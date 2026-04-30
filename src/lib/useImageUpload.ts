// hooks/useImageUpload.ts
import { useState, useCallback } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { CarFormT } from "../schemas";

export function useImageUpload(setValue: UseFormSetValue<CarFormT>) {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleFiles = useCallback(
		(files: FileList | null) => {
			const file = files?.[0];
			if (file?.type.startsWith("image/")) {
				setImagePreview(URL.createObjectURL(file));
				setValue("image", file);
			}
		},
		[setValue],
	);

	const removeImage = () => {
		setImagePreview(null);
		setValue("image", undefined);
	};

	return {
		imagePreview,
		setImagePreview,
		isDragging,
		setIsDragging,
		handleFiles,
		removeImage,
	};
}
