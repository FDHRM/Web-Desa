type Row = { label: string; jumlah: number };

export default function StatBar({ title, rows }: { title: string; rows: Row[] }) {
  const max = Math.max(1, ...rows.map((r) => r.jumlah));

  return (
    <div className="rounded-lg border border-navy-700/10 bg-white p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="mb-1 flex justify-between text-xs text-ink/70">
              <span>{row.label}</span>
              <span className="font-mono">{row.jumlah.toLocaleString("id-ID")}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-navy-100">
              <div
                className="h-full rounded-full bg-moss-500"
                style={{ width: `${(row.jumlah / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
