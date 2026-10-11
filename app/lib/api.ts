import type { Flight } from '../types/flight';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function getFlights(): Promise<Flight[]> {
  const res = await fetch(`${API_URL}/flights`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Не удалось загрузить рейсы');
  }

  return res.json();
}

export async function getFlightById(id: number): Promise<Flight | null> {
  const res = await fetch(`${API_URL}/flights/${id}`, {
    cache: 'no-store',
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Ошибка загрузки рейса');

  return res.json();
}