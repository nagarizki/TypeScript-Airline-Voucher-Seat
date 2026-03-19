import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';

interface Crew {
  id: number;
  email: string;
  name: string;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [crew, setCrew] = useState<Crew | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if crew is already logged in
    const storedCrew = localStorage.getItem('crew');
    if (storedCrew) {
      setCrew(JSON.parse(storedCrew));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const hashedPassword = await hashPassword(password);

      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: hashedPassword }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('crew', JSON.stringify(data.crew));
        setCrew(data.crew);
        window.location.href = '/available-flight';
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // If crew is logged in, show the home page with greeting and promotional content
  if (crew) {
    return (
      <>
        {/* Hero Text with Greeting */}
        <div id="Hero-Text" className="relative flex flex-col w-full max-w-[1280px] px-[75px] mx-auto gap-[30px] mt-16">
          <h1 className="font-extrabold text-[50px] leading-[75px]">
            Hello, {crew.name}! <br />Explore Magical <br />Wonderful Worlds
          </h1>
          <p className="text-lg leading-8">
            Your truly great experience starts here with us <br />that lorem dolor amet si package exclusively matter.
          </p>
        </div>

        {/* Quick Actions - Available when logged in */}
        <div className="relative flex flex-col w-full max-w-[1280px] px-[75px] mx-auto mt-16 pb-16">
          <div className="flex flex-col rounded-[30px] p-[30px] gap-4 bg-white">
            <h2 className="font-bold text-xl leading-[30px]">Quick Actions</h2>
            <div className="flex items-center gap-5">
              <Link
                to="/available-flight"
                className="flex items-center rounded-[20px] border border-[#E8EFF7] p-5 gap-4 hover:bg-garuda-bg-grey transition-all duration-300"
              >
                <img src="assets/images/icons/departure.svg" className="w-[50px] flex shrink-0" alt="icon" />
                <div className="text-left">
                  <p className="font-semibold text-lg">Available Flights</p>
                  <p className="text-sm text-garuda-grey">View and manage flights</p>
                </div>
              </Link>
              <Link
                to="/seat-assignment"
                className="flex items-center rounded-[20px] border border-[#E8EFF7] p-5 gap-4 hover:bg-garuda-bg-grey transition-all duration-300"
              >
                <img src="assets/images/icons/seat.svg" className="w-[50px] flex shrink-0" alt="icon" />
                <div className="text-left">
                  <p className="font-semibold text-lg">Seat Assignment</p>
                  <p className="text-sm text-garuda-grey">Assign seats to passengers</p>
                </div>
              </Link>
              <Link
                to="/voucher-generator"
                className="flex items-center rounded-[20px] border border-[#E8EFF7] p-5 gap-4 hover:bg-garuda-bg-grey transition-all duration-300"
              >
                <img src="assets/images/icons/note-add-black.svg" className="w-[50px] flex shrink-0" alt="icon" />
                <div className="text-left">
                  <p className="font-semibold text-lg">Voucher Generator</p>
                  <p className="text-sm text-garuda-grey">Generate flight vouchers</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If not logged in, show login form
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Crew Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
