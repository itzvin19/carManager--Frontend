import { useQuery } from "@tanstack/react-query"
import { getDashboardData } from "../api"


function Dashboard() {

    const { data, isLoading } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: getDashboardData
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Total Assets</p>
                <div className="flex justify-between items-center">
                    <h3 className="text-4xl font-bold text-gray-100">S/. {isLoading ? "-" : data?.totalAssetsPrice}</h3>
                    <span className="text-red-500 text-sm font-semibold">{isLoading ? "" : "+4.2%"}</span>
                </div>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-md">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-2">Units In Stock</p>
                <div className="flex justify-between items-center">
                    <h3 className="text-4xl font-bold text-gray-100">{isLoading ? "-" : data?.totalCars}</h3>
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <title>Car Icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Dashboard