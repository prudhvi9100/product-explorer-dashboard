import StatCard from "./stat-card"

interface Stats {
  totalRuns: number
  totalImported: number
  totalFailed: number
  latestStatus: string
}

export default function SummaryCards({ stats }: { stats: Stats }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Import Runs" value={stats.totalRuns} description="Completed import operations" />
      <StatCard label="Total Jobs Imported" value={stats.totalImported} description="Across all import runs" />
      <StatCard label="Total Failed Jobs" value={stats.totalFailed} description="Failed during import" />
      <StatCard
        label="Latest Import Status"
        value={stats.latestStatus.charAt(0).toUpperCase() + stats.latestStatus.slice(1)}
        description="Most recent import result"
      />
    </div>
  )
}
