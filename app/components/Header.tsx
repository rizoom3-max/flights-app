'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { count } = useCart();
  const [animate, setAnimate] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <header className="border-b bg-blue-600">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-white">
          ✈️ Авиабилеты
        </Link>

        <Link
          href="/cart"
          className="relative rounded p-2 bg-gray-200"
          aria-label="Корзина"
        >
          <span className="text-2xl">🛒</span>
          {count > 0 && (
            <span
              className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black ${
                animate ? 'animate-pop' : ''
              }`}
            >
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}