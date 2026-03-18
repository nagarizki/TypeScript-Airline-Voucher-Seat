import { useEffect } from 'react';

export default function SeatAssignmentPage() {
  useEffect(() => {
    const crew = localStorage.getItem('crew');
    if (!crew) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Seat Assignment</h1>
      <p className="mb-4">Select your preferred seat for the flight.</p>
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 30 }, (_, i) => (
          <button
            key={i}
            className="p-2 border border-gray-300 hover:bg-blue-100"
          >
            {String.fromCharCode(65 + Math.floor(i / 6))}{i % 6 + 1}
          </button>
        ))}
      </div>
    </div>
  );
}