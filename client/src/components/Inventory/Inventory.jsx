import { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const Inventory = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const handleAddClick = () => {
        setSelectedProduct(null);
        setShowAddModal(true);
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleViewClick = (product) => {
        setSelectedProduct(product);
        setShowViewModal(true);
    };

    const handleSave = () => {
        setShowAddModal(false);
        setShowEditModal(false);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowViewModal(false);
    };

    return (
        <div className="container mx-auto p-4">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600 transition"
                onClick={handleAddClick}
            >
                Add Product
            </button>
            <ProductList
                onEditClick={handleEditClick}
                onDelete={handleSave}
                onViewClick={handleViewClick}
            />
            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <ProductForm
                            product={null}
                            onSave={handleSave}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <ProductForm
                            product={selectedProduct}
                            onSave={handleSave}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            )}
            {showViewModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h1 className="text-xl font-bold mb-4">View Product</h1>
                        {selectedProduct && (
                            <div>
                                <p><strong>Name:</strong> {selectedProduct.name}</p>
                                <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                                <p><strong>Model:</strong> {selectedProduct.model}</p>
                            </div>
                        )}
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
