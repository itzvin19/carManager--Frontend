import { Outlet } from 'react-router-dom'

function MainLayout() {
    return (
        <>
            <header className="bg-zinc-950 docked full-width top-0 z-50 border-b border-zinc-800 shadow-none flex justify-between items-center w-full px-6 h-16 fixed">
                <div className="flex items-center gap-8">
                    <span className="text-xl font-black italic tracking-tighter text-red-600 dark:text-red-500">Apex Inventory</span>
                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex gap-4">
                            <button className="text-red-500 border-b-2 border-red-500 font-inter uppercase tracking-wider text-xs font-bold duration-200 transition-all ease-in-out px-2 py-1" type="button">Inventory</button>
                            <button className="text-zinc-400 hover:text-zinc-100 font-inter uppercase tracking-wider text-xs font-bold duration-200 transition-all ease-in-out px-2 py-1" type="button">Sales</button>
                            <button className="text-zinc-400 hover:text-zinc-100 font-inter uppercase tracking-wider text-xs font-bold duration-200 transition-all ease-in-out px-2 py-1" type="button">Service</button>
                            <button className="text-zinc-400 hover:text-zinc-100 font-inter uppercase tracking-wider text-xs font-bold duration-200 transition-all ease-in-out px-2 py-1" type="button">Reports</button>
                        </nav>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="material-symbols-outlined text-zinc-400 hover:text-zinc-50 cursor-pointer duration-200 transition-all ease-in-out active:scale-95" data-icon="notifications" type="button">notifications</button>
                    </div>
                    <button className="material-symbols-outlined text-zinc-400 hover:text-zinc-50 cursor-pointer duration-200 transition-all ease-in-out active:scale-95" data-icon="settings" type="button">settings</button>
                    <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden cursor-pointer">
                        <img alt="Manager Profile" className="h-full w-full object-cover" data-alt="professional male executive portrait in high-end office setting with soft cinematic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqtjiRsQJGJKWfBW2tcBvGRg-Ux_lIHj66pxX_4UleREj8L8QKUULYwNDE59as--3zFysGc8YeAhM6vHyGpu3p0AZhrB9RbOz2jMLGdYR2rfK0F47WOv8JS0VpfKMUcLLUYO0a4TYeF3CCdkxq_79z8HWxCU0nnmRLKT3TCCS-jE_Nl01tRcG02aPmXUkhuqL4oCbGiwSLPDnh-GHA3BZBVRbq6quKtU3CwgpQ4v_LkYXaHjtc_4JUp2mdhDUSep7EZYa2irg-XF8" />
                    </div>
                </div>
            </header>
            <aside className="bg-zinc-950 fixed left-0 top-0 h-full w-64 border-r border-zinc-800 shadow-none flex flex-col py-4 z-40 md:flex pt-20">
                <div className="px-6 mb-8">
                    <h2 className="text-lg font-black text-white uppercase tracking-tight">Fleet Ops</h2>
                    <p className="font-inter uppercase tracking-widest text-[10px] font-bold text-zinc-500">Global Dashboard</p>
                </div>
                <nav className="grow space-y-1">
                    <button className="w-full text-left bg-zinc-900 text-red-500 border-r-4 border-red-600 flex items-center px-4 py-3 transition-colors duration-150 ease-linear group" type="button">
                        <span className="material-symbols-outlined mr-3" data-icon="directions_car">directions_car</span>
                        <span className="font-inter uppercase tracking-widest text-[10px] font-bold">Inventory</span>
                    </button>
                    <button className="w-full text-left text-zinc-500 hover:text-zinc-200 flex items-center px-4 py-3 transition-colors duration-150 ease-linear hover:bg-zinc-900 group" type="button">
                        <span className="material-symbols-outlined mr-3" data-icon="payments">payments</span>
                        <span className="font-inter uppercase tracking-widest text-[10px] font-bold">Sales</span>
                    </button>
                    <button className="w-full text-left text-zinc-500 hover:text-zinc-200 flex items-center px-4 py-3 transition-colors duration-150 ease-linear hover:bg-zinc-900 group" type="button">
                        <span className="material-symbols-outlined mr-3" data-icon="build">build</span>
                        <span className="font-inter uppercase tracking-widest text-[10px] font-bold">Service</span>
                    </button>
                    <button className="w-full text-left text-zinc-500 hover:text-zinc-200 flex items-center px-4 py-3 transition-colors duration-150 ease-linear hover:bg-zinc-900 group" type="button">
                        <span className="material-symbols-outlined mr-3" data-icon="assessment">assessment</span>
                        <span className="font-inter uppercase tracking-widest text-[10px] font-bold">Reports</span>
                    </button>
                </nav>
                <div className="mt-auto border-t border-zinc-800 pt-4">
                    <button className="w-full text-left text-zinc-500 hover:text-zinc-200 flex items-center px-4 py-3 transition-colors duration-150 ease-linear hover:bg-zinc-900" type="button">
                        <span className="material-symbols-outlined mr-3" data-icon="help">help</span>
                        <span className="font-inter uppercase tracking-widest text-[10px] font-bold">Support</span>
                    </button>
                    <button className="w-full text-left text-zinc-500 hover:text-zinc-200 flex items-center px-4 py-3 transition-colors duration-150 ease-linear hover:bg-zinc-900" type="button">
                        <span className="material-symbols-outlined mr-3" data-icon="logout">logout</span>
                        <span className="font-inter uppercase tracking-widest text-[10px] font-bold">Logout</span>
                    </button>
                </div>
            </aside>
            <Outlet />
        </>
    )
}

export default MainLayout