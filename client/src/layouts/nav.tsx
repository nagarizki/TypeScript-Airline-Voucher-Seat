import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const crew = localStorage.getItem('crew');
    setIsLoggedIn(!!crew);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('crew');
    window.location.href = '/';
  };

  return (
    <nav className="w-48 bg-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-200">
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/available-flight" className="block p-2 hover:bg-gray-200">
                Available Flights
              </Link>
            </li>
            <li>
              <Link to="/seat-assignment" className="block p-2 hover:bg-gray-200">
                Seat Assignment
              </Link>
            </li>
            <li>
              <Link to="/voucher-generator" className="block p-2 hover:bg-gray-200">
                Voucher Generator
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}