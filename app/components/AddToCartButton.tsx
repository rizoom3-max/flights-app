'use client';

import { useState } from 'react';
import type { Flight } from '../types/flight';
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ flight }: { flight: Flight }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = items.some((f) => f.id === flight.id);

  function handleClick() {
    if (inCart) return;
    addItem(flight);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  }

  if (inCart) {
    return (
      <span className="rounded bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
        ✓ В корзине
      </span>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded px-4 py-1.5 text-sm font-medium text-white transition ${
        added ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {added ? '✓ Добавлено' : 'В корзину'}
    </button>
  );
}