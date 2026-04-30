import { useState } from "react";
import CarModal from "../components/CarModal"
import Dashboard from "../components/Dashboard"
import Table from "../components/Table"
import type { CarFormT, CarSchemaT } from "../schemas";
import { createCar, updateCar } from "../api";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Partial<CarSchemaT> | undefined>(undefined);




  const closeModal = () => {
    setModalOpen(false);
    setEditingCar(undefined);
  };

  const openCreateModal = () => {
    setEditingCar(undefined);
    setModalOpen(true);
  };

  const openEditModal = (car: CarFormT) => {
    setEditingCar(car);
    setModalOpen(true);
  };

  const handleSubmit = (data: CarFormT) => {
    if (editingCar?.id) {
      return updateCar(editingCar.id,data);
    } else {
      return createCar(data);
    }
  };

  return (
    <main className="md:ml-64 pt-24 px-20 pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h1 className="text-5xl font-bold text-gray-100 mb-2">Inventory Management</h1>
          <p className="text-red-300 text-lg">Manage and track high-performance vehicle stock across global locations.</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 border border-red-500/20 shadow-lg hover:shadow-red-600/20 active:scale-95 whitespace-nowrap duration-150 hover:cursor-pointer" type="button" onClick={openCreateModal}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <title>Add new car</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          ADD NEW VEHICLE
        </button>
      </header>
      <Dashboard />
      <Table onEdit={openEditModal} />
      <CarModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingCar}
        title={editingCar?.id ? "Editar Vehículo" : "Nuevo Vehículo"}
        buttonLabel={editingCar?.id ? "Actualizar" : "Guardar"}
      />
    </main>
  )
}

export default Index