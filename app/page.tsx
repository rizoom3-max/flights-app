import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold ">Поиск авиабилетов</h1>
      <Link
        href="/search"
        className="m-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
      >
        Найти билеты
      </Link>
    </main>
  );
}