import { useState, useEffect, useRef } from 'react';

interface Crew {
  id: string;
  name: string | null;
  email: string;
}

interface Flight {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
  flightCrew: Array<{
    crew: {
      id: string;
      name: string | null;
      email: string;
    };
  }>;
  flightAircraftType: Array<{
    aircraftType: {
      name: string;
    };
  }>;
}

const AIRPORT_CODES = [
  "CGK", "HND", "NRT", "KIX", "ITM", "FUK", "OKA", "CTS", "Sapporo", "HKG",
  "SIN", "KUL", "BKK", "MNL", "HAN", "SGN", "RGN", "MEL", "SYD", "BNE",
  "PER", "ADL", "AKL", "LHR", "CDG", "FRA", "AMS", "MAD", "BCN", "FCO",
  "DXB", "DOH", "IST", "JFK", "LAX", "SFO", "ORD", "MIA", "SEA", "BOS",
];

export default function VoucherPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formData, setFormData] = useState({
    crewNames: [] as string[],
    crewIds: [] as string[],
    flightNumber: '',
    flightDate: '',
    aircraftType: '',
    departure: '',
    arrival: '',
  });
  const [allCrew, setAllCrew] = useState<Crew[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [crewNameInput, setCrewNameInput] = useState('');
  const [crewIdInput, setCrewIdInput] = useState('');
  const [flightInput, setFlightInput] = useState('');
  const [showCrewNameHelper, setShowCrewNameHelper] = useState(false);
  const [showCrewIdHelper, setShowCrewIdHelper] = useState(false);
  const [showFlightHelper, setShowFlightHelper] = useState(false);
  const [isFromSeatAssignment, setIsFromSeatAssignment] = useState(false);
  const [seats, setSeats] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const crewNameRef = useRef<HTMLDivElement>(null);
  const crewIdRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const crew = localStorage.getItem('crew');
    if (!crew) {
      window.location.href = '/';
      return;
    }
    setIsAuthorized(true);

    // Check if opened from seat-assignment (via URL params)
    const params = new URLSearchParams(window.location.search);
    const flightNum = params.get('flight') || '';
    const flightDateParam = params.get('date') || '';

    // Convert DD-MM-YYYY to YYYY-MM-DD for HTML date input
    const convertToYYYYMMDD = (dateStr: string) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length === 3 && parts[0].length === 2) {
        // DD-MM-YYYY format
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return dateStr;
    };

    const flightDate = convertToYYYYMMDD(flightDateParam);

    if (flightNum && flightDate) {
      setIsFromSeatAssignment(true);
      setFormData(prev => ({
        ...prev,
        flightNumber: flightNum,
        flightDate: flightDate,
      }));
      setFlightInput(flightNum);

      // Fetch flight details from API to get crew and aircraft type
      fetch(`/api/flights/search?q=${encodeURIComponent(flightNum)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.flights.length > 0) {
            // Find flight that matches the date
            const targetDate = new Date(flightDate).toISOString().split('T')[0];
            const flight = data.flights.find((f: any) => 
              new Date(f.date).toISOString().split('T')[0] === targetDate
            ) || data.flights[0];
            
            const crewNames = flight.flightCrew
              ?.map((fc: any) => fc.crew?.name)
              .filter((name: any) => name !== null && name !== undefined) || [];
            const crewIds = flight.flightCrew
              ?.map((fc: any) => fc.crew?.id)
              .filter((id: any) => id !== undefined) || [];
            const aircraftType = flight.flightAircraftType?.[0]?.aircraftType?.name || '';
            const departure = flight.departure || '';
            const arrival = flight.arrival || '';

            setFormData(prev => ({
              ...prev,
              flightNumber: flightNum,
              flightDate: flightDate,
              crewNames: crewNames,
              crewIds: crewIds,
              aircraftType: aircraftType,
              departure: departure,
              arrival: arrival,
            }));
          }
        })
        .catch(err => console.error('Error fetching flight details:', err));
    }

    // Fetch all crew for helpers
    fetch('/api/crew')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAllCrew(data.crew);
        }
      })
      .catch(err => console.error('Error fetching crew:', err));
  }, []);

  // Close helpers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (crewNameRef.current && !crewNameRef.current.contains(event.target as Node)) {
        setShowCrewNameHelper(false);
      }
      if (crewIdRef.current && !crewIdRef.current.contains(event.target as Node)) {
        setShowCrewIdHelper(false);
      }
      if (flightRef.current && !flightRef.current.contains(event.target as Node)) {
        setShowFlightHelper(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  // Search flights
  const searchFlights = async (query: string) => {
    try {
      const url = query.length > 0 ? `/api/flights/search?q=${encodeURIComponent(query)}` : '/api/flights/search';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setFlights(data.flights);
      }
    } catch (err) {
      console.error('Error searching flights:', err);
    }
  };

  const handleFlightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFlightInput(value);
    setFormData(prev => ({ ...prev, flightNumber: value }));
    setShowFlightHelper(true);
    searchFlights(value);
  };

  const handleFlightSelect = (flight: Flight) => {
    // Extract crew names and IDs from flightCrew
    const crewNames = flight.flightCrew
      ?.map(fc => fc.crew?.name)
      .filter((name): name is string => name !== null && name !== undefined) || [];
    const crewIds = flight.flightCrew
      ?.map(fc => fc.crew?.id)
      .filter((id): id is string => id !== undefined) || [];

    // Extract aircraft type
    const aircraftType = flight.flightAircraftType?.[0]?.aircraftType?.name || '';

    setFlightInput(flight.flightNumber);
    setFormData(prev => ({
      ...prev,
      flightNumber: flight.flightNumber,
      flightDate: new Date(flight.date).toISOString().split('T')[0],
      crewNames: crewNames,
      crewIds: crewIds,
      aircraftType: aircraftType,
      departure: flight.departure || '',
      arrival: flight.arrival || '',
    }));
    setShowFlightHelper(false);
    setFlights([]);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSeats([]);
    setSuccess(false);

    // Join crew names and IDs with comma for API
    const crewNameStr = formData.crewNames.join(', ');
    const crewIdStr = formData.crewIds.join(', ');

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
          name: crewNameStr,
          id: crewIdStr,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Voucher Generator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crew Name */}
          <div ref={crewNameRef} className="relative">
            <label className="block text-sm font-medium mb-1">Crew Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={crewNameInput}
                onChange={(e) => {
                  setCrewNameInput(e.target.value);
                  setShowCrewNameHelper(true);
                }}
                onFocus={() => setShowCrewNameHelper(true)}
                placeholder="Type to search crew..."
                className="w-full p-2 border rounded"
              />
            </div>
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
            {/* Selected Crew Names */}
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
            <label className="block text-sm font-medium mb-1">Crew ID</label>
            <input
              type="text"
              value={crewIdInput}
              onChange={(e) => {
                setCrewIdInput(e.target.value);
                setShowCrewIdHelper(true);
              }}
              onFocus={() => setShowCrewIdHelper(true)}
              placeholder="Type to search crew ID..."
              className="w-full p-2 border rounded"
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
            {/* Selected Crew IDs */}
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
          
          {/* Flight Number */}
          <div ref={flightRef} className="relative">
            <label className="block text-sm font-medium mb-1">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={isFromSeatAssignment ? formData.flightNumber : flightInput}
              onChange={!isFromSeatAssignment ? handleFlightInputChange : handleChange}
              onFocus={() => {
                if (!isFromSeatAssignment) {
                  setShowFlightHelper(true);
                  // Load all flights if empty
                  if (flights.length === 0) {
                    searchFlights('');
                  }
                }
              }}
              placeholder={isFromSeatAssignment ? '' : "Click to see available flights..."}
              required
              readOnly={isFromSeatAssignment}
              className={`w-full p-2 border rounded ${isFromSeatAssignment ? 'bg-gray-100' : ''}`}
            />
            {!isFromSeatAssignment && showFlightHelper && (
              <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                {flights.length > 0 ? (
                  flights.map(flight => {
                    const crewNames = flight.flightCrew
                      ?.map(fc => fc.crew?.name)
                      .filter((name): name is string => name !== null && name !== undefined)
                      .join(', ') || 'No crew assigned';
                    const aircraftType = flight.flightAircraftType?.[0]?.aircraftType?.name || 'Unknown';
                    const departure = flight.departure || 'N/A';
                    const arrival = flight.arrival || 'N/A';
                    return (
                      <button
                        key={flight.id}
                        type="button"
                        onClick={() => handleFlightSelect(flight)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b last:border-b-0"
                      >
                        <span className="font-medium">{flight.flightNumber}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          {departure} → {arrival}
                        </span>
                        <span className="text-gray-400 text-sm ml-2">
                          {formatDate(flight.date)}
                        </span>
                        <span className="text-blue-600 text-sm ml-2">
                          {aircraftType}
                        </span>
                        <span className="text-gray-500 text-sm ml-2 block">
                          Crew: {crewNames}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-sm">
                    No flights found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Flight Date */}
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

          {/* Departure */}
          <div>
            <label className="block text-sm font-medium mb-1">Departure Airport</label>
            <select
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              required
              disabled={isFromSeatAssignment}
              className={`w-full p-2 border rounded ${isFromSeatAssignment ? 'bg-gray-100' : ''}`}
            >
              <option value="">Select Departure</option>
              {AIRPORT_CODES.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
          </div>

          {/* Arrival */}
          <div>
            <label className="block text-sm font-medium mb-1">Arrival Airport</label>
            <select
              name="arrival"
              value={formData.arrival}
              onChange={handleChange}
              required
              disabled={isFromSeatAssignment}
              className={`w-full p-2 border rounded ${isFromSeatAssignment ? 'bg-gray-100' : ''}`}
            >
              <option value="">Select Arrival</option>
              {AIRPORT_CODES.map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>
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
              <option value="ATR">ATR</option>
              <option value="Airbus 320">Airbus 320</option>
              <option value="Boeing 737 Max">Boeing 737 Max</option>
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
            disabled={loading || formData.crewNames.length === 0 || formData.crewIds.length === 0}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Vouchers'}
          </button>
        </form>
      </div>
    </div>
  );
}
