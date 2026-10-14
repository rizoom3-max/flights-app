import AddToCartButton from './AddToCartButton';
import type { Flight } from '../types/flight';
import Link from 'next/link';

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export default function FlightCard({ flight }: { flight: Flight }) {
  return (
    <div className="rounded-lg border bg-white p-4 transition hover:shadow-md">
      <div className="grid grid-cols-3 items-center gap-4">
        {/* Колонка 1: авиакомпания и время вылета */}
        <div>
          <div className="text-sm font-medium text-gray-700">
            {flight.airline}
          </div>
          <div className="text-2xl font-bold">{flight.departure}</div>
          <div className="text-xs text-gray-500">
            {flight.isDirect ? (
              <span className="text-green-600">прямой</span>
            ) : (
              <span className="text-yellow-600">с пересадкой</span>
            )}
          </div>
        </div>
            
        {/* Колонка 2: маршрут откуда и куда */}
        <div className="text-center">
          <Link href={`/flights/${flight.id}`}>
          <div className="text-lg font-semibold">
            {flight.from} → {flight.to}
          </div>
          </Link>
          <div className="text-xs text-gray-500">прилёт в {flight.arrival}</div>
        </div>
            
        {/* Колонка 3: цена и кнопка */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-xl font-bold text-blue-600">
            {formatPrice(flight.price)}
          </div>
          <AddToCartButton flight={flight} />
        </div>
      </div>
    </div>
  );
}