export default function Footer() {
  return (
    <footer className="border-t bg-black">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-white">
        <p>© {new Date().getFullYear()} Авиабилеты.</p>
      </div>
    </footer>
  );
}