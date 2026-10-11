import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b bg-blue-600">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-white">
          ✈️ Авиабилеты
        </Link>

        <nav className="flex gap-6 text-sm">
          тут будет корзина позже
        </nav>
      </div>
    </header>
  );
}