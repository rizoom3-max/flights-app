import Link from 'next/link';
import type { Flight } from '../types/flight';

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export default function FlightCard({ flight }: { flight: Flight }) {
  return (
    <Link
      href={`/flights/${flight.id}`}
      className="block rounded-lg shadow bg-white p-4 transition hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-black">
            {flight.from} → {flight.to}
          </span>
          {flight.isDirect ? (
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
              прямой
            </span>
          ) : (
            <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
              с пересадкой
            </span>
          )}
        </div>

        <div className="text-lg font-bold text-blue-600">
          {formatPrice(flight.price)}
        </div>
      </div>
    </Link>
  );
}