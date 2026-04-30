import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteCar, getCars } from "../api"
import type { CarFormT, CarSchemaT } from "../schemas";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import type { Filters } from "../types";
import FilterPanel from "./FilterPanel";

type TableProps = {
    onEdit?: (car: CarFormT) => void;
}

function Table({ onEdit }: TableProps) {

    const [filters, setFilters] = useState<Filters>({
        brand: "",
        model: "",
        seats: "",
        year: "",
        color: "",
    });
    const [page, setPage] = useState(1);

    const { data } = useQuery({
        queryKey: ["cars", filters,page],
        queryFn: () => getCars(filters,page,10)
    })

    const [carToDelete, setCarToDelete] = useState<CarSchemaT | null>(null);
    const totalPages = Math.ceil(data?.total / data?.pageSize);
    const [openFilter, setOpenFilter] = useState(false);
    
    const queryClient = useQueryClient();
    
    const { mutate: deleteMutation, isPending } = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cars"] });
            queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
        }
    })

    const handleDelete = () => {
        if (!carToDelete) return;
        deleteMutation(carToDelete.id);
        setCarToDelete(null);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            brand: value,
        }));
    }

    return (
        <>
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
                <div className="px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gray-950 border-b border-gray-800">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <title>Search vehicles</title>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg pl-10 pr-4 py-2 w-full md:w-80 focus:ring-2 focus:ring-red-600 focus:border-transparent focus:outline-none placeholder-gray-600"
                                placeholder="Search by Brand"
                                onChange={handleSearch}
                                type="text"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold text-gray-300 transition-colors border border-red-800 hover:cursor-pointer" type="button" onClick={() => setOpenFilter(prev => !prev)}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <title>Filter vehicles</title>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            FILTERS
                        </button>
                    </div>
                </div>
                <div
                    className={`transition-all duration-300 overflow-hidden ${openFilter ? "max-h-96 mb-4" : "max-h-0"}`}
                >
                    <FilterPanel filters={filters} setFilters={setFilters} />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-950 text-gray-400 text-xs font-semibold uppercase border-b border-gray-800">
                                <th className="px-6 py-4 font-bold"></th>
                                <th className="px-6 py-4 font-bold">Brand</th>
                                <th className="px-6 py-4 font-bold">Model</th>
                                <th className="px-6 py-4 font-bold">Seats</th>
                                <th className="px-6 py-4 font-bold">Year</th>
                                <th className="px-6 py-4 font-bold">Price</th>
                                <th className="px-6 py-4 font-bold">Color</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-200">
                            {data?.items.map((car) => (
                                <tr key={car.id} className="hover:bg-gray-800/50 transition-colors border-b border-gray-800">
                                    <td className="px-6 py-4">
                                        <div className="w-20 h-12 rounded bg-gray-800 overflow-hidden border border-gray-700 shadow-md">
                                            {car.imageUrl && (
                                                <img
                                                    alt={`${car.brand} ${car.model}`}
                                                    className="w-full h-full object-cover"
                                                    src={import.meta.env.VITE_FILE_SERVER + car?.imageUrl}
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold">{car.brand}</td>
                                    <td className="px-6 py-4 ">{car.model}</td>
                                    <td className="px-6 py-4">{car.seats}</td>
                                    <td className="px-6 py-4 ">{car.year}</td>
                                    <td className="px-6 py-4 ">S/. {car.price}</td>
                                    <td className="px-6 py-4">{car.color}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="p-1 text-gray-500 hover:text-red-500 transition-colors hover:bg-gray-700 rounded"
                                                type="button"
                                                onClick={() => onEdit?.(car)}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <title>Edit vehicle</title>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button className="p-1 text-gray-500 hover:text-red-600 transition-colors hover:bg-gray-700 rounded" type="button" onClick={() => setCarToDelete(car)}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <title>Delete vehicle</title>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>)
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gray-950 border-t border-gray-800">
                    {data?.total === 0 ? (
                        <span>No entries found</span>
                    ) : (
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Showing {(data?.page - 1) * data?.pageSize + 1} to{" "}
                            {Math.min(data?.page * data?.pageSize, data?.total)} of {data?.total} entries
                        </span>
                    )}
                    <div className="flex gap-1">
                        <button className="px-3 py-2 rounded bg-gray-800 text-gray-500 hover:text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700" type="button">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <title>Go prev</title>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-3 py-2 rounded text-sm border transition-colors ${p === page
                                        ? "bg-red-600 text-white border-red-500"
                                        : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-gray-300"
                                    }`}
                                type="button"
                            >
                                {p}
                            </button>
                        ))}
                        <button className="px-3 py-2 rounded bg-gray-800 text-gray-500 hover:text-gray-300 hover:bg-gray-700 transition-colors border border-gray-700" type="button">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <title>Go next</title>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <ConfirmationModal isOpen={Boolean(carToDelete)} onClose={() => setCarToDelete(null)} onConfirm={() => handleDelete()} isLoading={isPending} />
        </>
    )
}

export default Table