import type { ApiSDKResponse, RechargeDetails, SessionJsonShape } from '@/lib/recharge-types'

export function isValidSessionJsonShape(value: unknown): value is SessionJsonShape {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false
  const o = value as Record<string, unknown>

  if (typeof o.WARNING_BANNER !== 'string') return false
  if (typeof o.expires !== 'string') return false
  if (Number.isNaN(Date.parse(o.expires))) return false
  if (typeof o.accessToken !== 'string') return false
  if (typeof o.authProvider !== 'string') return false
  if (typeof o.sessionToken !== 'string') return false

  if (typeof o.user !== 'object' || o.user === null) return false
  const u = o.user as Record<string, unknown>
  if (typeof u.id !== 'string' || typeof u.name !== 'string' || typeof u.email !== 'string') return false

  if (typeof o.account !== 'object' || o.account === null) return false
  const a = o.account as Record<string, unknown>
  if (typeof a.id !== 'string' || typeof a.planType !== 'string') return false

  if (typeof o.rumViewTags !== 'object' || o.rumViewTags === null) return false
  const r = o.rumViewTags as Record<string, unknown>
  if (typeof r.light_account !== 'object' || r.light_account === null) return false
  const l = r.light_account as Record<string, unknown>
  if (typeof l.fetched !== 'boolean') return false

  return true
}

/**
 * Parse pasted Step 2 JSON. Returns null if syntax is wrong or schema invalid.
 */
export function tryParseSessionJson(raw: string): SessionJsonShape | null {
  try {
    const parsed: unknown = JSON.parse(raw)
    return isValidSessionJsonShape(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function sessionJsonToRechargeDetails(
  parsed: SessionJsonShape,
  api: ApiSDKResponse,
  cdKeyFallback: string
): RechargeDetails {
  const formattedExpiry = new Date(parsed.expires).toLocaleString()

  const formattedDuration = api.term
    ? api.term
    : api.subscription_hours > 0
      ? `${Math.round(api.subscription_hours / 24)}d`
      : '-'

  return {
    keyValue: api.code || cdKeyFallback.trim() || '-',
    plan: api.plan || '-',
    duration: formattedDuration,
    service: api.service || '-',
    accountName: parsed.user.name,
    accountEmail: parsed.user.email,
    currentPlan: parsed.account.planType,
    tokenExpires: formattedExpiry,
  }
}
