export const instant = false;
import Link from 'next/link';
import { Suspense } from 'react';
import { getFlights } from './lib/api';
import FlightFilters from './components/FlightFilters';

// Компонент, который грузит данные
async function FlightsSection() {
  const flights = await getFlights();
  return <FlightFilters flights={flights} />;
}

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold">Доступные рейсы</h1>
      <div className="mt-6">
        <Suspense fallback={<p className="text-gray-500">Загрузка рейсов...</p>}>
          <FlightsSection />
        </Suspense>
      </div>
    </div>
  );
}