'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

export default function CartPage() {
  const { items, removeItem, total, clear } = useCart();

  function handleCheckout() {
    if (items.length === 0) return;
    alert('Заказ оформлен! Спасибо за покупку.');
    clear();
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl p-8 text-center">
        <h1 className="text-2xl font-bold">Корзина пуста</h1>
        <p className="mt-2 text-gray-500">
          Добавьте рейсы, чтобы оформить заказ
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          К рейсам
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">Корзина</h1>

      <div className="mt-6 flex flex-col gap-3">
        {items.map((flight) => (
          <div
            key={flight.id}
            className="flex items-center justify-between rounded-lg border bg-white p-4"
          >
            <div>
              <div className="font-semibold">
                {flight.from} → {flight.to}
              </div>
              <div className="text-sm text-gray-500">
                {flight.airline} · {flight.departure}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-bold text-blue-600">
                {formatPrice(flight.price)}
              </div>
              <button
                onClick={() => removeItem(flight.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
        <div className="text-lg font-semibold">Итого:</div>
        <div className="text-2xl font-bold text-blue-600">
          {formatPrice(total)}
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-4 w-full rounded bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Оформить заказ
      </button>
    </div>
  );
}