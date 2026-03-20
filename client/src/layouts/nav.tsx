import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

interface Crew {
  id: number;
  email: string;
  name: string;
}

export default function Nav() {
  const [crew, setCrew] = useState<Crew | null>(null);
  const location = useLocation();
  
  const isHomeActive = location.pathname === '/';
  const isFlightsActive = location.pathname === '/flights';
  const isSeatAssignmentActive = location.pathname === '/seat-assignment';
  const isVoucherActive = location.pathname === '/voucher-generator';
  const isUserGuideActive = location.pathname === '/user-guide';

  useEffect(() => {
    const storedCrew = localStorage.getItem('crew');
    if (storedCrew) {
      setCrew(JSON.parse(storedCrew));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('crew');
    setCrew(null);
    window.location.href = '/';
  };

  return (
    /* Nav */
    <nav className="relative flex justify-center px-[75px] mt-10">
      <div className="flex items-center w-full max-w-[1130px] rounded-[20px] justify-between py-4 px-5 bg-white shadow-md">
        <Link to="/">
          <img src="assets/images/logos/logo.png" className="flex shrink-0 h-10" alt="logo" />
        </Link>
        <ul className="flex items-center gap-[30px] flex-wrap">
          <li>
            <Link to="/" className={`hover:font-bold transition-all duration-300 ${isHomeActive ? 'font-bold' : ''}`}>Home</Link>
          </li>
          <li>
            <Link to="/flights" className={`hover:font-bold transition-all duration-300 ${isFlightsActive ? 'font-bold' : ''}`}>Flights</Link>
          </li>
          <li>
            <Link to="/seat-assignment" className={`hover:font-bold transition-all duration-300 ${isSeatAssignmentActive ? 'font-bold' : ''}`}>Seat Assignment</Link>
          </li>
          <li>
            <Link to="/voucher-generator" className={`hover:font-bold transition-all duration-300 ${isVoucherActive ? 'font-bold' : ''}`}>Voucher Generator</Link>
          </li>
          <li>
            <Link to="/user-guide" className={`hover:font-bold transition-all duration-300 ${isUserGuideActive ? 'font-bold' : ''}`}>User Guide</Link>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          {crew && (
            <button 
              onClick={handleLogout}
              className="flex items-center rounded-full border border-garuda-black py-3 px-5 gap-[10px] hover:bg-gray-100 transition-all duration-300"
            >
              <span className="font-semibold">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
