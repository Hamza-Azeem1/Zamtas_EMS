import PropTypes from 'prop-types';

const ClientTable = ({ clients }) => {

    const truncateText = (text) => {
        if (typeof text !== 'string') return '';
        const words = text.split(' ');
        if (words.length > 1) {
            return `${words[0]}...`;
        }
        return text;
    };

    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-gray-200 text-gray-800 uppercase text-sm font-semibold">
                    <tr>
                        <th className="py-3 px-6 border-b border-gray-300">Customer Name</th>
                        <th className="py-3 px-6 border-b border-gray-300">Email</th>
                        <th className="py-3 px-6 border-b border-gray-300">Contact Person</th>
                        <th className="py-3 px-6 border-b border-gray-300">Contact</th>
                        <th className="py-3 px-6 border-b border-gray-300">Address</th>
                        <th className="py-3 px-6 border-b border-gray-300">Budget</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {clients.map((client, index) => (
                        <tr key={client._id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base font-semibold">{truncateText(client.clientName)}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base font-semibold">{client.clientEmail}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base font-semibold">{client.clientContactPerson}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base font-semibold">{client.clientContact}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base font-semibold">{truncateText(client.clientAddress)}</td>
                            <td className="py-3 px-6 border-b border-gray-300 text-center text-base font-semibold">{client.clientBudget}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ClientTable.propTypes = {
    clients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        clientName: PropTypes.string.isRequired,
        clientContact: PropTypes.string.isRequired,
        clientAddress: PropTypes.string.isRequired,
        clientBudget: PropTypes.number.isRequired,
        clientEmail: PropTypes.string.isRequired, // New field
    })).isRequired,
};

export default ClientTable;
