import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

// Voucher Generator Modal Component
function VoucherGeneratorModal({
  isOpen,
  onClose,
  flightData
}: {
  isOpen: boolean;
  onClose: () => void;
  flightData: FlightData | null;
}) {
  const [formData, setFormData] = useState({
    crewName: '',
    crewId: '',
    flightNumber: flightData?.flightNumber || '',
    flightDate: flightData?.date || '',
    aircraftType: flightData?.aircraftType || '',
  });
  const [seats, setSeats] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Update formData when flightData changes
  useEffect(() => {
    if (flightData) {
      setFormData(prev => ({
        ...prev,
        flightNumber: flightData.flightNumber,
        flightDate: flightData.date,
        aircraftType: flightData.aircraftType,
      }));
    }
  }, [flightData]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Content - No dark background */}
      <div className="relative bg-white rounded-lg shadow-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Voucher Generator</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Crew Name</label>
            <input
              type="text"
              name="crewName"
              value={formData.crewName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Crew ID</label>
            <input
              type="text"
              name="crewId"
              value={formData.crewId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Flight Date</label>
            <input
              type="date"
              name="flightDate"
              value={formData.flightDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Aircraft Type</label>
            <select
              name="aircraftType"
              value={formData.aircraftType}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              disabled
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
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Vouchers'}
          </button>
        </form>
      </div>
    </div>
  );
}

interface Seat {
  id: string;
  seatNumber: string;
  class: string;
  isAvailable: boolean;
}

interface FlightData {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
  aircraftType: string;
  seatType: string;
  seats: Seat[];
}

export default function SeatAssignmentPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [flight, setFlight] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  useEffect(() => {
    const crew = localStorage.getItem('crew');
    if (!crew) {
      window.location.href = '/';
      return;
    }
    setIsAuthorized(true);

    // Get params from URL
    const params = new URLSearchParams(window.location.search);
    const flightNum = params.get('flight') || '';
    const flightDate = params.get('date') || '';

    if (!flightNum || !flightDate) {
      setError('No flight selected');
      setLoading(false);
      return;
    }

    // Fetch flight details with seats
    fetch(`/api/flights/${flightNum}/${flightDate}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFlight(data.flight);
          // Pre-select already assigned seats
          const assigned = data.flight.seats
            .filter((s: Seat) => !s.isAvailable)
            .map((s: Seat) => s.id);
          setSelectedSeats(assigned);
        } else {
          setError(data.message || 'Failed to load flight');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching flight:', err);
        setError('Failed to connect to server');
        setLoading(false);
      });
  }, []);

  if (!isAuthorized) {
    return null;
  }

  const handleSeatClick = async (seat: Seat) => {
    if (!seat.isAvailable && !selectedSeats.includes(seat.id)) {
      // Can't select already taken seats
      return;
    }

    setSaving(true);

    try {
      const isSelected = selectedSeats.includes(seat.id);
      
      const res = await fetch('/api/seats/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightId: flight?.id,
          seatId: seat.id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        if (isSelected) {
          setSelectedSeats(prev => prev.filter(id => id !== seat.id));
        } else {
          setSelectedSeats(prev => [...prev, seat.id]);
        }
      }
    } catch (err) {
      console.error('Error assigning seat:', err);
    } finally {
      setSaving(false);
    }
  };

  const getSeatsPerRow = () => {
    if (!flight?.aircraftType) return 6;
    // ATR has 4 seats per row (A, C, D, F), others have 6
    if (flight.aircraftType === "ATR") return 4;
    return 6;
  };

  const getRows = () => {
    if (!flight?.seats) return [];
    const rows: Seat[][] = [];
    
    // Group seats by row number
    const seatsByRow = new Map<number, Seat[]>();
    for (const seat of flight.seats) {
      const rowNum = parseInt(seat.seatNumber.replace(/[A-Z]/g, ''));
      if (!seatsByRow.has(rowNum)) {
        seatsByRow.set(rowNum, []);
      }
      seatsByRow.get(rowNum)!.push(seat);
    }
    
    // Convert map to array sorted by row number
    const sortedRows = Array.from(seatsByRow.keys()).sort((a, b) => a - b);
    for (const rowNum of sortedRows) {
      rows.push(seatsByRow.get(rowNum)!);
    }
    
    return rows;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen">
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-600">Loading flight details...</div>
        </div>
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="w-full min-h-screen">
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-500">{error || 'Flight not found'}</div>
        </div>
      </div>
    );
  }

  const rows = getRows();
  const seatsPerRow = getSeatsPerRow();

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      {/* <header className="relative bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Airline Voucher</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/available-flight" className="text-blue-600 font-medium">Flights</Link>
            <Link to="/voucher-generator" className="text-gray-600 hover:text-blue-600 font-medium">Vouchers</Link>
          </nav>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/available-flight" className="text-blue-600 hover:underline">
            ← Back to Flights
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Seat Assignment</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="text-xl font-semibold">{flight.flightNumber}</span>
                <span>•</span>
                <span>{flight.departure} → {flight.arrival}</span>
                <span>•</span>
                <span>{formatDate(flight.date)}</span>
                <span>•</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {flight.aircraftType} ({flight.seatType})
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsVoucherModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md whitespace-nowrap"
            >
              Generate Vouchers
            </button>
          </div>
        </div>

        {/* Seat Legend */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 border-2 border-green-300 rounded"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 border-2 border-blue-300 rounded"></div>
              <span className="text-gray-600">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 border-2 border-gray-300 rounded"></div>
              <span className="text-gray-600">Occupied</span>
            </div>
            <div className="ml-auto text-gray-600">
              {selectedSeats.length} seat(s) selected
            </div>
          </div>
        </div>

        {/* Aircraft Body */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Plane nose/windshield */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-full flex items-center justify-center">
              <div className="w-48 h-8 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-full border-2 border-gray-400"></div>
            </div>
          </div>

          {/* Seats */}
          <div className="space-y-2">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center items-center gap-1">
                <span className="w-6 text-gray-400 text-sm">{rowIndex + 1}</span>
                <div className="flex items-center gap-1">
                  {row.map((seat) => {
                    const isSelected = selectedSeats.includes(seat.id);
                    const isOccupied = !seat.isAvailable && !isSelected;
                    
                    let seatClass = 'bg-green-100 hover:bg-green-200 border-green-300 ';
                    if (isSelected) seatClass = 'bg-blue-100 hover:bg-blue-200 border-blue-300 ';
                    if (isOccupied) seatClass = 'bg-gray-100 border-gray-300 cursor-not-allowed ';

                    return (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat)}
                        disabled={isOccupied || saving}
                        className={`w-10 h-10 rounded-md border-2 flex items-center justify-center text-sm font-medium transition-colors ${seatClass}`}
                        title={seat.seatNumber}
                      >
                        {seat.seatNumber.replace(/\d/g, '')}
                      </button>
                    );
                  })}
                </div>
                <span className="w-6 text-gray-400 text-sm">{rowIndex + 1}</span>
              </div>
            ))}
          </div>

          {/* Aisle indicators */}
          {seatsPerRow > 3 && (
            <div className="flex justify-center mt-4 text-gray-400 text-sm">
              <div className="w-20"></div>
              <div className="w-px h-4 bg-gray-300 mx-2"></div>
              <div className="w-20 text-center">Aisle</div>
              <div className="w-px h-4 bg-gray-300 mx-2"></div>
              <div className="w-20"></div>
            </div>
          )}
        </div>


      </main>

      {/* Voucher Generator Modal */}
      <VoucherGeneratorModal
        isOpen={isVoucherModalOpen}
        onClose={() => setIsVoucherModalOpen(false)}
        flightData={flight}
      />
    </div>
  );
}
