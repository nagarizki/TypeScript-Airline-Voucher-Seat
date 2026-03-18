import { Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

export default function Header() {
  const [crew, setCrew] = useState<any>(null);

  useEffect(() => {
    const crewStr = localStorage.getItem('crew');
    if (crewStr) {
      setCrew(JSON.parse(crewStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('crew');
    window.location.href = '/';
  };

  return (
    <header className="bg-gray-200 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Airline Voucher Seat
        </Link>
        {crew && (
          <div className="flex items-center space-x-4">
            <span>Logged in as {crew.name}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-2 py-1 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}