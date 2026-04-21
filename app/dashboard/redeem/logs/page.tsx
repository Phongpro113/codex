// app/dashboard/redeem/logs/page.tsx
'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

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

function RedeemLogsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [logs, setLogs] = useState<RedeemLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)
  const [codeInput, setCodeInput] = useState(searchParams.get('code') ?? '')
  const [emailInput, setEmailInput] = useState(searchParams.get('email') ?? '')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const params = new URLSearchParams()
        const createdFrom = searchParams.get('createdFrom')
        const createdTo = searchParams.get('createdTo')
        const code = searchParams.get('code')
        const email = searchParams.get('email')
        if (createdFrom) params.set('createdFrom', createdFrom)
        if (createdTo) params.set('createdTo', createdTo)
        if (code) params.set('code', code)
        if (email) params.set('email', email)
        const qs = params.size > 0 ? `?${params.toString()}` : ''
        const response = await fetch(`/api/redeem/logs${qs}`)
        const data = await response.json()
        if (cancelled) return
        if (data.success) {
          setLogs(data.data)
          setCount(data.count)
        } else {
          setError('Failed to fetch logs')
        }
      } catch {
        if (!cancelled) setError('Network error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [searchParams])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (codeInput.trim()) {
      params.set('code', codeInput.trim())
    } else {
      params.delete('code')
    }
    if (emailInput.trim()) {
      params.set('email', emailInput.trim())
    } else {
      params.delete('email')
    }
    router.push(`?${params.toString()}`)
  }

  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Redeem Logs</h1>

      <form onSubmit={handleSearch} className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Search by code..."
          className="border border-gray-300 rounded px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-blue-400 w-64"
        />
        <input
          type="text"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Search by email..."
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 w-64"
        />
        <button
          type="submit"
          className="px-4 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <div className="mb-4 text-gray-600">
        Total records: {count}
      </div>

      {loading ? (
        <div className="py-8 text-center text-gray-400">Loading...</div>
      ) : (
        <>
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

          {logs.length === 0 && (
            <div className="text-center text-gray-500 py-8">No records found</div>
          )}
        </>
      )}
    </div>
  )
}

export default function RedeemLogsPage() {
  return (
    <Suspense fallback={<div className="py-8 text-center text-gray-400">Loading...</div>}>
      <RedeemLogsContent />
    </Suspense>
  )
}
