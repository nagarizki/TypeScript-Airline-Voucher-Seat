import { Link } from '@tanstack/react-router';

export default function Nav() {
  return (
    <nav className="w-48 bg-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/seat-assignment" className="block p-2 hover:bg-gray-200">
            Seat Assignment
          </Link>
        </li>
      </ul>
    </nav>
  );
}