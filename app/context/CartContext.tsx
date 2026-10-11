'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Flight } from '../types/flight';

type CartContextValue = {
  items: Flight[];
  addItem: (flight: Flight) => void;
  removeItem: (id: number) => void;
  clear: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Flight[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // 1. При первом рендере — читаем localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // если данные битые — игнорируем
    }
    setHydrated(true);
  }, []);

  // 2. При любом изменении items — пишем в localStorage
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(flight: Flight) {
    setItems((prev) => {
      // если уже есть — не добавляем
      if (prev.some((f) => f.id === flight.id)) return prev;
      return [...prev, flight];
    });
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((f) => f.id !== id));
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce((sum, f) => sum + f.price, 0);
  const count = items.length;

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clear, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}