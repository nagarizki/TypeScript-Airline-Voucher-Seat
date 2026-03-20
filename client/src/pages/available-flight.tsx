import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

interface Flight {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
  flightCrew: Array<{
    crew: {
      name: string | null;
      email: string | null;
    };
  }>;
  flightAircraftType: Array<{
    aircraftType: {
      name: string;
      seatNumber: number;
    };
  }>;
  hasVouchers?: boolean;
}

interface AircraftType {
  id: string;
  name: string;
  seatNumber: number;
  seatType: string;
}

interface Crew {
  id: string;
  name: string | null;
  email: string | null;
}

interface AddFlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function AddFlightModal({ isOpen, onClose, onSuccess }: AddFlightModalProps) {
  const [aircraftTypes, setAircraftTypes] = useState<AircraftType[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    flightNumber: '',
    departure: '',
    arrival: '',
    date: '',
    aircraftTypeId: '',
    crewIds: [] as string[],
  });

  useEffect(() => {
    if (isOpen) {
      Promise.all([
        fetch('/api/aircraft-types').then(res => res.json()),
        fetch('/api/crew').then(res => res.json()),
      ]).then(([aircraftData, crewData]) => {
        if (aircraftData.success) {
          setAircraftTypes(aircraftData.aircraftTypes);
          if (aircraftData.aircraftTypes.length > 0) {
            setFormData(prev => ({ ...prev, aircraftTypeId: aircraftData.aircraftTypes[0].id }));
          }
        }
        if (crewData.success) {
          setCrew(crewData.crew);
        }
      }).catch(err => {
        console.error('Error fetching data:', err);
      });
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCrewToggle = (crewId: string) => {
    setFormData(prev => {
      const newCrewIds = prev.crewIds.includes(crewId)
        ? prev.crewIds.filter(id => id !== crewId)
        : [...prev.crewIds, crewId];
      return { ...prev, crewIds: newCrewIds };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        onClose();
        // Reset form
        setFormData({
          flightNumber: '',
          departure: '',
          arrival: '',
          date: '',
          aircraftTypeId: aircraftTypes[0]?.id || '',
          crewIds: [],
        });
      } else {
        setFormError(data.message || 'Failed to create flight');
      }
    } catch (err) {
      console.error('Error creating flight:', err);
      setFormError('Failed to connect to server');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add New Flight</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {formError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Flight Number *
              </label>
              <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleInputChange}
                required
                placeholder="e.g., GA123"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure *
                </label>
                <input
                  type="text"
                  name="departure"
                  value={formData.departure}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., CGK"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arrival *
                </label>
                <input
                  type="text"
                  name="arrival"
                  value={formData.arrival}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., HND"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aircraft Type
              </label>
              <select
                name="aircraftTypeId"
                value={formData.aircraftTypeId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {aircraftTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.seatNumber} seats)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crew Members
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {crew.map(c => (
                  <label
                    key={c.id}
                    className={`flex items-center p-2 rounded-lg border cursor-pointer transition-colors ${
                      formData.crewIds.includes(c.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.crewIds.includes(c.id)}
                      onChange={() => handleCrewToggle(c.id)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{c.name || c.email}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Flight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AvailableFlightPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const crew = localStorage.getItem('crew');
    if (!crew) {
      window.location.href = '/';
      return;
    }
    setIsAuthorized(true);

    // Fetch flights from API
    fetch('/api/flights')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFlights(data.flights);
        } else {
          setError('Failed to load flights');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching flights:', err);
        setError('Failed to connect to server');
        setLoading(false);
      });
  }, []);

  const refreshFlights = () => {
    fetch('/api/flights')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFlights(data.flights);
        }
      })
      .catch(err => {
        console.error('Error refreshing flights:', err);
      });
  };

  if (!isAuthorized) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full min-h-screen">
      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Flights</h1>
            <p className="text-lg text-gray-600">View and manage flights</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Flight
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-xl text-gray-500">Loading flights...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-xl text-red-500">{error}</div>
          </div>
        )}

        {!loading && !error && flights.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-xl text-gray-500">No flights available</div>
          </div>
        )}

        {!loading && !error && flights.length > 0 && (
          <div className="flex flex-col gap-5">
            {flights.map((flight) => (
              <div 
                key={flight.id} 
                className="flight-card bg-white rounded-xl border border-blue-300 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">
                        {flight.flightNumber.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{flight.flightNumber}</p>
                      <p className="text-sm text-gray-500">
                        {flight.flightAircraftType[0]?.aircraftType.name || 'N/A'} 
                        {' • '} 
                        {flight.flightAircraftType[0]?.aircraftType.seatNumber || 0} seats
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500">{formatDate(flight.date)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold">{flight.departure}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-semibold">{flight.arrival}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Crew: {flight.flightCrew?.[0]?.crew?.name || 'Unassigned'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {flight.hasVouchers ? (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        Vouchers Created
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Vouchers Available
                      </span>
                    )}
                    <Link
                      to="/seat-assignment"
                      search={{ flight: flight.flightNumber, date: flight.date }}
                      className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                    >
                      Manage Seats
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Flight Modal */}
      <AddFlightModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={refreshFlights}
      />
    </div>
  );
}
