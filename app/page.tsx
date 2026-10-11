import Link from 'next/link';
import { getFlights } from './lib/api';
import FlightCard from './components/FlightCard';

export default async function Home() {
  const flights = await getFlights();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold">Доступные рейсы</h1>

      <Link
        href="/search"
        className="mt-2 inline-block text-blue-600 shadow hover:shadow-md bg-white p-3 rounded-2xl"
      >
        → Перейти к поиску
      </Link>

      <div className="mt-6 flex flex-col gap-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
}