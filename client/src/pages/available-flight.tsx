import { useEffect } from 'react';

export default function AvailableFlightPage() {
  useEffect(() => {
    const crew = localStorage.getItem('crew');
    if (!crew) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Flights</h1>
      <p className="mb-4">List of available flights.</p>
    </div>
  );
}