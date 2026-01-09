"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import StatusBadge from "./status-badge"
import { Button } from "@/components/ui/button"

interface ImportRun {
  id: string
  feedUrl: string
  importedAt: string
  totalFetched: number
  newJobs: number
  updatedJobs: number
  failedJobs: number
  status: "success" | "partial" | "failed"
}

interface ImportHistoryProps {
  data: ImportRun[]
  selectedId: string | null
  onSelectRow: (id: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function ImportHistory({
  data,
  selectedId,
  onSelectRow,
  currentPage,
  totalPages,
  onPageChange,
}: ImportHistoryProps) {
  if (data.length === 0 && currentPage === 1) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">No import history found</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Import History</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Feed URL</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Imported At</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Total Fetched</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">New</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Updated</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Failed</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelectRow(row.id)}
                className={`border-b border-border cursor-pointer transition-colors ${
                  selectedId === row.id ? "bg-accent/20" : "hover:bg-muted"
                }`}
              >
                <td className="px-6 py-4 text-sm text-foreground font-medium">{row.feedUrl}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{row.importedAt}</td>
                <td className="px-6 py-4 text-right text-sm text-foreground">{row.totalFetched}</td>
                <td className="px-6 py-4 text-right text-sm text-foreground">{row.newJobs}</td>
                <td className="px-6 py-4 text-right text-sm text-foreground">{row.updatedJobs}</td>
                <td className="px-6 py-4 text-right text-sm text-foreground">{row.failedJobs}</td>
                <td className="px-6 py-4 text-left">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
