import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Api from '../../common';
import PropTypes from 'prop-types';

const AutoResizeTextarea = ({ value, onChange }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [value]);

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
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const emptyProductDetails = {
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
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (projectId) {
                try {
                    const url = `${Api.getSheet.url.replace(':projectId', projectId)}`;
                    const response = await axios.get(url);
                    if (response.data.success && response.data.data) {
                        setProductDetails(response.data.data.sheetData);
                    } else {
                        setProductDetails(null);
                    }
                } catch (error) {
                    // Silently handle 404 errors
                    if (error.response && error.response.status === 404) {
                        setProductDetails(null);
                    } else {
                        console.error('Error fetching production sheet:', error);
                    }
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProductDetails();
    }, [projectId]);


    const handleInputChange = (e, category, index) => {
        const updatedDetails = productDetails ? { ...productDetails } : { ...emptyProductDetails };
        const updatedCategory = [...updatedDetails[category]];
        updatedCategory[index] = e.target.value;
        setProductDetails({
            ...updatedDetails,
            [category]: updatedCategory
        });
    };

    const handleSubmit = async () => {
        if (!productDetails) return;
        try {
            const response = await axios.post(Api.saveSheet.url, {
                projectId,
                sheetData: productDetails
            });
            if (response.data.success) {
                alert('Production sheet saved successfully');
            } else {
                alert('Failed to save production sheet');
            }
        } catch (error) {
            console.error('Error saving production sheet:', error);
            alert('Error saving production sheet');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const details = productDetails || emptyProductDetails;

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
                                        value={details.productDetails[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'productDetails', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.sizes[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'sizes', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.activationOption[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'activationOption', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.qty[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'qty', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.projectAddress[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'projectAddress', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.otherDetails[idx] || ''}
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
                                        value={details.sensorType[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'sensorType', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.model[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'model', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.sensorQty[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'sensorQty', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.pickUpAddress[idx] || ''}
                                        onChange={(e) => handleInputChange(e, 'pickUpAddress', idx)}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <AutoResizeTextarea
                                        value={details.sensorOtherDetails[idx] || ''}
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

            <div className="mt-4">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={!productDetails}
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