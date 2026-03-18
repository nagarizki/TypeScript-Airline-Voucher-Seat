import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="bg-gray-200 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Airline Voucher Seat
        </Link>
      </div>
    </header>
  );
}