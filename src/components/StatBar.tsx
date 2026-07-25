type Row = { label: string; jumlah: number };

export default function StatBar({ title, rows }: { title: string; rows: Row[] }) {
  const total = rows.reduce((sum, r) => sum + r.jumlah, 0) || 1;

  return (
    <div className="rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-4 space-y-3">
        {rows.map((row) => {
          const persen = (row.jumlah / total) * 100;
          return (
            <div key={row.label}>
              <div className="mb-1 flex justify-between text-xs text-ink/70">
                <span>{row.label}</span>
                <span className="font-mono">
                  {row.jumlah.toLocaleString("id-ID")}{" "}
                  <span className="text-ink/40">({persen.toFixed(1)}%)</span>
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-navy-100">
                <div
                  className="h-full rounded-full bg-moss-500"
                  style={{ width: `${persen}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
