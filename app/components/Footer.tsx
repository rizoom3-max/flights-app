export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Авиабилеты. Учебный проект.</p>
      </div>
    </footer>
  );
}