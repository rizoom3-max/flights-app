import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          ✈️ Авиабилеты
        </Link>

        <nav className="flex gap-6 text-sm">
          <Link href="/" className="text-black font-bold hover:text-blue-600">
            Главная
          </Link>
          <Link href="/search" className="text-black font-bold hover:text-blue-600">
            Поиск
          </Link>
          <Link href="/flights/SU123" className="text-black font-bold hover:text-blue-600">
            Пример рейса
          </Link>
        </nav>
      </div>
    </header>
  );
}