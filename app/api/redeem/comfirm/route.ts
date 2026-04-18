import { NextRequest, NextResponse } from 'next/server'

const ACTIVATE_URL =
  process.env.OPENCODEX_REDEEM_ACTIVATE_URL ?? 'https://opencodex.plus/api/redeem/activate'
const MAX_ACTIVATE_ATTEMPTS = Math.min(
  Math.max(1, Number(process.env.OPENCODEX_ACTIVATE_MAX_RETRIES) || 30),
  120
)

/** Body from Step 3 — includes raw session JSON string for upstream activate. */
export type RedeemConfirmBody = {
  key: string
  session: string
  recharge: {
    keyValue: string
    plan: string
    duration: string
    service: string
    accountName: string
    accountEmail: string
    currentPlan: string
    tokenExpires: string
  }
  sdk: {
    code: string
    status: string
    key_type: string
    plan: string
    term: string
    service: string
    subscription_hours: number
    activated_email: string | null
  }
}

function isActivateOk(data: unknown): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    'status' in data &&
    (data as { status: unknown }).status === 'ok'
  )
}

function isConfirmBody(value: unknown): value is RedeemConfirmBody {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false
  const o = value as Record<string, unknown>
  if (typeof o.key !== 'string' || !o.key.trim()) return false
  if (typeof o.session !== 'string' || !o.session.trim()) return false
  const recharge = o.recharge
  const sdk = o.sdk
  if (recharge === null || typeof recharge !== 'object' || Array.isArray(recharge)) return false
  if (sdk === null || typeof sdk !== 'object' || Array.isArray(sdk)) return false
  const r = recharge as Record<string, unknown>
  const s = sdk as Record<string, unknown>
  return (
    typeof r.keyValue === 'string' &&
    typeof r.plan === 'string' &&
    typeof r.duration === 'string' &&
    typeof r.service === 'string' &&
    typeof r.accountName === 'string' &&
    typeof r.accountEmail === 'string' &&
    typeof r.currentPlan === 'string' &&
    typeof r.tokenExpires === 'string' &&
    typeof s.code === 'string' &&
    typeof s.status === 'string' &&
    typeof s.key_type === 'string' &&
    typeof s.plan === 'string' &&
    typeof s.term === 'string' &&
    typeof s.service === 'string' &&
    typeof s.subscription_hours === 'number' &&
    (s.activated_email === null || typeof s.activated_email === 'string')
  )
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    if (!isConfirmBody(body)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      )
    }

    const activatePayload = {
      code: body.sdk.code,
      session: body.session.trim(),
      keyInfo: {
        code: body.sdk.code,
        status: body.sdk.status,
        key_type: body.sdk.key_type,
        plan: body.sdk.plan,
        term: body.sdk.term,
        service: body.sdk.service,
        subscription_hours: body.sdk.subscription_hours,
        activated_email: body.sdk.activated_email,
      },
    }

    const headers: HeadersInit = {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Origin: 'https://opencodex.plus',
      Referer: 'https://opencodex.plus/',
    }

    let lastData: unknown = null
    let lastStatus = 0

    for (let attempt = 0; attempt < MAX_ACTIVATE_ATTEMPTS; attempt++) {
      const response = await fetch(ACTIVATE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(activatePayload),
      })

      lastStatus = response.status
      const data: unknown = await response.json().catch(() => null)
      lastData = data

      if (isActivateOk(data)) {
        return NextResponse.json(data, { status: 200 })
      }

      if (attempt < MAX_ACTIVATE_ATTEMPTS - 1) {
        await sleep(1000)
      }
    }

    const message =
      typeof lastData === 'object' &&
      lastData !== null &&
      'message' in lastData &&
      typeof (lastData as { message: unknown }).message === 'string'
        ? (lastData as { message: string }).message
        : `Activate did not return status ok after ${MAX_ACTIVATE_ATTEMPTS} attempt(s)`

    return NextResponse.json(
      {
        success: false,
        message,
        httpStatus: lastStatus,
        lastResponse: lastData,
      },
      { status: 502 }
    )
  } catch (error) {
    console.error('Redeem confirm error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
