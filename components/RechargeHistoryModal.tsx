import { type UsedKeyInfo } from './UsedKeyModal'

interface Props {
  records: UsedKeyInfo[]
  onClose: () => void
}

export default function RechargeHistoryModal({ records, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-[#0b1a4f] mb-4">My Recharge Records</h2>

        {records.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">No records yet.</p>
        ) : (
          <div className="overflow-y-auto flex-1 space-y-3 pr-1">
            {records.map((r, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-4 text-sm space-y-1.5">
                <div className="flex gap-2">
                  <span className="font-semibold w-24 shrink-0 text-gray-500">Key:</span>
                  <span className="font-mono break-all">{r.code}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold w-24 shrink-0 text-gray-500">Email:</span>
                  <span>{r.email ?? '—'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold w-24 shrink-0 text-gray-500">Date Active:</span>
                  <span>{r.dateActive ? new Date(r.dateActive).toLocaleString('vi-VN') : '—'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold w-24 shrink-0 text-gray-500">Status:</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700 font-semibold self-start">
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          className="mt-5 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
