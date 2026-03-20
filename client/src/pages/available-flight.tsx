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

export default function AvailableFlightPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <main className="relative max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Flights</h1>
        <p className="text-lg text-gray-600 mb-8">View and manage flights</p>

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
    </div>
  );
}
