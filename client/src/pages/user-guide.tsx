import { useEffect, useState } from 'react';

interface Crew {
  id: string;
  name: string | null;
  email: string;
}

export default function UserGuidePage() {
  const [isAuthorized, setIsAuthorized] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">User Guide</h1>
        
        <div className="space-y-8">
          {/* Flights Section */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-3 text-indigo-700">1. Flights</h2>
            <p className="text-gray-600 mb-3">
              The Flights page displays all available flights. You can view flight details including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Flight number</li>
              <li>Departure and arrival airports</li>
              <li>Flight date</li>
              <li>Aircraft type and seat configuration</li>
            </ul>
          </section>

          {/* Seat Assignment Section */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-3 text-indigo-700">2. Seat Assignment</h2>
            <p className="text-gray-600 mb-3">
              The Seat Assignment page allows you to view and manage seat assignments for each flight.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>View all seats in the aircraft layout</li>
              <li>Gray seats are occupied</li>
              <li>Red seats indicate Voucher Winners (lucky seats)</li>
              <li>Click on a flight to view its seat map</li>
            </ul>
          </section>

          {/* Voucher Generator Section */}
          <section className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-3 text-indigo-700">3. Voucher Generator</h2>
            <p className="text-gray-600 mb-3">
              The Voucher Generator allows you to create vouchers with randomly selected seats for a flight.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Select a flight and date</li>
              <li>Choose crew members who are generating the vouchers</li>
              <li>The system randomly selects 3 seats as voucher winners</li>
              <li>Each voucher is assigned to 3 lucky passengers</li>
              <li>Vouchers can only be generated once per flight</li>
            </ul>
          </section>

          {/* How Vouchers Work Section */}
          <section>
            <h2 className="text-xl font-semibold mb-3 text-indigo-700">4. How Vouchers Work</h2>
            <p className="text-gray-600 mb-3">
              Vouchers are randomly generated seat assignments for flights. Here's how it works:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4">
              <li>A crew member generates vouchers for a specific flight and date</li>
              <li>The system randomly selects 3 unique seats from the aircraft</li>
              <li>These seats are marked as "Voucher Winners" on the Seat Assignment page</li>
              <li>Once generated, vouchers cannot be regenerated for the same flight and date</li>
              <li>The voucher winners are displayed in red on the seat map</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
