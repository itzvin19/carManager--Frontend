import type { Filters } from "../types";

type Props = {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function FilterPanel({ filters, setFilters }: Props) {
    const handleChange = (field: keyof Filters, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const clearFilters = () => {
        setFilters(prev=>({
            ...prev,
            model: "",
            seats: "",
            year: "",
            color: ""
        }));
    };

    return (
        <div className="bg-gray-900 p-4 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <input
                    type="text"
                    placeholder="Model"
                    value={filters.model}
                    onChange={(e) => handleChange("model", e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                />

                <input
                    type="number"
                    placeholder="Seats"
                    value={filters.seats}
                    onChange={(e) => handleChange("seats", e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                />

                <input
                    type="text"
                    placeholder="Color"
                    value={filters.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                />

                <select
                    value={filters.year ?? ""}
                    onChange={(e) =>
                        handleChange("year", e.target.value)
                    }
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                >
                    <option value="">Select Year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <option key={`Y-${year}`} value={year}>{year}</option>
                    })}
                </select>
            </div>

            <div className="flex justify-end mt-4 gap-2">
                <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg hover:cursor-pointer"
                    type="button"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}