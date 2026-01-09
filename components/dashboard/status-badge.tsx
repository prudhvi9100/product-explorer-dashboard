export default function StatusBadge({ status }: { status: "success" | "partial" | "failed" }) {
  const statusConfig = {
    success: {
      bg: "bg-green-500/20",
      text: "text-green-700 dark:text-green-400",
      label: "Success",
    },
    partial: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-700 dark:text-yellow-400",
      label: "Partial",
    },
    failed: {
      bg: "bg-red-500/20",
      text: "text-red-700 dark:text-red-400",
      label: "Failed",
    },
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}
