import { useState, useEffect } from 'react';

export default function VoucherPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
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

  useEffect(() => {
    const crew = localStorage.getItem('crew');
    if (!crew) {
      window.location.href = '/';
      return;
    }
    setIsAuthorized(true);
  }, []);

  if (!isAuthorized) {
    return null;
  }

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
        setLoading(false);
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
        setError(generateData.message || 'Failed to generate vouchers');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Voucher Generator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Crew Name</label>
              <input
                type="text"
                name="crewName"
                value={formData.crewName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Crew ID</label>
              <input
                type="text"
                name="crewId"
                value={formData.crewId}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Flight Number</label>
              <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Flight Date</label>
              <input
                type="date"
                name="flightDate"
                value={formData.flightDate}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Aircraft Type</label>
            <select
              name="aircraftType"
              value={formData.aircraftType}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Aircraft</option>
              <option value="Boeing 737">Boeing 737</option>
              <option value="Boeing 777">Boeing 777</option>
              <option value="Airbus A320">Airbus A320</option>
              <option value="Airbus A350">Airbus A350</option>
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded">
              <p className="font-semibold">Vouchers generated successfully!</p>
              <p className="text-sm">Seat numbers: {seats.join(', ')}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Vouchers'}
          </button>
        </form>
      </div>
    </div>
  );
}
