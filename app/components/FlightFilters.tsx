'use client';

import { useState } from 'react';
import type { Flight } from '../types/flight';
import FlightCard from './FlightCard';

type SortOption = 'cheap' | 'expensive' | 'popular';

export default function FlightFilters({ flights }: { flights: Flight[] }) {
  const [query, setQuery] = useState('');
  const [directOnly, setDirectOnly] = useState<'all' | 'direct' | 'transfer'>('all');
  const [sort, setSort] = useState<SortOption>('cheap');

  const filtered = flights
    .filter((f) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return f.to.toLowerCase().includes(q);
    })
    .filter((f) => {
      if (directOnly === 'all') return true;
      if (directOnly === 'direct') return f.isDirect;
      return !f.isDirect;
    })
    .sort((a, b) => {
      if (sort === 'cheap') return a.price - b.price;
      if (sort === 'expensive') return b.price - a.price;
      return b.bookings - a.bookings; // popular — по убыванию бронирований
    });

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-lg border bg-white p-4">
        <input
          type="text"
          placeholder="Поиск по городу прибытия..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded border px-3 py-2"
        />

        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setDirectOnly('all')}
              className={`rounded px-3 py-1 text-sm ${
                directOnly === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setDirectOnly('direct')}
              className={`rounded px-3 py-1 text-sm ${
                directOnly === 'direct'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              Прямые
            </button>
            <button
              onClick={() => setDirectOnly('transfer')}
              className={`rounded px-3 py-1 text-sm ${
                directOnly === 'transfer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              С пересадкой
            </button>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded border px-3 py-1 text-sm"
          >
            <option value="cheap">Сначала дешёвые</option>
            <option value="expensive">Сначала дорогие</option>
            <option value="popular">По популярности</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500">Ничего не найдено</p>
        ) : (
          filtered.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))
        )}
      </div>
    </div>
  );
}