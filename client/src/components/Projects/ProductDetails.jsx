import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Api from '../../common';
import PropTypes from 'prop-types';

const AutoResizeTextarea = ({ value, onChange }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
        }
    }, [value]); // Adjust height when value changes

    return (
        <textarea
            ref={textareaRef}
            className="w-full p-1 resize-none overflow-hidden"
            rows="1"
            value={value}
            onChange={onChange}
        />
    );
};

const ProductDetails = ({ projectId }) => {
    const [productDetails, setProductDetails] = useState({
        productDetails: ['', ''],
        sizes: ['', ''],
        activationOption: ['', ''],
        qty: ['', ''],
        projectAddress: ['', ''],
        otherDetails: ['', ''],
        sensorType: ['', '', '', '', ''],
        model: ['', '', '', '', ''],
        sensorQty: ['', '', '', '', ''],
        pickUpAddress: ['', '', '', '', ''],
        sensorOtherDetails: ['', '', '', '', '']
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data from backend when the component loads
    useEffect(() => {
        if (projectId) {
            axios.get(`${Api.getSheet.url.replace(':projectId', projectId)}`)
                .then(response => {
                    if (response.data.success && response.data.data) {
                        setProductDetails(response.data.data.sheetData);
                    } else {
                        setError('Failed to fetch production sheet data');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching production sheet:', error);
                    setError('Error fetching production sheet');
                    setLoading(false);
                });
        }
    }, [projectId]);

    // Handle input changes for form fields
    const handleInputChange = (e, category, index) => {
        const updatedCategory = [...productDetails[category]];
        updatedCategory[index] = e.target.value;
        setProductDetails({
            ...productDetails,
            [category]: updatedCategory
        });
    };

    // Submit the form and save data to the backend
    const handleSubmit = () => {
        axios.post(Api.saveSheet.url, {
            projectId,
            sheetData: productDetails
        })
            .then(response => {
                if (response.data.success) {
                    alert('Production sheet saved successfully');
                } else {
                    alert('Failed to save production sheet');
                }
            })
            .catch(error => {
                console.error('Error saving production sheet:', error);
                alert('Error saving production sheet');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-blue-700 mb-4">Production Details</h3>
                <table className="production-table w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left w-2/12">Product Details</th>
                            <th className="p-2 text-left w-1/12">Sizes</th>
                            <th className="p-2 text-left w-2/12">Activation Option</th>
                            <th className="p-2 text-left w-1/12">QTY</th>
                            <th className="p-2 text-left w-3/12">Project Address</th>
                            <th className="p-2 text-left w-1/12">Other Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <tr key={idx}>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.productDetails[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'productDetails', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.sizes[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'sizes', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.activationOption[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'activationOption', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.qty[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'qty', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.projectAddress[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'projectAddress', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.otherDetails[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'otherDetails', idx)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Activation and Sensors Section */}
            <div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">Activation and Sensors</h3>
                <table className="production-table w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left w-2/12">Sensor Type</th>
                            <th className="p-2 text-left w-2/12">Model</th>
                            <th className="p-2 text-left w-1/12">QTY</th>
                            <th className="p-2 text-left w-3/12">Pick Up Address</th>
                            <th className="p-2 text-left w-2/12">Other Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <tr key={idx}>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.sensorType[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'sensorType', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.model[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'model', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.sensorQty[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'sensorQty', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.pickUpAddress[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'pickUpAddress', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={productDetails.sensorOtherDetails[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'sensorOtherDetails', idx)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between p-4 bg-gray-100 font-sans">
                <div className="w-1/2 pr-4">
                    <h2 className="text-blue-600 font-bold mb-2">Door Panel</h2>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold mb-2">Checklist Items</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Door TYPE Sliding / Swing</span>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Single Leaf</span>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Double Leaf</span>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Model Type</span>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>Dimensions</span>
                            </div>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-md p-1 w-full"
                            />
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <span>High Speed PVC Roll Up Doors</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 pl-4">
                    <h2 className="text-blue-600 font-bold mb-2">Additional Material Calculator</h2>
                    <div className="bg-white p-4 rounded shadow">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border border-black bg-gray-100 p-2 text-left">Material Required</th>
                                    <th className="border border-black bg-gray-100 p-2 text-left">Value Pak Rupees</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(3)].map((_, index) => (
                                    <tr key={index}>
                                        <td className="border border-black p-1">
                                            <input type="text" className="w-full p-1" />
                                        </td>
                                        <td className="border border-black p-1">
                                            <input type="text" className="w-full p-1" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="border border-black p-2 text-right font-bold">Total</td>
                                    <td className="border border-black p-1">
                                        <input type="text" className="w-full p-1 bg-gray-100" readOnly />
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Save Details
                </button>
            </div>
        </>
    );
};

ProductDetails.propTypes = {
    projectId: PropTypes.string.isRequired
};

export default ProductDetails;
