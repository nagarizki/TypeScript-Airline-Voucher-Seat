import { useEffect } from 'react';

export default function SeatListPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Airplane Voucher Seat List</h1>
      <p className="mb-4">This is the index page content.</p>
    </div>
  );
}