import { z } from "zod";

export const DashboardDataSchema = z.object({
	totalCars: z.number(),
	totalAssetsPrice: z.number(),
});

export const carSchema = z.object({
	id: z.number(),
	brand: z.string().min(1, "La marca es requerida"),
	model: z.string().min(1, "El modelo es requerido"),
	year: z.string().min(1, "Año inválido"),
	color: z.string().min(1, "El color es requerido"),
	carTypeId: z.number().min(1, "La categoría es requerida"),
	price: z.number().min(1, "El precio debe ser mayor a 0"),
	seats: z.number().min(1, "El número de asientos debe ser minimo 1"),
	imageUrl: z.string().nullable().optional(),
	image: z.file().optional(),
});
export const carsListSchema = z.array(carSchema);

export const pagedCarsListSchema = z.object({
	items: carsListSchema,
	total: z.number(),
	page: z.number(),
	pageSize: z.number(),
});

export const carFormSchema = carSchema.omit({ id: true, imageUrl: true })

export const carCategoriesSchema = z.array(
  z.object({
    id: z.number(),
    type: z.string(),
  })
)

export type CarSchemaT = z.infer<typeof carSchema>;
export type CarFormT = z.infer<typeof carFormSchema>;
export type CarCategoriesT = z.infer<typeof carCategoriesSchema>;
export type DashboardDataT = z.infer<typeof DashboardDataSchema>;
