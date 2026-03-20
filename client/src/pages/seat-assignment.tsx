import { useEffect, useState, useRef } from 'react';
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
  const [allCrew, setAllCrew] = useState<{id: string; name: string | null; email: string}[]>([]);
  const [formData, setFormData] = useState({
    crewNames: [] as string[],
    crewIds: [] as string[],
    flightNumber: flightData?.flightNumber || '',
    flightDate: flightData?.date || '',
    aircraftType: flightData?.aircraftType || '',
    departure: flightData?.departure || '',
    arrival: flightData?.arrival || '',
  });
  const [crewNameInput, setCrewNameInput] = useState('');
  const [crewIdInput, setCrewIdInput] = useState('');
  const [showCrewNameHelper, setShowCrewNameHelper] = useState(false);
  const [showCrewIdHelper, setShowCrewIdHelper] = useState(false);
  const [seats, setSeats] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const crewNameRef = useRef<HTMLDivElement>(null);
  const crewIdRef = useRef<HTMLDivElement>(null);

  // Close helpers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (crewNameRef.current && !crewNameRef.current.contains(event.target as Node)) {
        setShowCrewNameHelper(false);
      }
      if (crewIdRef.current && !crewIdRef.current.contains(event.target as Node)) {
        setShowCrewIdHelper(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close helpers on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowCrewNameHelper(false);
        setShowCrewIdHelper(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Fetch all crew for helpers and flight details
  useEffect(() => {
    if (isOpen) {
      // Fetch all crew for helpers
      fetch('/api/crew')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setAllCrew(data.crew);
          }
        })
        .catch(err => console.error('Error fetching crew:', err));

      // Fetch flight details including crew from the API
      if (flightData) {
        fetch(`/api/flights/search?q=${encodeURIComponent(flightData.flightNumber)}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.flights.length > 0) {
              // Find flight that matches the date
              const targetDate = new Date(flightData.date).toISOString().split('T')[0];
              const flight = data.flights.find((f: any) => 
                new Date(f.date).toISOString().split('T')[0] === targetDate
              ) || data.flights[0];

              if (flight) {
                const crewNames = flight.flightCrew
                  ?.map((fc: any) => fc.crew?.name)
                  .filter((name: any) => name !== null && name !== undefined) || [];
                const crewIds = flight.flightCrew
                  ?.map((fc: any) => fc.crew?.id)
                  .filter((id: any) => id !== undefined) || [];
                
                // Get aircraft type from API response
                const aircraftTypeFromApi = flight.flightAircraftType?.[0]?.aircraftType?.name || flightData.aircraftType || '';

                // Format date for input field (yyyy-MM-dd)
                const formattedDate = new Date(flightData.date).toISOString().split('T')[0];
                
                setFormData(prev => ({
                  ...prev,
                  flightNumber: flightData.flightNumber,
                  flightDate: formattedDate,
                  aircraftType: aircraftTypeFromApi,
                  departure: flightData.departure || '',
                  arrival: flightData.arrival || '',
                  crewNames: crewNames,
                  crewIds: crewIds,
                }));
              }
            }
          })
          .catch(err => console.error('Error fetching flight details:', err));
      }
    }
  }, [isOpen, flightData]);

  // Filter crew names for autocomplete
  const filteredCrewNames = allCrew.filter(crew => 
    crew.name?.toLowerCase().includes(crewNameInput.toLowerCase()) &&
    !formData.crewNames.includes(crew.name || '')
  );

  // Filter crew by IDs for autocomplete
  const filteredCrewIds = allCrew.filter(crew => 
    crew.id.toLowerCase().includes(crewIdInput.toLowerCase()) &&
    !formData.crewIds.includes(crew.id)
  );

  const addCrewByName = (crewName: string) => {
    const crew = allCrew.find(c => c.name === crewName);
    if (!crew) return;

    // Check for duplicate in crewNames
    if (formData.crewNames.includes(crewName)) {
      setError('Crew name already added');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Check for duplicate in crewIds
    if (formData.crewIds.includes(crew.id)) {
      setError('Crew ID already added');
      setTimeout(() => setError(''), 2000);
      return;
    }

    setFormData(prev => ({
      ...prev,
      crewNames: [...prev.crewNames, crewName],
      crewIds: [...prev.crewIds, crew.id],
    }));
    setCrewNameInput('');
    setShowCrewNameHelper(false);
  };

  const addCrewById = (crewId: string) => {
    const crew = allCrew.find(c => c.id === crewId);
    if (!crew) return;

    // Check for duplicate in crewIds
    if (formData.crewIds.includes(crewId)) {
      setError('Crew ID already added');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Check for duplicate in crewNames
    if (crew.name && formData.crewNames.includes(crew.name)) {
      setError('Crew name already added');
      setTimeout(() => setError(''), 2000);
      return;
    }

    setFormData(prev => ({
      ...prev,
      crewIds: [...prev.crewIds, crewId],
      crewNames: crew.name && !prev.crewNames.includes(crew.name) ? [...prev.crewNames, crew.name] : prev.crewNames,
    }));
    setCrewIdInput('');
    setShowCrewIdHelper(false);
  };

  const removeCrew = (index: number) => {
    setFormData(prev => ({
      ...prev,
      crewNames: prev.crewNames.filter((_, i) => i !== index),
      crewIds: prev.crewIds.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSeats([]);
    setSuccess(false);

    // Convert YYYY-MM-DD to DD-MM-YYYY for API
    const convertToDDMMYYYY = (dateStr: string) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return dateStr;
    };

    const apiDate = convertToDDMMYYYY(formData.flightDate);

    try {
      // Check if vouchers exist
      const checkResponse = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightNumber: formData.flightNumber,
          date: apiDate,
        }),
      });

      if (!checkResponse.ok) {
        throw new Error('Failed to check existing vouchers');
      }

      const checkData = await checkResponse.json();

      // If vouchers already exist, show error and stop
      if (checkData.exists) {
        setError('Vouchers have already been generated for this flight and date. Please choose a different flight or date.');
        setLoading(false);
        return;
      }

      // Vouchers don't exist, proceed to generate
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.crewNames.join(', '),
          id: formData.crewIds.join(', '),
          flightNumber: formData.flightNumber,
          date: apiDate,
          aircraft: formData.aircraftType,
          departure: formData.departure,
          arrival: formData.arrival,
        }),
      });

      if (!generateResponse.ok) {
        throw new Error('Failed to generate vouchers');
      }

      const generateData = await generateResponse.json();

      if (generateData.success) {
        // Display the randomly chosen seat numbers
        setSeats(generateData.seats);
        setSuccess(true);
      } else {
        setError(generateData.message || 'Failed to generate vouchers');
      }
    } catch (err) {
      setError('An error occurred while processing your request');
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
          {/* Crew Name */}
          <div ref={crewNameRef} className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">Crew Name</label>
            <input
              type="text"
              value={crewNameInput}
              onChange={(e) => {
                setCrewNameInput(e.target.value);
                setShowCrewNameHelper(true);
              }}
              onFocus={() => setShowCrewNameHelper(true)}
              placeholder="Type to search crew..."
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {showCrewNameHelper && filteredCrewNames.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                {filteredCrewNames.map(crew => (
                  <button
                    key={crew.id}
                    type="button"
                    onClick={() => addCrewByName(crew.name || '')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b last:border-b-0"
                  >
                    <span className="font-medium">{crew.name}</span>
                    <span className="text-gray-500 text-sm ml-2">({crew.email})</span>
                  </button>
                ))}
              </div>
            )}
            {formData.crewNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.crewNames.map((name, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {name}
                    <button
                      type="button"
                      onClick={() => removeCrew(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Crew ID */}
          <div ref={crewIdRef} className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-700">Crew ID</label>
            <input
              type="text"
              value={crewIdInput}
              onChange={(e) => {
                setCrewIdInput(e.target.value);
                setShowCrewIdHelper(true);
              }}
              onFocus={() => setShowCrewIdHelper(true)}
              placeholder="Type to search crew ID..."
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {showCrewIdHelper && filteredCrewIds.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                {filteredCrewIds.map(crew => (
                  <button
                    key={crew.id}
                    type="button"
                    onClick={() => addCrewById(crew.id)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b last:border-b-0"
                  >
                    <span className="font-medium">{crew.id}</span>
                    <span className="text-gray-500 text-sm ml-2">({crew.name})</span>
                  </button>
                ))}
              </div>
            )}
            {formData.crewIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.crewIds.map((id, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {id}
                    <button
                      type="button"
                      onClick={() => removeCrew(index)}
                      className="text-green-500 hover:text-green-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
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
              <option value="ATR">ATR</option>
              <option value="Airbus 320">Airbus 320</option>
              <option value="Boeing 737 Max">Boeing 737 Max</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Departure</label>
            <input
              type="text"
              name="departure"
              value={formData.departure}
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Arrival</label>
            <input
              type="text"
              name="arrival"
              value={formData.arrival}
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              readOnly
            />
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
            disabled={loading || formData.crewNames.length === 0 || formData.crewIds.length === 0}
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
  isVoucherWinner?: boolean;
}

interface VoucherWinner {
  seats: string[];
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
  voucherWinners?: VoucherWinner[];
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
          // Pre-select voucher winner seats (they are available)
          const voucherSeats = data.flight.seats
            .filter((s: Seat) => s.isVoucherWinner)
            .map((s: Seat) => s.id);
          setSelectedSeats(voucherSeats);
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
    const isNoFlightSelected = error === 'No flight selected';
    
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          {/* Icon */}
          <div className="mb-6">
            {isNoFlightSelected ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-red-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {isNoFlightSelected ? 'No Flight Selected' : 'Flight Not Found'}
          </h2>
          
          {/* Description */}
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {isNoFlightSelected 
              ? 'Please select a flight from the available flights page to view seat assignment.'
              : error || 'The flight you are looking for could not be found.'}
          </p>
          
          {/* Action Button */}
          <Link
            to="/available-flight"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            {isNoFlightSelected ? 'Browse Available Flights' : 'Go to Flights'}
          </Link>
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
              className={`px-6 py-2 rounded-lg font-semibold transition-colors shadow-md whitespace-nowrap ${
                flight.voucherWinners && flight.voucherWinners.length > 0
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {flight.voucherWinners && flight.voucherWinners.length > 0 ? 'Vouchers Created' : 'Generate Vouchers'}
            </button>
          </div>
        </div>

        {/* Voucher Winners Display */}
        {flight.voucherWinners && flight.voucherWinners.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-red-800 mb-3">🎉 Voucher Winners</h2>
            <div className="flex flex-wrap gap-3">
              {flight.voucherWinners.flatMap((winner, index) => 
                winner.seats.map((seat, seatIndex) => (
                  <span 
                    key={`${index}-${seatIndex}`} 
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium border border-red-300"
                  >
                    Seat {seat}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Seat Legend */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 border-2 border-gray-300 rounded"></div>
              <span className="text-gray-600">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 border-2 border-red-400 rounded"></div>
              <span className="text-gray-600 font-medium">Voucher Winner</span>
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
                    const isVoucherWinner = seat.isVoucherWinner;
                    const isOccupied = !seat.isAvailable;
                    
                    // Default: all seats are occupied (gray)
                    // Voucher winner seats are marked in red
                    let seatClass = 'bg-gray-100 border-gray-300 cursor-not-allowed ';
                    if (isVoucherWinner) seatClass = 'bg-red-100 border-red-400 ';
                    if (isVoucherWinner) seatClass = 'bg-red-100 hover:bg-red-200 border-red-400 ';

                    return (
                      <div
                        key={seat.id}
                        className={`w-10 h-10 rounded-md border-2 flex items-center justify-center text-sm font-medium ${seatClass}`}
                        title={isVoucherWinner ? `Voucher Winner - ${seat.seatNumber}` : seat.seatNumber}
                      >
                        {seat.seatNumber.replace(/\d/g, '')}
                      </div>
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
