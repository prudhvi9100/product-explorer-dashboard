export default function StatCard({
  label,
  value,
  description,
}: {
  label: string
  value: string | number
  description: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
