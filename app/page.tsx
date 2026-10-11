import { getFlights } from './lib/api';
import FlightFilters from './components/FlightFilters';

export default async function Home() {
  const flights = await getFlights();

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold">Доступные рейсы</h1>
      <div className="mt-6">
        <FlightFilters flights={flights} />
      </div>
    </div>
  );
}