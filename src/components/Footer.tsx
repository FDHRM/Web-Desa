export default function Footer({
  namaDesa,
  alamat,
}: {
  namaDesa: string;
  alamat: string;
}) {
  return (
    <footer className="mt-20 border-t border-navy-700/10 bg-navy-700 text-kertas">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm">
        <p className="font-display text-lg">{namaDesa}</p>
        <p className="mt-1 text-kertas/80">{alamat}</p>
        <p className="mt-6 text-xs text-kertas/60">
          &copy; {new Date().getFullYear()} {namaDesa}. Situs ini dikelola oleh perangkat desa.
        </p>
      </div>
    </footer>
  );
}
