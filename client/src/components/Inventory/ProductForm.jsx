import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../common/index';

const ProductForm = ({ product, onSave, onClose }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [quantity, setQuantity] = useState(product ? product.quantity : '');
    const [model, setModel] = useState(product ? product.model : '');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setQuantity(product.quantity);
            setModel(product.model);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = product ? Api.updateProduct.url.replace(':id', product._id) : Api.addProduct.url;
        const method = product ? Api.updateProduct.method : Api.addProduct.method;

        axios({ method, url, data: { name, quantity, model } })
            .then(() => {
                onSave();
                onClose();
            })
            .catch(error => console.error(error));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold mb-4">{product ? 'Edit Product' : 'Add Product'}</h1>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Model</label>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                />
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                    {product ? 'Update' : 'Add'}
                </button>
                <button
                    type="button"
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

ProductForm.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        quantity: PropTypes.number,
        model: PropTypes.string
    }),
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ProductForm;
