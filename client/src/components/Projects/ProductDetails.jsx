const ProductDetails = () => {
    return (
        <>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                    Production Details
                </h3>
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
                        {Array.from({ length: 2 }).map((_, idx) => (
                            <tr key={idx}>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>

                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            {/* Activation and Sensors Section */}
            <div>
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                    Activation and Sensors
                </h3>
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
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <textarea
                                        className="w-full p-1 resize-none overflow-hidden"
                                        rows="1"
                                        onInput={(e) => {
                                            e.target.style.height = "auto";
                                            e.target.style.height = e.target.scrollHeight + "px";
                                        }}
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
                            <div className="ml-4 flex flex-col md:flex-row items-center">
                                <div className="relative inline-flex w-full md:w-1/2">
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-md p-1 pl-20 pr-20 w-full"
                                    />

                                    <div
                                        className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1 border-l border-gray-500"
                                    ></div>
                                </div>
                            </div>


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
        </>
    )
}
export default ProductDetails