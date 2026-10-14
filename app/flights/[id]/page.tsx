export const instant = false;
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../components/AddToCartButton';
import { getFlightById } from '../../lib/api';
  
function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export default async function FlightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const flight = await getFlightById(Number(id));
  

  if (!flight) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl p-8 ">
      <Link href="/" className="text-sm text-blue-600 shadow hover:shadow-md bg-white p-3 rounded-2xl">
        ← Назад к списку
      </Link>

      <div className="mt-4 rounded-lg  bg-white p-6 shadow" >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">{flight.airline}</div>
            <div className="text-2xl font-bold">
              {flight.from} → {flight.to}
            </div>
            <div className="text-sm text-gray-500">Рейс #{flight.id}</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(flight.price)}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {flight.isDirect ? (
            <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
              Прямой рейс
            </span>
          ) : (
            <span className="rounded bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
              С пересадкой
            </span>
          )}
          <div className="">
           <AddToCartButton flight={flight} />
         </div>          
        </div>
        
      </div>
    </div>
  );
}