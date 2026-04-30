import { api } from "./axios";
import {
	carCategoriesSchema,
	carsListSchema,
	DashboardDataSchema,
	pagedCarsListSchema,
	type CarFormT,
} from "../schemas";
import type { Filters } from "../types";

export const getDashboardData = async () => {
	const { data } = await api.get("/cars/dashboard");
	const result = DashboardDataSchema.safeParse(data);
	if (result.success) {
		return result.data;
	} else {
		throw new Error("Invalid dashboard data");
	}
};

export const getCars = async (
	query: Filters,
	page: number = 1,
	pageSize: number = 1
) => {
	const { data } = await api.get("/cars",{
		params:{
			...query,
			pageSize,
			page
		}
	});
	const result = pagedCarsListSchema.safeParse(data);
	if (result.success) {
		return result.data;
	} else {
		throw new Error("Invalid car data");
	}
};

export const getCarCategories = async () => {
	const { data } = await api.get("/cars/categories");
	const result = carCategoriesSchema.safeParse(data);
	if (result.success) {
		return result.data;
	} else {
		throw new Error("Invalid car categories data");
	}
};

export const createCar = async (carData: CarFormT) => {
	const { data } = await api.post("/cars", carData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	console.log("Car created:", data);
};

export const updateCar = async (id: number | null, carData: CarFormT) => {
	if (id === null) {
		throw new Error("Car ID is required for update");
	}
	const { data } = await api.put(`/cars/${id}`, carData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	console.log("Car updated:", data);
};

export const deleteCar = async (id: number) => {
	const { data } = await api.delete(`/cars/${id}`);
	console.log("Car deleted:", data);
};
