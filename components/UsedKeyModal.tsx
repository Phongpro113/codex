export interface UsedKeyInfo {
  code: string
  email: string | null
  dateActive: string | null
  status: string
}

interface Props {
  info: UsedKeyInfo
  onClose: () => void
}

export default function UsedKeyModal({ info, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-red-600 mb-4">Key Already Used</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex gap-2">
            <dt className="font-semibold w-28 shrink-0 text-gray-500">Key:</dt>
            <dd className="font-mono break-all">{info.code}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold w-28 shrink-0 text-gray-500">Email:</dt>
            <dd>{info.email ?? '—'}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold w-28 shrink-0 text-gray-500">Date Active:</dt>
            <dd>{info.dateActive ? new Date(info.dateActive).toLocaleString('vi-VN') : '—'}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-semibold w-28 shrink-0 text-gray-500">Status:</dt>
            <dd>
              <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-700 font-semibold">
                {info.status}
              </span>
            </dd>
          </div>
        </dl>
        <button
          className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}
