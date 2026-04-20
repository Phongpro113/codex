// app/dashboard/redeem/logs/page.tsx
'use client'

import { useEffect, useState } from 'react'

interface RedeemLog {
  id: number
  code: string
  status: string
  keyType: string
  plan: string
  term: string
  service: string
  subscriptionHours: number
  activatedEmail: string | null
  dateActive: string | null
  email: string | null
  createdAt: string
}

export default function RedeemLogsPage() {
  const [logs, setLogs] = useState<RedeemLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const response = await fetch('/api/redeem/logs')
        const data = await response.json()
        if (cancelled) return
        if (data.success) {
          setLogs(data.data)
        } else {
          setError('Failed to fetch logs')
        }
      } catch {
        if (!cancelled) setError('Network error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Redeem Logs</h1>
      
      {/* Hiển thị tổng số records */}
      <div className="mb-4 text-gray-600">
        Total records: {logs.length}
      </div>

      {/* Table hiển thị tất cả records */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border"></th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Plan</th>
              <th className="px-4 py-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{log.id}</td>
                <td className="px-4 py-2 border text-sm">{log.email ?? '—'}</td>
                <td className="px-4 py-2 border font-mono text-sm">{log.code}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded text-xs ${
                    log.status === 'activated' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">{log.plan}</td>
                <td className="px-4 py-2 border">
                  {new Date(log.createdAt).toLocaleString('vi-VN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nếu không có records */}
      {logs.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No records found
        </div>
      )}
    </div>
  )
}