import { useState } from 'react';

export default function VoucherPage() {
  const [formData, setFormData] = useState({
    crewName: '',
    crewId: '',
    flightNumber: '',
    flightDate: '',
    aircraftType: '',
  });
  const [seats, setSeats] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSeats([]);
    setSuccess(false);

    try {
      // Check if vouchers exist
      const checkResponse = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightNumber: formData.flightNumber,
          date: formData.flightDate,
        }),
      });

      const checkData = await checkResponse.json();

      if (checkData.exists) {
        setError('Vouchers have already been generated for this flight and date.');
        return;
      }

      // Generate vouchers
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.crewName,
          id: formData.crewId,
          flightNumber: formData.flightNumber,
          date: formData.flightDate,
          aircraft: formData.aircraftType,
        }),
      });

      const generateData = await generateResponse.json();

      if (generateData.success) {
        setSeats(generateData.seats);
        setSuccess(true);
      } else {
        setError(generateData.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Generate Voucher Seats</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="crewName" className="block text-sm font-medium text-gray-700">Crew Name</label>
            <input
              type="text"
              id="crewName"
              name="crewName"
              value={formData.crewName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="crewId" className="block text-sm font-medium text-gray-700">Crew ID</label>
            <input
              type="text"
              id="crewId"
              name="crewId"
              value={formData.crewId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700">Flight Number</label>
            <input
              type="text"
              id="flightNumber"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="flightDate" className="block text-sm font-medium text-gray-700">Flight Date</label>
            <input
              type="date"
              id="flightDate"
              name="flightDate"
              value={formData.flightDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="aircraftType" className="block text-sm font-medium text-gray-700">Aircraft Type</label>
            <select
              id="aircraftType"
              name="aircraftType"
              value={formData.aircraftType}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Aircraft Type</option>
              <option value="ATR">ATR</option>
              <option value="Airbus 320">Airbus 320</option>
              <option value="Boeing 737 Max">Boeing 737 Max</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && seats.length > 0 && (
            <div className="mb-4">
              <p className="text-green-600 text-sm">Vouchers generated successfully!</p>
              <p className="text-sm">Seats: {seats.join(', ')}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Vouchers'}
          </button>
        </form>
      </div>
    </div>
  );
}